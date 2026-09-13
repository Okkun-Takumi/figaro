import type { Scene } from "../../../engine/types"

const pair = { backgroundId: "great-hall", characters: [{ characterId: "susanna", expressionId: "serious", position: "left" as const }, { characterId: "count", expressionId: "charming", position: "right" as const }] }
const figaro = { backgroundId: "great-hall", characters: [{ characterId: "susanna", expressionId: "smile", position: "left" as const }, { characterId: "figaro", expressionId: "serious", position: "right" as const }] }

export const susannaCountRuse = { id: "susanna-count-ruse", backgroundId: "great-hall", initialNodeId: "susanna-approaches", nodes: {
  "susanna-approaches": { type: "dialogue", id: "susanna-approaches", text: "大広間で、スザンナはためらうような足取りで伯爵へ近づいた。", presentation: pair, next: { nodeId: "susanna-hints-garden" } },
  "susanna-hints-garden": { type: "dialogue", id: "susanna-hints-garden", speakerId: "susanna", text: "今夜、庭なら……少しお話しできるかもしれません。", presentation: pair, next: { nodeId: "crudel-perche-finora" } },
  "crudel-perche-finora": { type: "dialogue", id: "crudel-perche-finora", text: "♪ Crudel! perché finora", presentation: { ...pair, musicId: "crudelPercheFinora" }, next: { nodeId: "count-delighted" } },
  "count-delighted": { type: "dialogue", id: "count-delighted", speakerId: "count", text: "ようやく心を開いてくれたのだな。庭で待っている。", presentation: pair, next: { nodeId: "garden-plan-branch" } },
  "garden-plan-branch": { type: "branch", id: "garden-plan-branch", branches: [{ when: { type: "flag", key: "knowsGardenRendezvousPlan", operator: "===", value: true }, next: { nodeId: "garden-plan-thought" } }], default: { nodeId: "hypocrisy-branch" } },
  "garden-plan-thought": { type: "dialogue", id: "garden-plan-thought", text: "庭での約束は、あらかじめ用意されていた罠を動かす合図だった。", presentation: pair, next: { nodeId: "hypocrisy-branch" } },
  "hypocrisy-branch": { type: "branch", id: "hypocrisy-branch", branches: [{ when: { type: "any", conditions: [{ type: "flag", key: "noticedCountHypocrisy", operator: "===", value: true }, { type: "flag", key: "noticedCountDoubleStandardAct2", operator: "===", value: true }] }, next: { nodeId: "hypocrisy-thought" } }], default: { nodeId: "ruse-choice" } },
  "hypocrisy-thought": { type: "dialogue", id: "hypocrisy-thought", text: "スザンナへ迫り続けてきた伯爵は、自分だけは選ばれると信じ込んでいる。", presentation: pair, next: { nodeId: "ruse-choice" } },
  "ruse-choice": { type: "choice", id: "ruse-choice", prompt: "このやり取りで重要だと思うのは？", presentation: pair, choices: [
    { id: "susanna-ruse", text: "スザンナは本気で伯爵に応じていない", effects: [{ type: "setFlag", key: "understandsSusannaRuse", value: true }], next: { nodeId: "ruse-reaction" } },
    { id: "count-overconfidence", text: "伯爵は自分が勝ったと思っている", effects: [{ type: "setFlag", key: "noticedCountOverconfidence", value: true }], next: { nodeId: "confidence-reaction" } },
    { id: "garden-trap", text: "伯爵夫人たちの作戦が動き始めた", effects: [{ type: "setFlag", key: "tracksGardenTrap", value: true }], next: { nodeId: "trap-reaction" } },
  ] },
  "ruse-reaction": { type: "dialogue", id: "ruse-reaction", text: "スザンナの柔らかな言葉の奥には、別の狙いがある。", presentation: pair, next: { nodeId: "ruse-rejoin" } },
  "confidence-reaction": { type: "dialogue", id: "confidence-reaction", text: "伯爵は疑うことなく、約束を自分の勝利だと思い込んだ。", presentation: pair, next: { nodeId: "ruse-rejoin" } },
  "trap-reaction": { type: "dialogue", id: "trap-reaction", text: "夜の庭で、伯爵を待つ側の準備が静かに進み始める。", presentation: pair, next: { nodeId: "ruse-rejoin" } },
  "ruse-rejoin": { type: "dialogue", id: "ruse-rejoin", text: "伯爵が去ると、スザンナはすぐフィガロのもとへ向かった。", presentation: figaro, next: { nodeId: "susanna-tells-figaro" } },
  "susanna-tells-figaro": { type: "dialogue", id: "susanna-tells-figaro", speakerId: "susanna", text: "もう大丈夫。伯爵様は、すっかり罠にかかったわ。", presentation: figaro, next: { nodeId: "figaro-replies" } },
  "figaro-replies": { type: "dialogue", id: "figaro-replies", speakerId: "figaro", text: "よし。あとは庭で、こちらの手を見せてやろう。", presentation: figaro, next: { nodeId: "count-overhears" } },
  "count-overhears": { type: "dialogue", id: "count-overhears", text: "物陰でその会話を聞いた伯爵は、笑顔を消した。自分が騙されていたと悟ったのだ。", presentation: { ...pair, characters: [{ characterId: "count", expressionId: "angry", position: "center" }] }, next: { sceneId: "count-revenge", nodeId: "count-realizes-ruse" } },
} } satisfies Scene
