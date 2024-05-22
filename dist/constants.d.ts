import JSBI from "jsbi";
export declare type BigintIsh = JSBI | string | number;
export declare const MaxUint256: JSBI;
export declare enum TradeType {
    EXACT_INPUT = 0,
    EXACT_OUTPUT = 1
}
export declare enum Rounding {
    ROUND_DOWN = 0,
    ROUND_HALF_UP = 1,
    ROUND_UP = 2
}
/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
export declare enum FeeAmount {
    LOWEST = 100,
    LOW = 500,
    MEDIUM = 3000,
    HIGH = 10000
}
/**
 * The default factory tick spacings by fee amount.
 */
export declare const TICK_SPACINGS: {
    [amount in FeeAmount]: number;
};
export declare const NEGATIVE_ONE: JSBI;
export declare const ZERO: JSBI;
export declare const ONE: JSBI;
export declare const Q96: JSBI;
export declare const Q192: JSBI;
export declare const POOL_INIT_CODE_HASH = "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54";
export declare const MSG_SENDER = "0x0000000000000000000000000000000000000001";
export declare const ADDRESS_THIS = "0x0000000000000000000000000000000000000002";
export declare const OVM_GASPRICE_ADDRESS = "0xb528D11cC114E026F138fE568744c6D45ce6Da7A";
export declare const NETWORK_NAME = "Votopia";
export declare const SUBGRAPH_URL = "https://graph.brcchain.io/subgraphs/name/votopia-subgraph";
export declare const JSON_RPC_PROVIER = "https://rpc.optopia.ai";
