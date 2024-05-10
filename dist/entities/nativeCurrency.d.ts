import { BaseCurrency } from "./baseCurrency";
export declare abstract class NativeCurrency extends BaseCurrency {
    readonly isNative: true;
    readonly isToken: false;
}
