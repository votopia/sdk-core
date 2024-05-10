import { Interface } from "@ethersproject/abi";
import { Currency, Percent, TradeSDK, Trade, Position } from "./entities";
import { MethodParameters } from "./utils";
import { TradeType } from "./constants";
import { FeeOptions } from "./payments";
import { PermitOptions } from "./selfPermit";
import { ApprovalTypes, CondensedAddLiquidityOptions } from "./approveAndCall";
import { Validation } from "./multicallExtended";
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
declare type AnyTradeType = Trade<Currency, Currency, TradeType> | TradeSDK<Currency, Currency, TradeType> | TradeSDK<Currency, Currency, TradeType>[];
/**
 * Represents the Uniswap V2 + V3 SwapRouter02, and has static methods for helping execute trades.
 */
export declare abstract class SwapRouter {
    static INTERFACE: Interface;
    /**
     * Cannot be constructed.
     */
    private constructor();
    /**
     * @notice Generates the calldata for a Swap with a V3 Route.
     * @param trade The V3Trade to encode.
     * @param options SwapOptions to use for the trade.
     * @param routerMustCustody Flag for whether funds should be sent to the router
     * @param performAggregatedSlippageCheck Flag for whether we want to perform an aggregated slippage check
     * @returns A string array of calldatas for the trade.
     */
    private static encodeV3Swap;
    private static encodeSwaps;
    /**
     * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
     * @param trades to produce call parameters for
     * @param options options for the call parameters
     */
    static swapCallParameters(trades: Trade<Currency, Currency, TradeType> | TradeSDK<Currency, Currency, TradeType> | TradeSDK<Currency, Currency, TradeType>[], options: SwapOptions): MethodParameters;
    /**
     * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
     * @param trades to produce call parameters for
     * @param options options for the call parameters
     */
    static swapAndAddCallParameters(trades: AnyTradeType, options: SwapAndAddOptions, position: Position, addLiquidityOptions: CondensedAddLiquidityOptions, tokenInApprovalType: ApprovalTypes, tokenOutApprovalType: ApprovalTypes): MethodParameters;
    private static riskOfPartialFill;
    private static v3TradeWithHighPriceImpact;
    private static getPositionAmounts;
}
export {};
