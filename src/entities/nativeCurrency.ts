import { BaseCurrency } from "./baseCurrency";

export abstract class NativeCurrency extends BaseCurrency {
  public readonly isNative: true = true;
  public readonly isToken: false = false;
}
