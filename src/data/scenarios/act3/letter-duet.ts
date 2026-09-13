import type { Scene } from "../../../engine/types"
const p = { backgroundId: "countess-bedroom", characters: [{ characterId: "countess", expressionId: "neutral", position: "left" as const }, { characterId: "susanna", expressionId: "serious", position: "right" as const }] }
export const letterDuet = { id: "letter-duet", backgroundId: "countess-bedroom", initialNodeId: "countess-dictates", nodes: {
  "countess-dictates": { type: "dialogue", id: "countess-dictates", speakerId: "countess", text: "書いて。今夜、庭でお待ちしています、と。", presentation: p, next: { nodeId: "sull-aria" } },
  "sull-aria": { type: "dialogue", id: "sull-aria", text: "♪ Sull'aria... Che soave zeffiretto", presentation: { ...p, musicId: "sullAria" }, next: { nodeId: "disguise-plan" } },
  "disguise-plan": { type: "dialogue", id: "disguise-plan", speakerId: "susanna", text: "庭では私たちが衣装を替えます。伯爵様には、どちらが誰か分からないように。", presentation: p, next: { nodeId: "pin-letter" } },
  "pin-letter": { type: "dialogue", id: "pin-letter", text: "スザンナは手紙を折り、小さなピンで留めた。", presentation: p, effects: [{ type: "setFlag", key: "knowsPinLetterSignal", value: true }], next: { nodeId: "letter-choice" } },
  "letter-choice": { type: "choice", id: "letter-choice", prompt: "この手紙の作戦で重要だと思うのは？", presentation: p, choices: [
    { id: "trap", text: "伯爵を庭へ確実に呼び出すこと", effects: [{ type: "setFlag", key: "understandsLetterTrap", value: true }], next: { nodeId: "trap-reaction" } },
    { id: "trust", text: "伯爵夫人とスザンナが協力していること", effects: [{ type: "setFlag", key: "focusesCountessSusannaTrust", value: true }], next: { nodeId: "trust-reaction" } },
    { id: "pin", text: "ピンで封じたこと", effects: [{ type: "setFlag", key: "noticedLetterPin", value: true }], next: { nodeId: "pin-reaction" } },
  ] },
  "trap-reaction": { type: "dialogue", id: "trap-reaction", text: "伯爵が約束を信じて庭へ来ることが、計画の鍵になる。", presentation: p, next: { nodeId: "rejoin" } },
  "trust-reaction": { type: "dialogue", id: "trust-reaction", text: "二人は互いを信じ、危うい計画を最後まで進めようとしている。", presentation: p, next: { nodeId: "rejoin" } },
  "pin-reaction": { type: "dialogue", id: "pin-reaction", text: "小さなピンまで、手紙のやり取りに組み込まれている。", presentation: p, next: { nodeId: "rejoin" } },
  rejoin: { type: "dialogue", id: "rejoin", text: "手紙は、結婚式の賑わいに紛れて伯爵へ渡されることになった。", presentation: p, next: { sceneId: "wedding-and-letter", nodeId: "wedding-begins" } },
} } satisfies Scene
