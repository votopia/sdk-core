import { Currency } from "./currency";
import { Token } from "./token";
export declare abstract class BaseCurrency {
    abstract readonly isNative: boolean;
    abstract readonly isToken: boolean;
    readonly decimals: number;
    readonly symbol: string;
    readonly icon?: string;
    readonly coingeckoId?: string;
    readonly name?: string;
    protected constructor(decimals: number, symbol: string, name: string, icon?: string, coingeckoId?: string);
    abstract equals(other: Currency): boolean;
    abstract get wrapped(): Token;
}
