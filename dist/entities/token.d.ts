import { BigNumber } from "@ethersproject/bignumber";
import { BaseCurrency } from "./baseCurrency";
import { Currency } from "./currency";
export declare class Token extends BaseCurrency {
    readonly isNative: false;
    readonly isToken: true;
    readonly address: string;
    /**
     * Relevant for fee-on-transfer (FOT) token taxes,
     * Not every ERC20 token is FOT token, so this field is optional
     */
    readonly buyFeeBps?: BigNumber;
    readonly sellFeeBps?: BigNumber;
    constructor(address: string, decimals: number, symbol: string, name: string, icon?: string, coingeckoId?: string, buyFeeBps?: BigNumber, sellFeeBps?: BigNumber);
    equals(other: Currency): boolean;
    sortsBefore(other: Token): boolean;
    get wrapped(): Token;
}
