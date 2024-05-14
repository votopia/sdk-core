import { Interface } from "@ethersproject/abi";
import {
  Currency,
  CurrencyAmount,
  Percent,
  TradeSDK,
  Route,
  Trade,
  Position,
} from "./entities";

import {
  MethodParameters,
  validateAndParseAddress,
  encodeRouteToPath,
  toHex,
} from "./utils";

import { TradeType, ADDRESS_THIS, MSG_SENDER } from "./constants";

import { WRAPPED_NATIVE_TOKEN } from "./tokens";

import { Payments, FeeOptions } from "./payments";
import { PermitOptions, SelfPermit } from "./selfPermit";

import { abi } from "./abis/ISwapRouter02.json";

import invariant from "tiny-invariant";
import JSBI from "jsbi";

import {
  ApproveAndCall,
  ApprovalTypes,
  CondensedAddLiquidityOptions,
} from "./approveAndCall";

import { MulticallExtended, Validation } from "./multicallExtended";
import { PaymentsExtended } from "./paymentsExtended";

const ZERO = JSBI.BigInt(0);
const REFUND_ETH_PRICE_IMPACT_THRESHOLD = new Percent(
  JSBI.BigInt(50),
  JSBI.BigInt(100),
);
/**
 * Options for producing the arguments to send calls to the router.
 */
export interface SwapOptions {
  /**
   * How much the execution price is allowed to move unfavorably from the trade execution price.
   */
  slippageTolerance: Percent;

  /**
   * The account that should receive the output. If omitted, output is sent to msg.sender.
   */
  recipient?: string;

  /**
   * Either deadline (when the transaction expires, in epoch seconds), or previousBlockhash.
   */
  deadlineOrPreviousBlockhash?: Validation;

  /**
   * The optional permit parameters for spending the input.
   */
  inputTokenPermit?: PermitOptions;

  /**
   * Optional information for taking a fee on output.
   */
  fee?: FeeOptions;
}

export interface SwapAndAddOptions extends SwapOptions {
  /**
   * The optional permit parameters for pulling in remaining output token.
   */
  outputTokenPermit?: PermitOptions;
}

type AnyTradeType =
  | Trade<Currency, Currency, TradeType>
  | TradeSDK<Currency, Currency, TradeType>
  | TradeSDK<Currency, Currency, TradeType>[];

/**
 * Represents the Uniswap V2 + V3 SwapRouter02, and has static methods for helping execute trades.
 */
export abstract class SwapRouter {
  public static INTERFACE: Interface = new Interface(abi);

  /**
   * Cannot be constructed.
   */
  private constructor() {}

  /**
   * @notice Generates the calldata for a Swap with a V3 Route.
   * @param trade The V3Trade to encode.
   * @param options SwapOptions to use for the trade.
   * @param routerMustCustody Flag for whether funds should be sent to the router
   * @param performAggregatedSlippageCheck Flag for whether we want to perform an aggregated slippage check
   * @returns A string array of calldatas for the trade.
   */
  private static encodeV3Swap(
    trade: TradeSDK<Currency, Currency, TradeType>,
    options: SwapOptions,
    routerMustCustody: boolean,
    performAggregatedSlippageCheck: boolean,
  ): string[] {
    const calldatas: string[] = [];

    for (const { route, inputAmount, outputAmount } of trade.swaps) {
      const amountIn: string = toHex(
        trade.maximumAmountIn(options.slippageTolerance, inputAmount).quotient,
      );
      const amountOut: string = toHex(
        trade.minimumAmountOut(options.slippageTolerance, outputAmount)
          .quotient,
      );

      // flag for whether the trade is single hop or not
      const singleHop = route.pools.length === 1;

      const recipient = routerMustCustody
        ? ADDRESS_THIS
        : typeof options.recipient === "undefined"
        ? MSG_SENDER
        : validateAndParseAddress(options.recipient);

      if (singleHop) {
        if (trade.tradeType === TradeType.EXACT_INPUT) {
          const exactInputSingleParams = {
            tokenIn: route.tokenPath[0].address,
            tokenOut: route.tokenPath[1].address,
            fee: route.pools[0].fee,
            recipient,
            amountIn,
            amountOutMinimum: performAggregatedSlippageCheck ? 0 : amountOut,
            sqrtPriceLimitX96: 0,
          };

          calldatas.push(
            SwapRouter.INTERFACE.encodeFunctionData("exactInputSingle", [
              exactInputSingleParams,
            ]),
          );
        } else {
          const exactOutputSingleParams = {
            tokenIn: route.tokenPath[0].address,
            tokenOut: route.tokenPath[1].address,
            fee: route.pools[0].fee,
            recipient,
            amountOut,
            amountInMaximum: amountIn,
            sqrtPriceLimitX96: 0,
          };

          calldatas.push(
            SwapRouter.INTERFACE.encodeFunctionData("exactOutputSingle", [
              exactOutputSingleParams,
            ]),
          );
        }
      } else {
        const path: string = encodeRouteToPath(
          route,
          trade.tradeType === TradeType.EXACT_OUTPUT,
        );

        if (trade.tradeType === TradeType.EXACT_INPUT) {
          const exactInputParams = {
            path,
            recipient,
            amountIn,
            amountOutMinimum: performAggregatedSlippageCheck ? 0 : amountOut,
          };

          calldatas.push(
            SwapRouter.INTERFACE.encodeFunctionData("exactInput", [
              exactInputParams,
            ]),
          );
        } else {
          const exactOutputParams = {
            path,
            recipient,
            amountOut,
            amountInMaximum: amountIn,
          };

          calldatas.push(
            SwapRouter.INTERFACE.encodeFunctionData("exactOutput", [
              exactOutputParams,
            ]),
          );
        }
      }
    }

    return calldatas;
  }

  private static encodeSwaps(
    trades: AnyTradeType,
    options: SwapOptions,
    isSwapAndAdd?: boolean,
  ): {
    calldatas: string[];
    sampleTrade: TradeSDK<Currency, Currency, TradeType>;
    routerMustCustody: boolean;
    inputIsNative: boolean;
    outputIsNative: boolean;
    totalAmountIn: CurrencyAmount<Currency>;
    minimumAmountOut: CurrencyAmount<Currency>;
    quoteAmountOut: CurrencyAmount<Currency>;
  } {
    // If dealing with an instance of the aggregated Trade object, unbundle it to individual trade objects.
    if (trades instanceof Trade) {
      let individualTrades: TradeSDK<Currency, Currency, TradeType>[] = [];

      for (const { route, inputAmount, outputAmount } of trades.swaps) {
        individualTrades.push(
          TradeSDK.createUncheckedTrade({
            route: route as Route<Currency, Currency>,
            inputAmount,
            outputAmount,
            tradeType: trades.tradeType,
          }),
        );
      }
      trades = individualTrades;
    }

    if (!Array.isArray(trades)) {
      trades = [trades];
    }

    const numberOfTrades = trades.reduce(
      (numberOfTrades, trade) =>
        numberOfTrades + (trade instanceof TradeSDK ? trade.swaps.length : 1),
      0,
    );

    const sampleTrade = trades[0];

    // All trades should have the same starting/ending currency and trade type
    invariant(
      trades.every((trade) =>
        trade.inputAmount.currency.equals(sampleTrade.inputAmount.currency),
      ),
      "TOKEN_IN_DIFF",
    );
    invariant(
      trades.every((trade) =>
        trade.outputAmount.currency.equals(sampleTrade.outputAmount.currency),
      ),
      "TOKEN_OUT_DIFF",
    );
    invariant(
      trades.every((trade) => trade.tradeType === sampleTrade.tradeType),
      "TRADE_TYPE_DIFF",
    );

    const calldatas: string[] = [];

    const inputIsNative = sampleTrade.inputAmount.currency.isNative;
    const outputIsNative = sampleTrade.outputAmount.currency.isNative;

    // flag for whether we want to perform an aggregated slippage check
    //   1. when there are >2 exact input trades. this is only a heuristic,
    //      as it's still more gas-expensive even in this case, but has benefits
    //      in that the reversion probability is lower
    const performAggregatedSlippageCheck =
      sampleTrade.tradeType === TradeType.EXACT_INPUT && numberOfTrades > 2;
    // flag for whether funds should be send first to the router
    //   1. when receiving ETH (which much be unwrapped from WETH)
    //   2. when a fee on the output is being taken
    //   3. when performing swap and add
    //   4. when performing an aggregated slippage check
    const routerMustCustody =
      outputIsNative ||
      !!options.fee ||
      !!isSwapAndAdd ||
      performAggregatedSlippageCheck;

    // encode permit if necessary
    if (options.inputTokenPermit) {
      invariant(sampleTrade.inputAmount.currency.isToken, "NON_TOKEN_PERMIT");
      calldatas.push(
        SelfPermit.encodePermit(
          sampleTrade.inputAmount.currency,
          options.inputTokenPermit,
        ),
      );
    }

    for (const trade of trades) {
      if (trade instanceof TradeSDK) {
        for (const calldata of SwapRouter.encodeV3Swap(
          trade,
          options,
          routerMustCustody,
          performAggregatedSlippageCheck,
        )) {
          calldatas.push(calldata);
        }
      } else {
        throw new Error("Unsupported trade object");
      }
    }

    const ZERO_IN: CurrencyAmount<Currency> = CurrencyAmount.fromRawAmount(
      sampleTrade.inputAmount.currency,
      0,
    );
    const ZERO_OUT: CurrencyAmount<Currency> = CurrencyAmount.fromRawAmount(
      sampleTrade.outputAmount.currency,
      0,
    );

    const minimumAmountOut: CurrencyAmount<Currency> = trades.reduce(
      (sum, trade) =>
        sum.add(trade.minimumAmountOut(options.slippageTolerance)),
      ZERO_OUT,
    );

    const quoteAmountOut: CurrencyAmount<Currency> = trades.reduce(
      (sum, trade) => sum.add(trade.outputAmount),
      ZERO_OUT,
    );

    const totalAmountIn: CurrencyAmount<Currency> = trades.reduce(
      (sum, trade) => sum.add(trade.maximumAmountIn(options.slippageTolerance)),
      ZERO_IN,
    );

    return {
      calldatas,
      sampleTrade,
      routerMustCustody,
      inputIsNative,
      outputIsNative,
      totalAmountIn,
      minimumAmountOut,
      quoteAmountOut,
    };
  }

  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trades to produce call parameters for
   * @param options options for the call parameters
   */
  public static swapCallParameters(
    trades:
      | Trade<Currency, Currency, TradeType>
      | TradeSDK<Currency, Currency, TradeType>
      | TradeSDK<Currency, Currency, TradeType>[],
    options: SwapOptions,
  ): MethodParameters {
    const {
      calldatas,
      sampleTrade,
      routerMustCustody,
      inputIsNative,
      outputIsNative,
      totalAmountIn,
      minimumAmountOut,
    } = SwapRouter.encodeSwaps(trades, options);

    // unwrap or sweep
    if (routerMustCustody) {
      if (outputIsNative) {
        calldatas.push(
          PaymentsExtended.encodeUnwrapWETH9(
            minimumAmountOut.quotient,
            options.recipient,
            options.fee,
          ),
        );
      } else {
        calldatas.push(
          PaymentsExtended.encodeSweepToken(
            sampleTrade.outputAmount.currency.wrapped,
            minimumAmountOut.quotient,
            options.recipient,
            options.fee,
          ),
        );
      }
    }

    // must refund when paying in ETH: either with an uncertain input amount OR if there's a chance of a partial fill.
    // unlike ERC20's, the full ETH value must be sent in the transaction, so the rest must be refunded.
    if (
      inputIsNative &&
      (sampleTrade.tradeType === TradeType.EXACT_OUTPUT ||
        SwapRouter.riskOfPartialFill(trades))
    ) {
      calldatas.push(Payments.encodeRefundETH());
    }

    return {
      calldata: MulticallExtended.encodeMulticall(
        calldatas,
        options.deadlineOrPreviousBlockhash,
      ),
      value: toHex(inputIsNative ? totalAmountIn.quotient : ZERO),
    };
  }

  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trades to produce call parameters for
   * @param options options for the call parameters
   */
  public static swapAndAddCallParameters(
    trades: AnyTradeType,
    options: SwapAndAddOptions,
    position: Position,
    addLiquidityOptions: CondensedAddLiquidityOptions,
    tokenInApprovalType: ApprovalTypes,
    tokenOutApprovalType: ApprovalTypes,
  ): MethodParameters {
    const {
      calldatas,
      inputIsNative,
      outputIsNative,
      totalAmountIn: totalAmountSwapped,
      quoteAmountOut,
      minimumAmountOut,
    } = SwapRouter.encodeSwaps(trades, options, true);

    // encode output token permit if necessary
    if (options.outputTokenPermit) {
      invariant(quoteAmountOut.currency.isToken, "NON_TOKEN_PERMIT_OUTPUT");
      calldatas.push(
        SelfPermit.encodePermit(
          quoteAmountOut.currency,
          options.outputTokenPermit,
        ),
      );
    }

    const zeroForOne =
      position.pool.token0.wrapped.address ===
      totalAmountSwapped.currency.wrapped.address;
    const { positionAmountIn, positionAmountOut } =
      SwapRouter.getPositionAmounts(position, zeroForOne);

    // if tokens are native they will be converted to WETH9
    const tokenIn = inputIsNative
      ? WRAPPED_NATIVE_TOKEN
      : positionAmountIn.currency.wrapped;
    const tokenOut = outputIsNative
      ? WRAPPED_NATIVE_TOKEN
      : positionAmountOut.currency.wrapped;

    // if swap output does not make up whole outputTokenBalanceDesired, pull in remaining tokens for adding liquidity
    const amountOutRemaining = positionAmountOut.subtract(
      quoteAmountOut.wrapped,
    );
    if (
      amountOutRemaining.greaterThan(
        CurrencyAmount.fromRawAmount(positionAmountOut.currency, 0),
      )
    ) {
      // if output is native, this means the remaining portion is included as native value in the transaction
      // and must be wrapped. Otherwise, pull in remaining ERC20 token.
      outputIsNative
        ? calldatas.push(
            PaymentsExtended.encodeWrapETH(amountOutRemaining.quotient),
          )
        : calldatas.push(
            PaymentsExtended.encodePull(tokenOut, amountOutRemaining.quotient),
          );
    }

    // if input is native, convert to WETH9, else pull ERC20 token
    inputIsNative
      ? calldatas.push(
          PaymentsExtended.encodeWrapETH(positionAmountIn.quotient),
        )
      : calldatas.push(
          PaymentsExtended.encodePull(tokenIn, positionAmountIn.quotient),
        );

    // approve token balances to NFTManager
    if (tokenInApprovalType !== ApprovalTypes.NOT_REQUIRED)
      calldatas.push(
        ApproveAndCall.encodeApprove(tokenIn, tokenInApprovalType),
      );
    if (tokenOutApprovalType !== ApprovalTypes.NOT_REQUIRED)
      calldatas.push(
        ApproveAndCall.encodeApprove(tokenOut, tokenOutApprovalType),
      );

    // represents a position with token amounts resulting from a swap with maximum slippage
    // hence the minimal amount out possible.
    const minimalPosition = Position.fromAmounts({
      pool: position.pool,
      tickLower: position.tickLower,
      tickUpper: position.tickUpper,
      amount0: zeroForOne
        ? position.amount0.quotient.toString()
        : minimumAmountOut.quotient.toString(),
      amount1: zeroForOne
        ? minimumAmountOut.quotient.toString()
        : position.amount1.quotient.toString(),
      useFullPrecision: false,
    });

    // encode NFTManager add liquidity
    calldatas.push(
      ApproveAndCall.encodeAddLiquidity(
        position,
        minimalPosition,
        addLiquidityOptions,
        options.slippageTolerance,
      ),
    );

    // sweep remaining tokens
    inputIsNative
      ? calldatas.push(PaymentsExtended.encodeUnwrapWETH9(ZERO))
      : calldatas.push(PaymentsExtended.encodeSweepToken(tokenIn, ZERO));
    outputIsNative
      ? calldatas.push(PaymentsExtended.encodeUnwrapWETH9(ZERO))
      : calldatas.push(PaymentsExtended.encodeSweepToken(tokenOut, ZERO));

    let value: JSBI;
    if (inputIsNative) {
      value = totalAmountSwapped.wrapped.add(positionAmountIn.wrapped).quotient;
    } else if (outputIsNative) {
      value = amountOutRemaining.quotient;
    } else {
      value = ZERO;
    }

    return {
      calldata: MulticallExtended.encodeMulticall(
        calldatas,
        options.deadlineOrPreviousBlockhash,
      ),
      value: value.toString(),
    };
  }

  // if price impact is very high, there's a chance of hitting max/min prices resulting in a partial fill of the swap
  private static riskOfPartialFill(trades: AnyTradeType): boolean {
    if (Array.isArray(trades)) {
      return trades.some((trade) => {
        return SwapRouter.v3TradeWithHighPriceImpact(trade);
      });
    } else {
      return SwapRouter.v3TradeWithHighPriceImpact(trades);
    }
  }

  private static v3TradeWithHighPriceImpact(
    trade:
      | Trade<Currency, Currency, TradeType>
      | TradeSDK<Currency, Currency, TradeType>,
  ): boolean {
    return trade.priceImpact.greaterThan(REFUND_ETH_PRICE_IMPACT_THRESHOLD);
  }

  private static getPositionAmounts(
    position: Position,
    zeroForOne: boolean,
  ): {
    positionAmountIn: CurrencyAmount<Currency>;
    positionAmountOut: CurrencyAmount<Currency>;
  } {
    const { amount0, amount1 } = position.mintAmounts;
    const currencyAmount0 = CurrencyAmount.fromRawAmount(
      position.pool.token0,
      amount0,
    );
    const currencyAmount1 = CurrencyAmount.fromRawAmount(
      position.pool.token1,
      amount1,
    );

    const [positionAmountIn, positionAmountOut] = zeroForOne
      ? [currencyAmount0, currencyAmount1]
      : [currencyAmount1, currencyAmount0];
    return { positionAmountIn, positionAmountOut };
  }
}
