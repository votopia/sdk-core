import { Currency } from "./currency";
import { Token } from "./token";
import { Fraction, Percent, Price, CurrencyAmount } from "./fractions";
import { TradeType, ONE, ZERO } from "../constants";
import { Pool } from "./pool";
import { sortedInsert } from "../utils";
import invariant from "tiny-invariant";

import { IRoute, Route, RouteSDK } from "./route";

const ONE_HUNDRED_PERCENT = new Percent(100, 100);
const ZERO_PERCENT = new Percent(ZERO);

/**
 * Trades comparator, an extension of the input output comparator that also considers other dimensions of the trade in ranking them
 * @template TInput The input token, either Ether or an ERC-20
 * @template TOutput The output token, either Ether or an ERC-20
 * @template TTradeType The trade type, either exact input or exact output
 * @param a The first trade to compare
 * @param b The second trade to compare
 * @returns A sorted ordering for two neighboring elements in a trade array
 */
export function tradeComparator<
  TInput extends Currency,
  TOutput extends Currency,
  TTradeType extends TradeType,
>(
  a: TradeSDK<TInput, TOutput, TTradeType>,
  b: TradeSDK<TInput, TOutput, TTradeType>,
) {
  // must have same input and output token for comparison
  invariant(
    a.inputAmount.currency.equals(b.inputAmount.currency),
    "INPUT_CURRENCY",
  );
  invariant(
    a.outputAmount.currency.equals(b.outputAmount.currency),
    "OUTPUT_CURRENCY",
  );
  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      // consider the number of hops since each hop costs gas
      const aHops = a.swaps.reduce(
        (total, cur) => total + cur.route.tokenPath.length,
        0,
      );
      const bHops = b.swaps.reduce(
        (total, cur) => total + cur.route.tokenPath.length,
        0,
      );
      return aHops - bHops;
    }
    // trade A requires less input than trade B, so A should come first
    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1;
    } else {
      return 1;
    }
  } else {
    // tradeA has less output than trade B, so should come second
    if (a.outputAmount.lessThan(b.outputAmount)) {
      return 1;
    } else {
      return -1;
    }
  }
}

export interface BestTradeOptions {
  // how many results to return
  maxNumResults?: number;
  // the maximum number of hops a trade should contain
  maxHops?: number;
}

/**
 * Represents a trade executed against a set of routes where some percentage of the input is
 * split across each route.
 *
 * Each route has its own set of pools. Pools can not be re-used across routes.
 *
 * Does not account for slippage, i.e., changes in price environment that can occur between
 * the time the trade is submitted and when it is executed.
 * @template TInput The input token, either Ether or an ERC-20
 * @template TOutput The output token, either Ether or an ERC-20
 * @template TTradeType The trade type, either exact input or exact output
 */
export class TradeSDK<
  TInput extends Currency,
  TOutput extends Currency,
  TTradeType extends TradeType,
> {
  /**
   * @deprecated Deprecated in favor of 'swaps' property. If the trade consists of multiple routes
   * this will return an error.
   *
   * When the trade consists of just a single route, this returns the route of the trade,
   * i.e. which pools the trade goes through.
   */
  public get route(): RouteSDK<TInput, TOutput> {
    invariant(this.swaps.length == 1, "MULTIPLE_ROUTES");
    return this.swaps[0].route;
  }

  /**
   * The swaps of the trade, i.e. which routes and how much is swapped in each that
   * make up the trade.
   */
  public readonly swaps: {
    route: RouteSDK<TInput, TOutput>;
    inputAmount: CurrencyAmount<TInput>;
    outputAmount: CurrencyAmount<TOutput>;
  }[];

  /**
   * The type of the trade, either exact in or exact out.
   */
  public readonly tradeType: TTradeType;

  /**
   * The cached result of the input amount computation
   * @private
   */
  private _inputAmount: CurrencyAmount<TInput> | undefined;

  /**
   * The input amount for the trade assuming no slippage.
   */
  public get inputAmount(): CurrencyAmount<TInput> {
    if (this._inputAmount) {
      return this._inputAmount;
    }

    const inputCurrency = this.swaps[0].inputAmount.currency;
    const totalInputFromRoutes = this.swaps
      .map(({ inputAmount }) => inputAmount)
      .reduce(
        (total, cur) => total.add(cur),
        CurrencyAmount.fromRawAmount(inputCurrency, 0),
      );

    this._inputAmount = totalInputFromRoutes;
    return this._inputAmount;
  }

  /**
   * The cached result of the output amount computation
   * @private
   */
  private _outputAmount: CurrencyAmount<TOutput> | undefined;

  /**
   * The output amount for the trade assuming no slippage.
   */
  public get outputAmount(): CurrencyAmount<TOutput> {
    if (this._outputAmount) {
      return this._outputAmount;
    }

    const outputCurrency = this.swaps[0].outputAmount.currency;
    const totalOutputFromRoutes = this.swaps
      .map(({ outputAmount }) => outputAmount)
      .reduce(
        (total, cur) => total.add(cur),
        CurrencyAmount.fromRawAmount(outputCurrency, 0),
      );

    this._outputAmount = totalOutputFromRoutes;
    return this._outputAmount;
  }

  /**
   * The cached result of the computed execution price
   * @private
   */
  private _executionPrice: Price<TInput, TOutput> | undefined;

  /**
   * The price expressed in terms of output amount/input amount.
   */
  public get executionPrice(): Price<TInput, TOutput> {
    return (
      this._executionPrice ??
      (this._executionPrice = new Price(
        this.inputAmount.currency,
        this.outputAmount.currency,
        this.inputAmount.quotient,
        this.outputAmount.quotient,
      ))
    );
  }

  /**
   * The cached result of the price impact computation
   * @private
   */
  private _priceImpact: Percent | undefined;

  /**
   * Returns the percent difference between the route's mid price and the price impact
   */
  public get priceImpact(): Percent {
    if (this._priceImpact) {
      return this._priceImpact;
    }

    let spotOutputAmount = CurrencyAmount.fromRawAmount(
      this.outputAmount.currency,
      0,
    );
    for (const { route, inputAmount } of this.swaps) {
      const midPrice = route.midPrice;
      spotOutputAmount = spotOutputAmount.add(midPrice.quote(inputAmount));
    }

    const priceImpact = spotOutputAmount
      .subtract(this.outputAmount)
      .divide(spotOutputAmount);
    this._priceImpact = new Percent(
      priceImpact.numerator,
      priceImpact.denominator,
    );

    return this._priceImpact;
  }

  /**
   * Constructs an exact in trade with the given amount in and route
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @param route The route of the exact in trade
   * @param amountIn The amount being passed in
   * @returns The exact in trade
   */
  public static async exactIn<
    TInput extends Currency,
    TOutput extends Currency,
  >(
    route: RouteSDK<TInput, TOutput>,
    amountIn: CurrencyAmount<TInput>,
  ): Promise<TradeSDK<TInput, TOutput, TradeType.EXACT_INPUT>> {
    return TradeSDK.fromRoute(route, amountIn, TradeType.EXACT_INPUT);
  }

  /**
   * Constructs an exact out trade with the given amount out and route
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @param route The route of the exact out trade
   * @param amountOut The amount returned by the trade
   * @returns The exact out trade
   */
  public static async exactOut<
    TInput extends Currency,
    TOutput extends Currency,
  >(
    route: RouteSDK<TInput, TOutput>,
    amountOut: CurrencyAmount<TOutput>,
  ): Promise<TradeSDK<TInput, TOutput, TradeType.EXACT_OUTPUT>> {
    return TradeSDK.fromRoute(route, amountOut, TradeType.EXACT_OUTPUT);
  }

  /**
   * Constructs a trade by simulating swaps through the given route
   * @template TInput The input token, either Ether or an ERC-20.
   * @template TOutput The output token, either Ether or an ERC-20.
   * @template TTradeType The type of the trade, either exact in or exact out.
   * @param route route to swap through
   * @param amount the amount specified, either input or output, depending on tradeType
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The route
   */
  public static async fromRoute<
    TInput extends Currency,
    TOutput extends Currency,
    TTradeType extends TradeType,
  >(
    route: RouteSDK<TInput, TOutput>,
    amount: TTradeType extends TradeType.EXACT_INPUT
      ? CurrencyAmount<TInput>
      : CurrencyAmount<TOutput>,
    tradeType: TTradeType,
  ): Promise<TradeSDK<TInput, TOutput, TTradeType>> {
    const amounts: CurrencyAmount<Token>[] = new Array(route.tokenPath.length);
    let inputAmount: CurrencyAmount<TInput>;
    let outputAmount: CurrencyAmount<TOutput>;
    if (tradeType === TradeType.EXACT_INPUT) {
      invariant(amount.currency.equals(route.input), "INPUT");
      amounts[0] = amount.wrapped;
      for (let i = 0; i < route.tokenPath.length - 1; i++) {
        const pool = route.pools[i];
        const [outputAmount] = await pool.getOutputAmount(amounts[i]);
        amounts[i + 1] = outputAmount;
      }
      inputAmount = CurrencyAmount.fromFractionalAmount(
        route.input,
        amount.numerator,
        amount.denominator,
      );
      outputAmount = CurrencyAmount.fromFractionalAmount(
        route.output,
        amounts[amounts.length - 1].numerator,
        amounts[amounts.length - 1].denominator,
      );
    } else {
      invariant(amount.currency.equals(route.output), "OUTPUT");
      amounts[amounts.length - 1] = amount.wrapped;
      for (let i = route.tokenPath.length - 1; i > 0; i--) {
        const pool = route.pools[i - 1];
        const [inputAmount] = await pool.getInputAmount(amounts[i]);
        amounts[i - 1] = inputAmount;
      }
      inputAmount = CurrencyAmount.fromFractionalAmount(
        route.input,
        amounts[0].numerator,
        amounts[0].denominator,
      );
      outputAmount = CurrencyAmount.fromFractionalAmount(
        route.output,
        amount.numerator,
        amount.denominator,
      );
    }

    return new TradeSDK({
      routes: [{ inputAmount, outputAmount, route }],
      tradeType,
    });
  }

  /**
   * Constructs a trade from routes by simulating swaps
   *
   * @template TInput The input token, either Ether or an ERC-20.
   * @template TOutput The output token, either Ether or an ERC-20.
   * @template TTradeType The type of the trade, either exact in or exact out.
   * @param routes the routes to swap through and how much of the amount should be routed through each
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The trade
   */
  public static async fromRoutes<
    TInput extends Currency,
    TOutput extends Currency,
    TTradeType extends TradeType,
  >(
    routes: {
      amount: TTradeType extends TradeType.EXACT_INPUT
        ? CurrencyAmount<TInput>
        : CurrencyAmount<TOutput>;
      route: RouteSDK<TInput, TOutput>;
    }[],
    tradeType: TTradeType,
  ): Promise<TradeSDK<TInput, TOutput, TTradeType>> {
    const populatedRoutes: {
      route: RouteSDK<TInput, TOutput>;
      inputAmount: CurrencyAmount<TInput>;
      outputAmount: CurrencyAmount<TOutput>;
    }[] = [];

    for (const { route, amount } of routes) {
      const amounts: CurrencyAmount<Token>[] = new Array(
        route.tokenPath.length,
      );
      let inputAmount: CurrencyAmount<TInput>;
      let outputAmount: CurrencyAmount<TOutput>;

      if (tradeType === TradeType.EXACT_INPUT) {
        invariant(amount.currency.equals(route.input), "INPUT");
        inputAmount = CurrencyAmount.fromFractionalAmount(
          route.input,
          amount.numerator,
          amount.denominator,
        );
        amounts[0] = CurrencyAmount.fromFractionalAmount(
          route.input.wrapped,
          amount.numerator,
          amount.denominator,
        );

        for (let i = 0; i < route.tokenPath.length - 1; i++) {
          const pool = route.pools[i];
          const [outputAmount] = await pool.getOutputAmount(amounts[i]);
          amounts[i + 1] = outputAmount;
        }

        outputAmount = CurrencyAmount.fromFractionalAmount(
          route.output,
          amounts[amounts.length - 1].numerator,
          amounts[amounts.length - 1].denominator,
        );
      } else {
        invariant(amount.currency.equals(route.output), "OUTPUT");
        outputAmount = CurrencyAmount.fromFractionalAmount(
          route.output,
          amount.numerator,
          amount.denominator,
        );
        amounts[amounts.length - 1] = CurrencyAmount.fromFractionalAmount(
          route.output.wrapped,
          amount.numerator,
          amount.denominator,
        );

        for (let i = route.tokenPath.length - 1; i > 0; i--) {
          const pool = route.pools[i - 1];
          const [inputAmount] = await pool.getInputAmount(amounts[i]);
          amounts[i - 1] = inputAmount;
        }

        inputAmount = CurrencyAmount.fromFractionalAmount(
          route.input,
          amounts[0].numerator,
          amounts[0].denominator,
        );
      }

      populatedRoutes.push({ route, inputAmount, outputAmount });
    }

    return new TradeSDK({
      routes: populatedRoutes,
      tradeType,
    });
  }

  /**
   * Creates a trade without computing the result of swapping through the route. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @template TTradeType The type of the trade, either exact in or exact out
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */
  public static createUncheckedTrade<
    TInput extends Currency,
    TOutput extends Currency,
    TTradeType extends TradeType,
  >(constructorArguments: {
    route: RouteSDK<TInput, TOutput>;
    inputAmount: CurrencyAmount<TInput>;
    outputAmount: CurrencyAmount<TOutput>;
    tradeType: TTradeType;
  }): TradeSDK<TInput, TOutput, TTradeType> {
    return new TradeSDK({
      ...constructorArguments,
      routes: [
        {
          inputAmount: constructorArguments.inputAmount,
          outputAmount: constructorArguments.outputAmount,
          route: constructorArguments.route,
        },
      ],
    });
  }

  /**
   * Creates a trade without computing the result of swapping through the routes. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @template TTradeType The type of the trade, either exact in or exact out
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */
  public static createUncheckedTradeWithMultipleRoutes<
    TInput extends Currency,
    TOutput extends Currency,
    TTradeType extends TradeType,
  >(constructorArguments: {
    routes: {
      route: RouteSDK<TInput, TOutput>;
      inputAmount: CurrencyAmount<TInput>;
      outputAmount: CurrencyAmount<TOutput>;
    }[];
    tradeType: TTradeType;
  }): TradeSDK<TInput, TOutput, TTradeType> {
    return new TradeSDK(constructorArguments);
  }

  /**
   * Construct a trade by passing in the pre-computed property values
   * @param routes The routes through which the trade occurs
   * @param tradeType The type of trade, exact input or exact output
   */
  private constructor({
    routes,
    tradeType,
  }: {
    routes: {
      route: RouteSDK<TInput, TOutput>;
      inputAmount: CurrencyAmount<TInput>;
      outputAmount: CurrencyAmount<TOutput>;
    }[];
    tradeType: TTradeType;
  }) {
    const inputCurrency = routes[0].inputAmount.currency;
    const outputCurrency = routes[0].outputAmount.currency;
    invariant(
      routes.every(({ route }) =>
        inputCurrency.wrapped.equals(route.input.wrapped),
      ),
      "INPUT_CURRENCY_MATCH",
    );
    invariant(
      routes.every(({ route }) =>
        outputCurrency.wrapped.equals(route.output.wrapped),
      ),
      "OUTPUT_CURRENCY_MATCH",
    );

    const numPools = routes
      .map(({ route }) => route.pools.length)
      .reduce((total, cur) => total + cur, 0);
    const poolAddressSet = new Set<string>();
    for (const { route } of routes) {
      for (const pool of route.pools) {
        poolAddressSet.add(Pool.getAddress(pool.token0, pool.token1, pool.fee));
      }
    }

    invariant(numPools == poolAddressSet.size, "POOLS_DUPLICATED");

    this.swaps = routes;
    this.tradeType = tradeType;
  }

  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount out
   */
  public minimumAmountOut(
    slippageTolerance: Percent,
    amountOut = this.outputAmount,
  ): CurrencyAmount<TOutput> {
    invariant(!slippageTolerance.lessThan(ZERO), "SLIPPAGE_TOLERANCE");
    if (this.tradeType === TradeType.EXACT_OUTPUT) {
      return amountOut;
    } else {
      const slippageAdjustedAmountOut = new Fraction(ONE)
        .add(slippageTolerance)
        .invert()
        .multiply(amountOut.quotient).quotient;
      return CurrencyAmount.fromRawAmount(
        amountOut.currency,
        slippageAdjustedAmountOut,
      );
    }
  }

  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount in
   */
  public maximumAmountIn(
    slippageTolerance: Percent,
    amountIn = this.inputAmount,
  ): CurrencyAmount<TInput> {
    invariant(!slippageTolerance.lessThan(ZERO), "SLIPPAGE_TOLERANCE");
    if (this.tradeType === TradeType.EXACT_INPUT) {
      return amountIn;
    } else {
      const slippageAdjustedAmountIn = new Fraction(ONE)
        .add(slippageTolerance)
        .multiply(amountIn.quotient).quotient;
      return CurrencyAmount.fromRawAmount(
        amountIn.currency,
        slippageAdjustedAmountIn,
      );
    }
  }

  /**
   * Return the execution price after accounting for slippage tolerance
   * @param slippageTolerance the allowed tolerated slippage
   * @returns The execution price
   */
  public worstExecutionPrice(
    slippageTolerance: Percent,
  ): Price<TInput, TOutput> {
    return new Price(
      this.inputAmount.currency,
      this.outputAmount.currency,
      this.maximumAmountIn(slippageTolerance).quotient,
      this.minimumAmountOut(slippageTolerance).quotient,
    );
  }

  /**
   * Given a list of pools, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
   * amount to an output token, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param nextAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param currentPools used in recursion; the current list of pools
   * @param currencyAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   * @returns The exact in trade
   */
  public static async bestTradeExactIn<
    TInput extends Currency,
    TOutput extends Currency,
  >(
    pools: Pool[],
    currencyAmountIn: CurrencyAmount<TInput>,
    currencyOut: TOutput,
    { maxNumResults = 3, maxHops = 3 }: BestTradeOptions = {},
    // used in recursion.
    currentPools: Pool[] = [],
    nextAmountIn: CurrencyAmount<Currency> = currencyAmountIn,
    bestTrades: TradeSDK<TInput, TOutput, TradeType.EXACT_INPUT>[] = [],
  ): Promise<TradeSDK<TInput, TOutput, TradeType.EXACT_INPUT>[]> {
    invariant(pools.length > 0, "POOLS");
    invariant(maxHops > 0, "MAX_HOPS");
    invariant(
      currencyAmountIn === nextAmountIn || currentPools.length > 0,
      "INVALID_RECURSION",
    );

    const amountIn = nextAmountIn.wrapped;
    const tokenOut = currencyOut.wrapped;
    for (let i = 0; i < pools.length; i++) {
      const pool = pools[i];
      // pool irrelevant
      if (
        !pool.token0.equals(amountIn.currency) &&
        !pool.token1.equals(amountIn.currency)
      )
        continue;

      let amountOut: CurrencyAmount<Token>;
      try {
        [amountOut] = await pool.getOutputAmount(amountIn);
      } catch (error) {
        // input too low
        if ((error as any)?.isInsufficientInputAmountError) {
          continue;
        }
        throw error;
      }
      // we have arrived at the output token, so this is the final trade of one of the paths
      if (amountOut.currency.isToken && amountOut.currency.equals(tokenOut)) {
        sortedInsert(
          bestTrades,
          await TradeSDK.fromRoute(
            new RouteSDK(
              [...currentPools, pool],
              currencyAmountIn.currency,
              currencyOut,
            ),
            currencyAmountIn,
            TradeType.EXACT_INPUT,
          ),
          maxNumResults,
          tradeComparator,
        );
      } else if (maxHops > 1 && pools.length > 1) {
        const poolsExcludingThisPool = pools
          .slice(0, i)
          .concat(pools.slice(i + 1, pools.length));

        // otherwise, consider all the other paths that lead from this token as long as we have not exceeded maxHops
        await TradeSDK.bestTradeExactIn(
          poolsExcludingThisPool,
          currencyAmountIn,
          currencyOut,
          {
            maxNumResults,
            maxHops: maxHops - 1,
          },
          [...currentPools, pool],
          amountOut,
          bestTrades,
        );
      }
    }

    return bestTrades;
  }

  /**
   * similar to the above method but instead targets a fixed output amount
   * given a list of pools, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
   * to an output token amount, making at most `maxHops` hops
   * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param currencyIn the currency to spend
   * @param currencyAmountOut the desired currency amount out
   * @param nextAmountOut the exact amount of currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param currentPools used in recursion; the current list of pools
   * @param bestTrades used in recursion; the current list of best trades
   * @returns The exact out trade
   */
  public static async bestTradeExactOut<
    TInput extends Currency,
    TOutput extends Currency,
  >(
    pools: Pool[],
    currencyIn: TInput,
    currencyAmountOut: CurrencyAmount<TOutput>,
    { maxNumResults = 3, maxHops = 3 }: BestTradeOptions = {},
    // used in recursion.
    currentPools: Pool[] = [],
    nextAmountOut: CurrencyAmount<Currency> = currencyAmountOut,
    bestTrades: TradeSDK<TInput, TOutput, TradeType.EXACT_OUTPUT>[] = [],
  ): Promise<TradeSDK<TInput, TOutput, TradeType.EXACT_OUTPUT>[]> {
    invariant(pools.length > 0, "POOLS");
    invariant(maxHops > 0, "MAX_HOPS");
    invariant(
      currencyAmountOut === nextAmountOut || currentPools.length > 0,
      "INVALID_RECURSION",
    );

    const amountOut = nextAmountOut.wrapped;
    const tokenIn = currencyIn.wrapped;
    for (let i = 0; i < pools.length; i++) {
      const pool = pools[i];
      // pool irrelevant
      if (
        !pool.token0.equals(amountOut.currency) &&
        !pool.token1.equals(amountOut.currency)
      )
        continue;

      let amountIn: CurrencyAmount<Token>;
      try {
        [amountIn] = await pool.getInputAmount(amountOut);
      } catch (error) {
        // not enough liquidity in this pool
        if ((error as any)?.isInsufficientReservesError) {
          continue;
        }
        throw error;
      }
      // we have arrived at the input token, so this is the first trade of one of the paths
      if (amountIn.currency.equals(tokenIn)) {
        sortedInsert(
          bestTrades,
          await TradeSDK.fromRoute(
            new RouteSDK(
              [pool, ...currentPools],
              currencyIn,
              currencyAmountOut.currency,
            ),
            currencyAmountOut,
            TradeType.EXACT_OUTPUT,
          ),
          maxNumResults,
          tradeComparator,
        );
      } else if (maxHops > 1 && pools.length > 1) {
        const poolsExcludingThisPool = pools
          .slice(0, i)
          .concat(pools.slice(i + 1, pools.length));

        // otherwise, consider all the other paths that arrive at this token as long as we have not exceeded maxHops
        await TradeSDK.bestTradeExactOut(
          poolsExcludingThisPool,
          currencyIn,
          currencyAmountOut,
          {
            maxNumResults,
            maxHops: maxHops - 1,
          },
          [pool, ...currentPools],
          amountIn,
          bestTrades,
        );
      }
    }

    return bestTrades;
  }
}

export class Trade<
  TInput extends Currency,
  TOutput extends Currency,
  TTradeType extends TradeType,
> {
  public readonly routes: IRoute<TInput, TOutput, Pool>[];
  public readonly tradeType: TTradeType;
  private _outputAmount: CurrencyAmount<TOutput> | undefined;
  private _inputAmount: CurrencyAmount<TInput> | undefined;

  /**
   * The swaps of the trade, i.e. which routes and how much is swapped in each that
   * make up the trade. May consist of swaps in v2 or v3.
   */
  public readonly swaps: {
    route: IRoute<TInput, TOutput, Pool>;
    inputAmount: CurrencyAmount<TInput>;
    outputAmount: CurrencyAmount<TOutput>;
  }[];

  //  construct a trade across v2 and v3 routes from pre-computed amounts
  public constructor({
    v3Routes,
    tradeType,
  }: {
    v3Routes: {
      routev3: RouteSDK<TInput, TOutput>;
      inputAmount: CurrencyAmount<TInput>;
      outputAmount: CurrencyAmount<TOutput>;
    }[];
    tradeType: TTradeType;
  }) {
    this.swaps = [];
    this.routes = [];

    // wrap v3 routes
    for (const { routev3, inputAmount, outputAmount } of v3Routes) {
      const route = new Route(routev3);
      this.routes.push(route);
      this.swaps.push({
        route,
        inputAmount,
        outputAmount,
      });
    }

    if (this.swaps.length === 0) {
      throw new Error("No routes provided when calling Trade constructor");
    }

    this.tradeType = tradeType;

    // each route must have the same input and output currency
    const inputCurrency = this.swaps[0].inputAmount.currency;
    const outputCurrency = this.swaps[0].outputAmount.currency;
    invariant(
      this.swaps.every(({ route }) =>
        inputCurrency.wrapped.equals(route.input.wrapped),
      ),
      "INPUT_CURRENCY_MATCH",
    );
    invariant(
      this.swaps.every(({ route }) =>
        outputCurrency.wrapped.equals(route.output.wrapped),
      ),
      "OUTPUT_CURRENCY_MATCH",
    );

    // pools must be unique inter protocols
    const numPools = this.swaps
      .map(({ route }) => route.pools.length)
      .reduce((total, cur) => total + cur, 0);
    const poolAddressSet = new Set<string>();
    for (const { route } of this.swaps) {
      for (const pool of route.pools) {
        if (pool instanceof Pool) {
          poolAddressSet.add(
            Pool.getAddress(pool.token0, pool.token1, (pool as Pool).fee),
          );
        } else {
          throw new Error(
            "Unexpected pool type in route when constructing trade object",
          );
        }
      }
    }
    invariant(numPools == poolAddressSet.size, "POOLS_DUPLICATED");
  }

  public get inputAmount(): CurrencyAmount<TInput> {
    if (this._inputAmount) {
      return this._inputAmount;
    }

    const inputCurrency = this.swaps[0].inputAmount.currency;
    const totalInputFromRoutes = this.swaps
      .map(({ inputAmount }) => inputAmount)
      .reduce(
        (total, cur) => total.add(cur),
        CurrencyAmount.fromRawAmount(inputCurrency, 0),
      );

    this._inputAmount = totalInputFromRoutes;
    return this._inputAmount;
  }

  public get outputAmount(): CurrencyAmount<TOutput> {
    if (this._outputAmount) {
      return this._outputAmount;
    }

    const outputCurrency = this.swaps[0].outputAmount.currency;
    const totalOutputFromRoutes = this.swaps
      .map(({ outputAmount }) => outputAmount)
      .reduce(
        (total, cur) => total.add(cur),
        CurrencyAmount.fromRawAmount(outputCurrency, 0),
      );

    this._outputAmount = totalOutputFromRoutes;
    return this._outputAmount;
  }

  private _executionPrice: Price<TInput, TOutput> | undefined;

  /**
   * The price expressed in terms of output amount/input amount.
   */
  public get executionPrice(): Price<TInput, TOutput> {
    return (
      this._executionPrice ??
      (this._executionPrice = new Price(
        this.inputAmount.currency,
        this.outputAmount.currency,
        this.inputAmount.quotient,
        this.outputAmount.quotient,
      ))
    );
  }

  /**
   * Returns the sell tax of the input token
   */
  public get inputTax(): Percent {
    const inputCurrency = this.inputAmount.currency;
    if (inputCurrency.isNative || !inputCurrency.wrapped.sellFeeBps)
      return ZERO_PERCENT;

    return new Percent(inputCurrency.wrapped.sellFeeBps.toNumber(), 10000);
  }

  /**
   * Returns the buy tax of the output token
   */
  public get outputTax(): Percent {
    const outputCurrency = this.outputAmount.currency;
    if (outputCurrency.isNative || !outputCurrency.wrapped.buyFeeBps)
      return ZERO_PERCENT;

    return new Percent(outputCurrency.wrapped.buyFeeBps.toNumber(), 10000);
  }

  /**
   * The cached result of the price impact computation
   * @private
   */
  private _priceImpact: Percent | undefined;
  /**
   * Returns the percent difference between the route's mid price and the expected execution price
   * In order to exclude token taxes from the price impact calculation, the spot price is calculated
   * using a ratio of values that go into the pools, which are the post-tax input amount and pre-tax output amount.
   */
  public get priceImpact(): Percent {
    if (this._priceImpact) {
      return this._priceImpact;
    }

    // returns 0% price impact even though this may be inaccurate as a swap may have occured.
    // because we're unable to derive the pre-buy-tax amount, use 0% as a placeholder.
    if (this.outputTax.equalTo(ONE_HUNDRED_PERCENT)) return ZERO_PERCENT;

    let spotOutputAmount = CurrencyAmount.fromRawAmount(
      this.outputAmount.currency,
      0,
    );
    for (const { route, inputAmount } of this.swaps) {
      const midPrice = route.midPrice;
      const postTaxInputAmount = inputAmount.multiply(
        new Fraction(ONE).subtract(this.inputTax),
      );
      spotOutputAmount = spotOutputAmount.add(
        midPrice.quote(postTaxInputAmount),
      );
    }

    // if the total output of this trade is 0, then most likely the post-tax input was also 0, and therefore this swap
    // does not move the pools' market price
    if (spotOutputAmount.equalTo(ZERO)) return ZERO_PERCENT;

    const preTaxOutputAmount = this.outputAmount.divide(
      new Fraction(ONE).subtract(this.outputTax),
    );
    const priceImpact = spotOutputAmount
      .subtract(preTaxOutputAmount)
      .divide(spotOutputAmount);
    this._priceImpact = new Percent(
      priceImpact.numerator,
      priceImpact.denominator,
    );

    return this._priceImpact;
  }

  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount out
   */
  public minimumAmountOut(
    slippageTolerance: Percent,
    amountOut = this.outputAmount,
  ): CurrencyAmount<TOutput> {
    invariant(!slippageTolerance.lessThan(ZERO), "SLIPPAGE_TOLERANCE");
    if (this.tradeType === TradeType.EXACT_OUTPUT) {
      return amountOut;
    } else {
      const slippageAdjustedAmountOut = new Fraction(ONE)
        .add(slippageTolerance)
        .invert()
        .multiply(amountOut.quotient).quotient;
      return CurrencyAmount.fromRawAmount(
        amountOut.currency,
        slippageAdjustedAmountOut,
      );
    }
  }

  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount in
   */
  public maximumAmountIn(
    slippageTolerance: Percent,
    amountIn = this.inputAmount,
  ): CurrencyAmount<TInput> {
    invariant(!slippageTolerance.lessThan(ZERO), "SLIPPAGE_TOLERANCE");
    if (this.tradeType === TradeType.EXACT_INPUT) {
      return amountIn;
    } else {
      const slippageAdjustedAmountIn = new Fraction(ONE)
        .add(slippageTolerance)
        .multiply(amountIn.quotient).quotient;
      return CurrencyAmount.fromRawAmount(
        amountIn.currency,
        slippageAdjustedAmountIn,
      );
    }
  }

  /**
   * Return the execution price after accounting for slippage tolerance
   * @param slippageTolerance the allowed tolerated slippage
   * @returns The execution price
   */
  public worstExecutionPrice(
    slippageTolerance: Percent,
  ): Price<TInput, TOutput> {
    return new Price(
      this.inputAmount.currency,
      this.outputAmount.currency,
      this.maximumAmountIn(slippageTolerance).quotient,
      this.minimumAmountOut(slippageTolerance).quotient,
    );
  }

  public static async fromRoutes<
    TInput extends Currency,
    TOutput extends Currency,
    TTradeType extends TradeType,
  >(
    v3Routes: {
      routev3: RouteSDK<TInput, TOutput>;
      amount: TTradeType extends TradeType.EXACT_INPUT
        ? CurrencyAmount<TInput>
        : CurrencyAmount<TOutput>;
    }[],
    tradeType: TTradeType,
  ): Promise<Trade<TInput, TOutput, TTradeType>> {
    const populatedV3Routes: {
      routev3: RouteSDK<TInput, TOutput>;
      inputAmount: CurrencyAmount<TInput>;
      outputAmount: CurrencyAmount<TOutput>;
    }[] = [];

    for (const { routev3, amount } of v3Routes) {
      const v3Trade = await TradeSDK.fromRoute(routev3, amount, tradeType);
      const { inputAmount, outputAmount } = v3Trade;

      populatedV3Routes.push({
        routev3,
        inputAmount,
        outputAmount,
      });
    }

    return new Trade({
      v3Routes: populatedV3Routes,
      tradeType,
    });
  }

  public static async fromRoute<
    TInput extends Currency,
    TOutput extends Currency,
    TTradeType extends TradeType,
  >(
    route: RouteSDK<TInput, TOutput>,

    amount: TTradeType extends TradeType.EXACT_INPUT
      ? CurrencyAmount<TInput>
      : CurrencyAmount<TOutput>,
    tradeType: TTradeType,
  ): Promise<Trade<TInput, TOutput, TTradeType>> {
    let v3Routes: {
      routev3: RouteSDK<TInput, TOutput>;
      inputAmount: CurrencyAmount<TInput>;
      outputAmount: CurrencyAmount<TOutput>;
    }[] = [];

    if (route instanceof RouteSDK) {
      const v3Trade = await TradeSDK.fromRoute(route, amount, tradeType);
      const { inputAmount, outputAmount } = v3Trade;
      v3Routes = [{ routev3: route, inputAmount, outputAmount }];
    } else {
      throw new Error("Invalid route type");
    }

    return new Trade({
      v3Routes,
      tradeType,
    });
  }
}
