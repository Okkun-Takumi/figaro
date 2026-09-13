import type { Scene } from "../../../engine/types"
const wedding = { backgroundId: "great-hall", characters: [{ characterId: "figaro", expressionId: "smile", position: "left" as const }, { characterId: "susanna", expressionId: "smile", position: "center" as const }, { characterId: "count", expressionId: "neutral", position: "right" as const }] }
export const weddingAndLetter = { id: "wedding-and-letter", backgroundId: "great-hall", initialNodeId: "wedding-begins", nodes: {
  "wedding-begins": { type: "dialogue", id: "wedding-begins", text: "大広間には祝福の声が満ち、フィガロとスザンナの結婚式が始まった。", presentation: wedding, next: { nodeId: "ecco-la-marcia" } },
  "ecco-la-marcia": { type: "dialogue", id: "ecco-la-marcia", text: "♪ Ecco la marcia", presentation: { ...wedding, musicId: "eccoLaMarcia" }, next: { nodeId: "cherubino-found" } },
  "cherubino-found": { type: "dialogue", id: "cherubino-found", text: "祝いの人々に紛れていたケルビーノをアントニオが見つけ、伯爵は再び顔を曇らせた。", presentation: { backgroundId: "great-hall", characters: [{ characterId: "antonio", expressionId: "suspicious", position: "left" }, { characterId: "cherubino", expressionId: "worried", position: "center" }, { characterId: "count", expressionId: "angry", position: "right" }] }, next: { nodeId: "barbarina-pleads" } },
  "barbarina-pleads": { type: "dialogue", id: "barbarina-pleads", speakerId: "barbarina", text: "伯爵様、以前くださると約束したものをください。私はケルビーノを望みます。", presentation: { backgroundId: "great-hall", characters: [{ characterId: "barbarina", expressionId: "pleading", position: "left" }, { characterId: "cherubino", expressionId: "worried", position: "center" }, { characterId: "count", expressionId: "surprised", position: "right" }] }, next: { nodeId: "letter-handed" } },
  "letter-handed": { type: "dialogue", id: "letter-handed", text: "伯爵は強く断れないまま、式の賑わいの中でスザンナから小さな手紙を受け取った。", presentation: wedding, next: { nodeId: "count-pricks-finger" } },
  "count-pricks-finger": { type: "dialogue", id: "count-pricks-finger", speakerId: "count", text: "痛っ……！　このピンで留めてあるのか。", presentation: wedding, effects: [{ type: "setFlag", key: "countReceivedGardenLetter", value: true }, { type: "setFlag", key: "countMustReturnPin", value: true }], next: { nodeId: "wedding-choice" } },
  "wedding-choice": { type: "choice", id: "wedding-choice", prompt: "第三幕の最後、次に一番気になるのは？", presentation: wedding, choices: [
    { id: "meeting", text: "伯爵は庭へ本当に来るのか", effects: [{ type: "setFlag", key: "anticipatesGardenMeeting", value: true }], next: { nodeId: "meeting-reaction" } },
    { id: "swap", text: "伯爵夫人とスザンナの変装計画", effects: [{ type: "setFlag", key: "anticipatesDisguiseSwap", value: true }], next: { nodeId: "swap-reaction" } },
    { id: "signal", text: "あのピンがどう使われるのか", effects: [{ type: "setFlag", key: "tracksPinSignal", value: true }], next: { nodeId: "signal-reaction" } },
  ] },
  "meeting-reaction": { type: "dialogue", id: "meeting-reaction", text: "伯爵は手紙を読み、夜の庭へ向かう気でいる。", presentation: wedding, next: { nodeId: "summary" } },
  "swap-reaction": { type: "dialogue", id: "swap-reaction", text: "夜になれば、二人の衣装と役割が入れ替わる。", presentation: wedding, next: { nodeId: "summary" } },
  "signal-reaction": { type: "dialogue", id: "signal-reaction", text: "さっき手紙を留めていた、あのピンが伯爵の手元に残った。", presentation: wedding, next: { nodeId: "summary" } },
  summary: { type: "dialogue", id: "summary", text: "ACT 3 COMPLETE\n\nフィガロの出生が判明し、マルチェリーナとの結婚問題は解消した。フィガロとスザンナは結婚し、伯爵夫人とスザンナは伯爵を夜の庭へ誘い出す罠を仕掛けた。伯爵はピンで留められた手紙を受け取った。次は夜の庭で計画が実行される。", presentation: wedding, next: { nodeId: "act3-complete" } },
  "act3-complete": { type: "dialogue", id: "act3-complete", text: "第三幕の物語はここまで。夜の庭で、計画と誤解が交差し始める。", presentation: wedding, next: { scenarioId: "act4", sceneId: "barbarina-lost-pin", nodeId: "barbarina-searches" } },
} } satisfies Scene
