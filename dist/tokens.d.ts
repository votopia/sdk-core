import { Token, Currency, NativeCurrency } from "./entities";
export declare const USDC: Token;
export declare const WRAPPED_NATIVE_TOKEN: Token;
declare class _NativeCurrenty extends NativeCurrency {
    constructor();
    get wrapped(): Token;
    equals(other: Currency): boolean;
    static get id(): string;
}
export declare const NATIVE_CURRENCY: _NativeCurrenty;
export {};
