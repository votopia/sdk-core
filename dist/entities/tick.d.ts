import JSBI from "jsbi";
import { BigintIsh } from "../constants";
export interface TickConstructorArgs {
    index: number;
    liquidityGross: BigintIsh;
    liquidityNet: BigintIsh;
}
export declare class Tick {
    readonly index: number;
    readonly liquidityGross: JSBI;
    readonly liquidityNet: JSBI;
    constructor({ index, liquidityGross, liquidityNet }: TickConstructorArgs);
}
