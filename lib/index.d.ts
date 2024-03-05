import { Context, Dict, Schema } from "koishi";
export declare const name: string;
export interface Config {
    character: Dict<any, string>;
    usage: string;
}
export declare const Config: Schema<Config>;
export declare function apply(ctx: Context, ctxConfig: Config): void;
