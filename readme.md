# koishi-plugin-ai-voice

[![npm](https://img.shields.io/npm/v/koishi-plugin-ai-voice?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-ai-voice)

## 介绍

创建huggingface.co API的AI音频(电棍/永雏塔菲...)并且发送语音消息 | Create AI audio (otto/taffy...) from the huggingface.co API and send voice messages

通过本插件的扩展性，你可以通过配置页来添加任何你想要的AI音源

## 安装

```
前往 Koishi 插件市场添加该插件即可
```

## 使用

1. 转到插件配置页，单击声音角色右边的添加项目
2. 打开任意一个hugging face AI音源页（例如https://huggingface.co/spaces/XzJosh/otto-Bert-VITS2），单击页面下方的Use via API，并且复制上方的API
3. 配置角色的名字（白色方框中填写）、API（粘贴刚才复制的内容）、别名（调用命令时使用的角色别名）、SDP/DP混合比、感情调节、音素长度、生成长度（保持与音源页面一致即可）
4. 保存配置
5. 群组中使用`voice 别名 文本`即可生成语音

## 参数说明

    指令：voice <character> <message...>
    -s, --sdm [sdm]  SDP/DP混合比
    -a, --ar [ar]  感情调节
    -p, --pl [pl]  音素长度
    -g, --gl [gl]  生成长度