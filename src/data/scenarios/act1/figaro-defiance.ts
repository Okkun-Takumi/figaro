import type { Scene } from "../../../engine/types"

const presentation = {
  backgroundId: "wedding-room",
  characters: [
    { characterId: "figaro", expressionId: "serious", position: "left" as const },
    { characterId: "susanna", expressionId: "serious", position: "right" as const },
  ],
}

export const figaroDefiance = {
  id: "figaro-defiance",
  backgroundId: "wedding-room",
  initialNodeId: "strategy-choice",
  nodes: {
    "strategy-choice": {
      type: "choice", id: "strategy-choice", prompt: "伯爵にどう対抗する？", presentation,
      choices: [
        { id: "direct-action", text: "フィガロに直接対抗を促す", effects: [{ type: "setFlag", key: "prefersDirectAction", value: true }], next: { nodeId: "direct-action-reaction" } },
        { id: "use-strategy", text: "フィガロの作戦を聞く", effects: [{ type: "changeAffinity", characterId: "figaro", amount: 1 }, { type: "setFlag", key: "understandsFigaroStrategy", value: true }], next: { nodeId: "strategy-reaction" } },
        { id: "ask-susanna", text: "まずスザンナの望みを聞く", effects: [{ type: "changeAffinity", characterId: "susanna", amount: 1 }, { type: "setFlag", key: "prioritizesSusanna", value: true }], next: { nodeId: "susanna-reaction" } },
      ],
    },
    "direct-action-reaction": { type: "dialogue", id: "direct-action-reaction", speakerId: "figaro", text: "「正面から、か。悪くない。だが相手は伯爵だ、勝つには踊らせ方を考えなくちゃならない」", presentation, next: { nodeId: "strategy-rejoin" } },
    "strategy-reaction": { type: "dialogue", id: "strategy-reaction", speakerId: "figaro", text: "「そう、腕力ではなく頭で勝つ。伯爵自身に、自分の仕掛けた罠を踏ませればいい」", presentation, next: { nodeId: "strategy-rejoin" } },
    "susanna-reaction": { type: "dialogue", id: "susanna-reaction", speakerId: "susanna", text: "「私の望み？ 自分で選んだ人と結婚すること。それだけは、誰にも譲らない」", presentation, next: { nodeId: "strategy-rejoin" } },
    "strategy-rejoin": { type: "dialogue", id: "strategy-rejoin", text: "二人の答えは違っていても、伯爵の思いどおりにはさせないという一点では重なっていた。", presentation, next: { nodeId: "figaro-defiance" } },
    "figaro-defiance": { type: "dialogue", id: "figaro-defiance", speakerId: "figaro", text: "「貴族だからといって、何でも手に入ると思わせておくものか」", presentation, next: { nodeId: "figaro-song" } },
    "figaro-song": { type: "dialogue", id: "figaro-song", speakerId: "figaro", text: "フィガロは低く、けれど確かな声で歌い始めた。伯爵へ向けた、挑戦の歌だった。", presentation, next: { nodeId: "song-after" } },
    "song-after": { type: "dialogue", id: "song-after", speakerId: "figaro", text: "「踊りたければ、どうぞ。あなたが笛を吹くなら、こちらはもっと大きな舞台を用意する」", presentation, next: { nodeId: "susanna-pledge" } },
    "susanna-pledge": { type: "dialogue", id: "susanna-pledge", speakerId: "susanna", text: "「私も一人じゃない。あなたと、そして味方になってくれる人たちと一緒に戦うわ」", presentation, next: { nodeId: "act1-close" } },
    "act1-close": { type: "dialogue", id: "act1-close", text: "こうしてフィガロは、館の主人へ静かな挑戦を突きつけた。婚礼の日は、まだ始まったばかりだった。", presentation, effects: [{ type: "setFlag", key: "figaroPlansResistance", value: true }], next: { sceneId: "marcellina-bartolo", nodeId: "contract-entry" } },
  },
} satisfies Scene
