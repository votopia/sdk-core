import JSBI from "jsbi";

export type BigintIsh = JSBI | string | number;

export const MaxUint256 = JSBI.BigInt(
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
);

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT,
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}

/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
export enum FeeAmount {
  LOWEST = 100,
  LOW = 500,
  MEDIUM = 3000,
  HIGH = 10000,
}

/**
 * The default factory tick spacings by fee amount.
 */
export const TICK_SPACINGS: { [amount in FeeAmount]: number } = {
  [FeeAmount.LOWEST]: 1,
  [FeeAmount.LOW]: 10,
  [FeeAmount.MEDIUM]: 60,
  [FeeAmount.HIGH]: 200,
};

// constants used internally but not expected to be used externally
export const NEGATIVE_ONE = JSBI.BigInt(-1);
export const ZERO = JSBI.BigInt(0);
export const ONE = JSBI.BigInt(1);

// used in liquidity amount math
export const Q96 = JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(96));
export const Q192 = JSBI.exponentiate(Q96, JSBI.BigInt(2));

export const POOL_INIT_CODE_HASH =
  "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54";

export const NATIVE_CURRENCY_ID = "ETH";
export const NATIVE_CURRENCY_NAME = "Ethereum";
export const NATIVE_CURRENCY_ICON = "/icons/eth.svg";
export const NATIVE_CURRENCY_COINGECKO_ID = "ethereum";

export const WRAPPED_NATIVE_CURRENCY_ID = "WETH";
export const WRAPPED_NATIVE_CURRENCY_NAME = "Wrapped ETH";

export const MSG_SENDER = "0x0000000000000000000000000000000000000001";
export const ADDRESS_THIS = "0x0000000000000000000000000000000000000002";
