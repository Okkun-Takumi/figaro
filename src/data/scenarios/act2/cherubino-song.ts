import type { Scene } from "../../../engine/types"

const presentation = {
  backgroundId: "countess-bedroom",
  characters: [
    { characterId: "countess", expressionId: "neutral", position: "left" as const },
    { characterId: "cherubino", expressionId: "flustered", position: "right" as const },
  ],
}

const allThreePresentation = {
  backgroundId: "countess-bedroom",
  characters: [
    { characterId: "countess", expressionId: "neutral", position: "left" as const },
    { characterId: "susanna", expressionId: "smile", position: "center" as const },
    { characterId: "cherubino", expressionId: "flustered", position: "right" as const },
  ],
}

export const cherubinoSong = {
  id: "cherubino-song",
  backgroundId: "countess-bedroom",
  initialNodeId: "cherubino-enters",
  nodes: {
    "cherubino-enters": { type: "dialogue", id: "cherubino-enters", speakerId: "cherubino", text: "「伯爵夫人……。失礼します。」", presentation, next: { nodeId: "susanna-teases" } },
    "susanna-teases": { type: "dialogue", id: "susanna-teases", speakerId: "susanna", text: "「さっきまであんなに慌てていたのに、奥様の前では急に静かになるのね。」", presentation: allThreePresentation, next: { nodeId: "countess-asks-song" } },
    "countess-asks-song": { type: "dialogue", id: "countess-asks-song", speakerId: "countess", text: "「ケルビーノ。あなたが書いた歌を、聞かせてくれる？」", presentation, next: { nodeId: "voi-che-sapete" } },
    "voi-che-sapete": { type: "dialogue", id: "voi-che-sapete", text: "♪ Voi che sapete", presentation: { ...presentation, musicId: "voiCheSapete" }, next: { nodeId: "song-reaction" } },
    "song-reaction": { type: "dialogue", id: "song-reaction", text: "ケルビーノは、恋とは何なのかを伯爵夫人に尋ねるように歌った。伯爵夫人はその真剣さに、少しだけ表情をやわらげる。", presentation: { ...presentation, characters: [{ characterId: "countess", expressionId: "smile", position: "left" }, { characterId: "cherubino", expressionId: "flustered", position: "right" }] }, next: { nodeId: "voi-choice" } },
    "voi-choice": {
      type: "choice",
      id: "voi-choice",
      prompt: "この歌をどう受け取る？",
      presentation: allThreePresentation,
      choices: [
        { id: "focus-on-countess", text: "伯爵夫人に向けて歌っているように聞こえる", effects: [{ type: "setFlag", key: "noticedCherubinoFocusOnCountess", value: true }], next: { nodeId: "focus-on-countess-reaction" } },
        { id: "understand-feelings", text: "自分でも分からない恋愛感情に戸惑っている", effects: [{ type: "setFlag", key: "understandsVoiCheSapete", value: true }, { type: "changeAffinity", characterId: "cherubino", amount: 1 }], next: { nodeId: "understand-feelings-reaction" } },
        { id: "notice-susanna-teasing", text: "スザンナが楽しそうにからかっている", effects: [{ type: "setFlag", key: "noticedSusannaTeasingCherubino", value: true }], next: { nodeId: "notice-susanna-teasing-reaction" } },
      ],
    },
    "focus-on-countess-reaction": { type: "dialogue", id: "focus-on-countess-reaction", text: "ケルビーノの視線は、歌のあいだ何度も伯爵夫人へ向かう。だがそれは、少年の憧れの熱さでもある。", presentation, next: { nodeId: "voi-rejoin" } },
    "understand-feelings-reaction": { type: "dialogue", id: "understand-feelings-reaction", text: "ケルビーノは特定の誰かだけを語っているのではない。自分に起きている恋そのものに、まだ振り回されている。", presentation, next: { nodeId: "voi-rejoin" } },
    "notice-susanna-teasing-reaction": { type: "dialogue", id: "notice-susanna-teasing-reaction", speakerId: "susanna", text: "「ほらね。歌にすると、ますます顔が赤くなる。」", presentation: allThreePresentation, next: { nodeId: "voi-rejoin" } },
    "voi-rejoin": { type: "dialogue", id: "voi-rejoin", text: "伯爵夫人は歌を褒め、ケルビーノはますます居心地が悪そうにした。", presentation: allThreePresentation, next: { nodeId: "commission-paper" } },
    "commission-paper": { type: "dialogue", id: "commission-paper", speakerId: "countess", text: "「そうだわ。伯爵があなたを軍へ送るための任官状を、ここへ持ってきて。」", presentation, next: { nodeId: "missing-seal" } },
    "missing-seal": { type: "dialogue", id: "missing-seal", speakerId: "cherubino", text: "「これです。でも……封印がありません。伯爵様が急いで署名したので、押し忘れたのかも。」", presentation, effects: [{ type: "setFlag", key: "knowsCherubinoCommissionMissingSeal", value: true }], next: { nodeId: "a2-04-pending" } },
    "a2-04-pending": { type: "dialogue", id: "a2-04-pending", text: "スザンナはケルビーノを見て、変装の準備を始めた。", presentation: allThreePresentation, next: { sceneId: "cherubino-disguise", nodeId: "disguise-start" } },
  },
} satisfies Scene
