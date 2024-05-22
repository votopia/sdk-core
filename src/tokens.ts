import { WRAPPED_NATIVE_TOKEN_ADDRESS, USDC_TOKEN_ADDRESS } from "./addresses";

import { Token, Currency, NativeCurrency } from "./entities";

export const USDC = new Token(
  USDC_TOKEN_ADDRESS,
  6,
  "USDC",
  "USD Coin",
  "/icons/usdc.png",
  "usd-coin",
);

export const WRAPPED_NATIVE_TOKEN = new Token(
  WRAPPED_NATIVE_TOKEN_ADDRESS,
  18,
  "WETH",
  "Wrapped ETH",
  "/icons/weth.svg",
  "weth",
);

class _NativeCurrenty extends NativeCurrency {
  public constructor() {
    super(18, "ETH", "Ethereum", "/icons/eth.svg", "ethereum");
  }

  public get wrapped(): Token {
    return WRAPPED_NATIVE_TOKEN;
  }

  public equals(other: Currency): boolean {
    return other.isNative;
  }

  static get id() {
    return "ETH";
  }
}

export const NATIVE_CURRENCY = new _NativeCurrenty();
