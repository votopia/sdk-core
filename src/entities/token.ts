import { BigNumber } from "@ethersproject/bignumber";
import invariant from "tiny-invariant";

import { BaseCurrency } from "./baseCurrency";
import { Currency } from "./currency";

export class Token extends BaseCurrency {
  public readonly isNative: false = false;
  public readonly isToken: true = true;

  public readonly address: string;

  /**
   * Relevant for fee-on-transfer (FOT) token taxes,
   * Not every ERC20 token is FOT token, so this field is optional
   */
  public readonly buyFeeBps?: BigNumber;
  public readonly sellFeeBps?: BigNumber;

  public constructor(
    address: string,
    decimals: number,
    symbol: string,
    name: string,
    icon?: string,
    coingeckoId?: string,
    buyFeeBps?: BigNumber,
    sellFeeBps?: BigNumber,
  ) {
    super(decimals, symbol, name, icon, coingeckoId);
    this.address = address;

    if (buyFeeBps) {
      invariant(buyFeeBps.gte(BigNumber.from(0)), "NON-NEGATIVE FOT FEES");
    }
    if (sellFeeBps) {
      invariant(sellFeeBps.gte(BigNumber.from(0)), "NON-NEGATIVE FOT FEES");
    }
    this.buyFeeBps = buyFeeBps;
    this.sellFeeBps = sellFeeBps;
  }

  public equals(other: Currency): boolean {
    return (
      other.isToken &&
      this.address.toLowerCase() === other.address.toLowerCase()
    );
  }

  public sortsBefore(other: Token): boolean {
    invariant(
      this.address.toLowerCase() !== other.address.toLowerCase(),
      "ADDRESSES",
    );
    return this.address.toLowerCase() < other.address.toLowerCase();
  }

  public get wrapped(): Token {
    return this;
  }
}
