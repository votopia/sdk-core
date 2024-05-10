export interface TokenInfo {
    readonly address: string;
    readonly name: string;
    readonly decimals: number;
    readonly symbol: string;
    readonly icon?: string;
    readonly coingeckoId?: string;
}
export interface TokenListVersion {
    readonly major: number;
    readonly minor: number;
    readonly patch: number;
}
export interface TokenListTags {
    readonly [tagId: string]: {
        readonly name: string;
        readonly description: string;
    };
}
export interface TokenList {
    readonly name: string;
    readonly timestamp: string;
    readonly version: TokenListVersion;
    readonly tokens: TokenInfo[];
    readonly keywords?: string[];
    readonly tags?: TokenListTags;
    readonly logoURI?: string;
}
