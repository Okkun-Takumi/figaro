import type { Scene } from "../../../engine/types"

const presentation = {
  backgroundId: "manor-hallway",
  characters: [
    { characterId: "susanna", expressionId: "neutral", position: "left" as const },
    { characterId: "cherubino", expressionId: "surprised", position: "right" as const },
  ],
}

export const cherubino = {
  id: "cherubino",
  backgroundId: "manor-hallway",
  initialNodeId: "cherubino-entry",
  nodes: {
    "cherubino-entry": { type: "dialogue", id: "cherubino-entry", speakerId: "cherubino", text: "「スザンナ、助けてくれ！」", presentation, effects: [{ type: "setFlag", key: "knowsCherubinoIsPage", value: true }], next: { nodeId: "susanna-question" } },
    "susanna-question": { type: "dialogue", id: "susanna-question", speakerId: "susanna", text: "「今度は何をしたの？」", presentation, next: { nodeId: "cherubino-denial" } },
    "cherubino-denial": { type: "dialogue", id: "cherubino-denial", speakerId: "cherubino", text: "「何もしてない！」", presentation, next: { nodeId: "susanna-retort" } },
    "susanna-retort": { type: "dialogue", id: "susanna-retort", speakerId: "susanna", text: "「あなたがそう言う時は、大抵何かしてるわ」", presentation, next: { nodeId: "barbarina" } },
    "barbarina": { type: "dialogue", id: "barbarina", speakerId: "cherubino", text: "「バルバリーナに会っていただけなんだ。少し話していたら、そこへ伯爵様が！」", presentation, effects: [{ type: "setFlag", key: "knowsBarbarinaIncident", value: true }, { type: "setFlag", key: "knowsCherubinoBanished", value: true }], next: { nodeId: "player-confirms" } },
    "player-confirms": { type: "dialogue", id: "player-confirms", text: "それで見つかった？", presentation, next: { nodeId: "cherubino-confirms" } },
    "cherubino-confirms": { type: "dialogue", id: "cherubino-confirms", speakerId: "cherubino", text: "「……うん。館から追い出すと言われた」", presentation, next: { nodeId: "cherubino-choice" } },
    "cherubino-choice": {
      type: "choice", id: "cherubino-choice", prompt: "ケルビーノをどう見る？", presentation,
      choices: [
        { id: "tease", text: "懲りないな", effects: [{ type: "setFlag", key: "teasesCherubino", value: true }], next: { nodeId: "tease-reaction" } },
        { id: "understand-infatuation", text: "本当に女性が好きなんだな", effects: [{ type: "setFlag", key: "understandsCherubinoInfatuation", value: true }], next: { nodeId: "infatuation-reaction" } },
        { id: "ask-countess", text: "伯爵夫人のことも好きなのか？", effects: [{ type: "setFlag", key: "knowsCherubinoLikesCountess", value: true }], next: { nodeId: "countess-reaction" } },
      ],
    },
    "tease-reaction": { type: "dialogue", id: "tease-reaction", speakerId: "cherubino", text: "「笑いごとじゃないよ。伯爵様は本気で怒っていたんだ」", presentation, next: { nodeId: "cherubino-rejoin" } },
    "infatuation-reaction": { type: "dialogue", id: "infatuation-reaction", speakerId: "cherubino", text: "「好きっていうより、会うと胸が苦しくなるんだ。誰に会っても、どうしていいか分からない」", presentation, next: { nodeId: "cherubino-rejoin" } },
    "countess-reaction": { type: "dialogue", id: "countess-reaction", speakerId: "cherubino", text: "「伯爵夫人は……そんな、口に出さないでくれ！」ケルビーノは真っ赤になった。彼の憧れは、彼自身だけの一方的なものだ。", presentation, next: { nodeId: "cherubino-rejoin" } },
    "cherubino-rejoin": { type: "dialogue", id: "cherubino-rejoin", speakerId: "cherubino", text: "「僕は自分でも変なんだ。誰かを見ると心臓が走り出すみたいで……」", presentation, next: { nodeId: "non-so-piu-title" } },
    "non-so-piu-title": { type: "dialogue", id: "non-so-piu-title", text: "♪ Non so più cosa son, cosa faccio", presentation, next: { nodeId: "non-so-piu-explanation" } },
    "non-so-piu-explanation": { type: "dialogue", id: "non-so-piu-explanation", text: "歌う人物：ケルビーノ。女性を見れば胸が高鳴り、自分でもどうしていいか分からない。", presentation, next: { nodeId: "non-so-piu-point" } },
    "non-so-piu-point": { type: "dialogue", id: "non-so-piu-point", text: "ケルビーノの「恋そのものに恋しているような思春期」を表すアリアだ。特定の一人だけへの告白ではなく、彼自身が恋愛感情に振り回されている場面である。", presentation, next: { nodeId: "footsteps" } },
    "footsteps": { type: "dialogue", id: "footsteps", text: "そのとき、廊下から足音が近づいてくる。", presentation, next: { nodeId: "cherubino-alarm" } },
    "cherubino-alarm": { type: "dialogue", id: "cherubino-alarm", speakerId: "cherubino", text: "「……まずい」", presentation, next: { nodeId: "susanna-alarm" } },
    "susanna-alarm": { type: "dialogue", id: "susanna-alarm", speakerId: "susanna", text: "「何？」", presentation, next: { nodeId: "count-arrives" } },
    "count-arrives": { type: "dialogue", id: "count-arrives", speakerId: "cherubino", text: "「伯爵様だ！」", presentation, next: { nodeId: "a1-11-pending" } },
    "a1-11-pending": { type: "dialogue", id: "a1-11-pending", text: "扉の向こうに、伯爵の気配が迫る。", presentation, next: { sceneId: "count-cherubino", nodeId: "susanna-startles" } },
  },
} satisfies Scene
