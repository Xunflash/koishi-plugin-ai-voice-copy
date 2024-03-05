"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.Config = exports.name = void 0;
const koishi_1 = require("koishi");
exports.name = "ai-voice";
exports.Config = koishi_1.Schema.object({
    character: koishi_1.Schema.dict(koishi_1.Schema.object({
        Api: koishi_1.Schema.string().required().description("API接口地址"),
        Alias: koishi_1.Schema.array(koishi_1.Schema.string()).description("别名"),
        SDP_DP_MixingRatio: koishi_1.Schema.number().role('slider').description("SDP/DP混合比").min(0).max(1).step(0.01).default(0.2),
        AffectiveRegulation: koishi_1.Schema.number().role('slider').description("感情调节").min(0).max(1).step(0.01).default(0.5),
        PhonemeLength: koishi_1.Schema.number().role('slider').description("音素长度").min(0).max(1).step(0.01).default(0.9),
        GeneratingLength: koishi_1.Schema.number().role('slider').description("生成长度").min(0).max(1).step(0.01).default(1),
    })).description("声音角色"),
    usage: koishi_1.Schema.string().role('textarea', { rows: [2, 4] })
});
let clientInstance = undefined;
const importDynamic = new Function("modulePath", "return import(modulePath)");
function apply(ctx, ctxConfig) {
    ctx.command("voice <character:string> <message:text>", "AI声音生成", { authority: 0 })
        .option("sdm", "-s [sdm:number] SDP/DP混合比")
        .option("ar", "-a [ar:number] 感情调节")
        .option("pl", "-p [pl:number] 音素长度")
        .option("gl", "-g [gl:number] 生成长度")
        .usage(ctxConfig.usage || "暂无描述")
        .action(async ({ options }, character, message) => {
        let matchedCharacter = '';
        Object.keys(ctxConfig.character).some((key) => {
            const low = character?.trim().toLowerCase();
            if (key.toLowerCase() === low || ctxConfig.character[key].Alias.includes(low)) {
                matchedCharacter = key;
                return true;
            }
            return false;
        });
        const config = ctxConfig.character[matchedCharacter];
        if (!config || !message?.trim()) {
            return ctxConfig.usage;
        }
        if (!clientInstance) {
            const { client } = await importDynamic("@gradio/client");
            clientInstance = client;
        }
        let appInstance = undefined;
        try {
            appInstance = await clientInstance(config.Api);
        }
        catch (error) {
            console.log("client error", error);
            return `该模型已挂,请重新选择!`;
        }
        console.log(appInstance);
        if (appInstance === undefined) {
            return `模型选择失败,请重新选择!`;
        }
        let hasError = false;
        const result = await appInstance.predict(0, [
            message?.trim(),
            matchedCharacter,
            options.sdm || config.SDP_DP_MixingRatio,
            options.ar || config.AffectiveRegulation,
            options.pl || config.PhonemeLength,
            options.gl || config.GeneratingLength
        ]).catch((err) => {
            console.log("app predict error", err);
            hasError = true;
        });
        if (hasError) {
            return `该模型请求错误,请重试!`;
        }
        const url = result.data[1].data || '';
        if (url) {
            return (0, koishi_1.h)("audio", { url: url });
        }
        return (0, koishi_1.h)(`${matchedCharacter} 无返回数据,请重试!`);
    });
}
exports.apply = apply;
