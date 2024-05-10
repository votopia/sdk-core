import { Price } from "./fractions";
import { Token } from "./token";
import { Currency } from "./currency";
import { Pool } from "./pool";
/**
 * Represents a list of pools through which a swap can occur
 * @template TInput The input token
 * @template TOutput The output token
 */
export declare class RouteSDK<TInput extends Currency, TOutput extends Currency> {
    readonly pools: Pool[];
    readonly tokenPath: Token[];
    readonly input: TInput;
    readonly output: TOutput;
    private _midPrice;
    /**
     * Creates an instance of route.
     * @param pools An array of `Pool` objects, ordered by the route the swap will take
     * @param input The input token
     * @param output The output token
     */
    constructor(pools: Pool[], input: TInput, output: TOutput);
    /**
     * Returns the mid price of the route
     */
    get midPrice(): Price<TInput, TOutput>;
}
export interface IRoute<TInput extends Currency, TOutput extends Currency, TPool extends Pool> {
    pools: TPool[];
    path: Token[];
    midPrice: Price<TInput, TOutput>;
    input: TInput;
    output: TOutput;
}
export declare class Route<TInput extends Currency, TOutput extends Currency> extends RouteSDK<TInput, TOutput> implements IRoute<TInput, TOutput, Pool> {
    readonly path: Token[];
    constructor(v3Route: RouteSDK<TInput, TOutput>);
}
