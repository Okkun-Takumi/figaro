import type { Scene } from "../../../engine/types"

const presentation = {
  backgroundId: "manor-hallway",
  characters: [
    { characterId: "susanna", expressionId: "surprised", position: "left" as const },
    { characterId: "count", expressionId: "angry", position: "right" as const },
  ],
}

export const cherubinoDiscovered = {
  id: "cherubino-discovered",
  backgroundId: "manor-hallway",
  initialNodeId: "count-emerges",
  nodes: {
    "count-emerges": { type: "dialogue", id: "count-emerges", speakerId: "count", text: "「何だと？」", presentation, next: { nodeId: "basilio-startles" } },
    "basilio-startles": { type: "dialogue", id: "basilio-startles", speakerId: "basilio", text: "「……伯爵様！？」", presentation: { ...presentation, characters: [{ characterId: "susanna", expressionId: "surprised", position: "left" }, { characterId: "basilio", expressionId: "surprised", position: "right" }] }, next: { nodeId: "susanna-fears" } },
    "susanna-fears": { type: "dialogue", id: "susanna-fears", speakerId: "susanna", text: "「……！」伯爵は、ケルビーノが伯爵夫人に憧れているという噂に怒りを隠せない。", presentation, next: { nodeId: "count-choice" } },
    "count-choice": {
      type: "choice", id: "count-choice", prompt: "伯爵の反応をどう見る？", presentation,
      choices: [
        { id: "notice-hypocrisy", text: "自分はスザンナを口説いていたのに？", effects: [{ type: "setFlag", key: "noticedCountHypocrisy", value: true }], next: { nodeId: "hypocrisy-thought" } },
        { id: "notice-jealousy", text: "伯爵は夫人のことを気にしている？", effects: [{ type: "setFlag", key: "noticedCountJealousy", value: true }], next: { nodeId: "jealousy-thought" } },
        { id: "track-knowledge", text: "ケルビーノ、これを全部聞いてるよな……", effects: [{ type: "setFlag", key: "tracksCherubinoKnowledge", value: true }], next: { nodeId: "knowledge-thought" } },
      ],
    },
    "hypocrisy-thought": { type: "dialogue", id: "hypocrisy-thought", text: "ついさっきスザンナを口説いていた本人が、それを言うのか……。", presentation, next: { nodeId: "count-choice-rejoin" } },
    "jealousy-thought": { type: "dialogue", id: "jealousy-thought", text: "伯爵の怒りには、夫人を気にかける気持ちも混じっているように見える。", presentation, next: { nodeId: "count-choice-rejoin" } },
    "knowledge-thought": { type: "dialogue", id: "knowledge-thought", text: "椅子の上で息を潜めるケルビーノは、伯爵とバジリオの言葉をすべて聞いている。", presentation, next: { nodeId: "count-choice-rejoin" } },
    "count-choice-rejoin": { type: "dialogue", id: "count-choice-rejoin", text: "伯爵は自分がスザンナを誘惑していた直後であることを忘れたように、ケルビーノの視線だけを責め立てる。", presentation, next: { nodeId: "cosa-sento-title" } },
    "cosa-sento-title": { type: "dialogue", id: "cosa-sento-title", text: "♪ Cosa sento!", presentation, next: { nodeId: "cosa-sento-explanation" } },
    "cosa-sento-explanation": { type: "dialogue", id: "cosa-sento-explanation", text: "歌う人物：伯爵 / バジリオ / スザンナ。伯爵は嫉妬と怒り、バジリオはしまったという動揺、スザンナは状況の悪化への恐れを抱えている。", presentation, next: { nodeId: "cosa-sento-point" } },
    "cosa-sento-point": { type: "dialogue", id: "cosa-sento-point", text: "【観劇ポイント】この三重唱が始まったら、伯爵：嫉妬と怒り、バジリオ：しまった、スザンナ：最悪、という三者三様の状態。", presentation, next: { nodeId: "susanna-faints" } },
    "susanna-faints": { type: "dialogue", id: "susanna-faints", text: "スザンナは衝撃で気を失いかけた。伯爵とバジリオが、あわてて彼女を支えようとする。", presentation, next: { nodeId: "chair-danger" } },
    "chair-danger": { type: "dialogue", id: "chair-danger", speakerId: "basilio", text: "「ここへ座らせましょう。椅子へ――」バジリオが椅子へ近づき、隠れたケルビーノが見つかりそうになる。", presentation: { ...presentation, characters: [{ characterId: "susanna", expressionId: "surprised", position: "left" }, { characterId: "basilio", expressionId: "worried", position: "right" }] }, next: { nodeId: "count-yesterday" } },
    "count-yesterday": { type: "dialogue", id: "count-yesterday", speakerId: "count", text: "「昨日も、あの小姓を見つけた。バルバリーナの部屋の扉が閉まっていてな。中を調べたら、あいつが隠れていた」", presentation, next: { nodeId: "barbarina-branch" } },
    "barbarina-branch": { type: "branch", id: "barbarina-branch", branches: [{ when: { type: "flag", key: "knowsBarbarinaIncident", operator: "===", value: true }, next: { nodeId: "barbarina-thought" } }], default: { nodeId: "count-reenacts" } },
    "barbarina-thought": { type: "dialogue", id: "barbarina-thought", text: "ケルビーノが話していた、あの時のことか。", presentation, next: { nodeId: "count-reenacts" } },
    "count-reenacts": { type: "dialogue", id: "count-reenacts", speakerId: "count", text: "「こうやって隠れ場所をめくったら――」伯爵は昨日の出来事を再現するように、椅子にかけられた衣服へ手を伸ばす。", presentation, next: { nodeId: "cherubino-revealed" } },
    "cherubino-revealed": { type: "dialogue", id: "cherubino-revealed", text: "衣服が持ち上がる。そこにはケルビーノがいた。", presentation, effects: [{ type: "setFlag", key: "cherubinoDiscovered", value: true }], next: { nodeId: "discovery-reactions" } },
    "discovery-reactions": { type: "dialogue", id: "discovery-reactions", speakerId: "count", text: "「……！ ケルビーノ！？」", presentation: { ...presentation, characters: [{ characterId: "cherubino", expressionId: "surprised", position: "left" }, { characterId: "count", expressionId: "surprised", position: "right" }] }, next: { nodeId: "count-asks-time" } },
    "count-asks-time": { type: "dialogue", id: "count-asks-time", speakerId: "count", text: "「待て。お前……いつからここにいた？」", presentation, next: { nodeId: "susanna-admits" } },
    "susanna-admits": { type: "dialogue", id: "susanna-admits", speakerId: "susanna", text: "「伯爵様がいらっしゃる前からです。」", presentation, next: { nodeId: "count-realizes" } },
    "count-realizes": { type: "dialogue", id: "count-realizes", speakerId: "count", text: "「……ということは。」", presentation, next: { nodeId: "cherubino-apology" } },
    "cherubino-apology": { type: "dialogue", id: "cherubino-apology", speakerId: "cherubino", text: "「聞かないようにはしていたのですが……。」", presentation: { ...presentation, characters: [{ characterId: "susanna", expressionId: "surprised", position: "left" }, { characterId: "cherubino", expressionId: "surprised", position: "right" }] }, next: { nodeId: "count-overheard" } },
    "count-overheard": { type: "dialogue", id: "count-overheard", speakerId: "count", text: "「全部聞いたのか！？」", presentation, effects: [{ type: "setFlag", key: "countRealizesCherubinoOverheard", value: true }, { type: "setFlag", key: "cherubinoKnowsCountsPlan", value: true }], next: { nodeId: "reversal-summary" } },
    "reversal-summary": { type: "dialogue", id: "reversal-summary", text: "ここで立場が逆転した。伯爵はケルビーノの秘密を知った。しかしケルビーノも、伯爵がスザンナを誘惑している秘密を知ってしまった。伯爵にとって彼は、単なる恋に浮かれた少年ではなく、自分の秘密を知る厄介な存在になった。", presentation, next: { nodeId: "voices-outside" } },
    "voices-outside": { type: "dialogue", id: "voices-outside", speakerId: "basilio", text: "「伯爵様。誰か来ます。」", presentation: { ...presentation, characters: [{ characterId: "susanna", expressionId: "neutral", position: "left" }, { characterId: "basilio", expressionId: "worried", position: "right" }] }, next: { nodeId: "figaro-voice" } },
    "figaro-voice": { type: "dialogue", id: "figaro-voice", text: "廊下の外から、花を持った使用人や村人たちの声が近づく。フィガロの声が響いた。『伯爵様！』", presentation, next: { nodeId: "player-wonders" } },
    "player-wonders": { type: "dialogue", id: "player-wonders", text: "今度は何だ……？", presentation, next: { nodeId: "a1-17-pending" } },
    "a1-17-pending": { type: "dialogue", id: "a1-17-pending", text: "扉が開き、花を抱えた人々が部屋へ入ってくる。", presentation, next: { sceneId: "figaro-villagers", nodeId: "figaro-calls" } },
  },
} satisfies Scene
