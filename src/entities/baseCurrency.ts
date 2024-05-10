import invariant from "tiny-invariant";

import { Currency } from "./currency";
import { Token } from "./token";

export abstract class BaseCurrency {
  public abstract readonly isNative: boolean;
  public abstract readonly isToken: boolean;

  public readonly decimals: number;
  public readonly symbol: string;
  public readonly icon?: string;
  public readonly coingeckoId?: string;
  public readonly name?: string;

  protected constructor(
    decimals: number,
    symbol: string,
    name: string,
    icon?: string,
    coingeckoId?: string
  ) {
    invariant(
      decimals >= 0 && decimals < 255 && Number.isInteger(decimals),
      "DECIMALS"
    );

    this.decimals = decimals;
    this.symbol = symbol;
    this.name = name;
    this.icon = icon;
    this.coingeckoId = coingeckoId;
  }

  public abstract equals(other: Currency): boolean;

  public abstract get wrapped(): Token;
}
