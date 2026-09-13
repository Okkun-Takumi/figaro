import type { Scene } from "../../../engine/types"
const p = { backgroundId: "great-hall", characters: [{ characterId: "susanna", expressionId: "worried", position: "left" as const }, { characterId: "figaro", expressionId: "serious", position: "center" as const }, { characterId: "marcellina", expressionId: "neutral", position: "right" as const }] }
export const susannaFamilyReveal = { id: "susanna-family-reveal", backgroundId: "great-hall", initialNodeId: "susanna-misunderstands", nodes: {
  "susanna-misunderstands": { type: "dialogue", id: "susanna-misunderstands", speakerId: "susanna", text: "フィガロ……あなた、本当にマルチェリーナと？", presentation: p, next: { nodeId: "figaro-explains-family" } },
  "figaro-explains-family": { type: "dialogue", id: "figaro-explains-family", speakerId: "figaro", text: "違う。彼女は僕の母で、バルトロが父だった。やっと家族が見つかったんだ。", presentation: p, next: { nodeId: "marcellina-welcomes-susanna" } },
  "marcellina-welcomes-susanna": { type: "dialogue", id: "marcellina-welcomes-susanna", speakerId: "marcellina", text: "あなたはスザンナね。息子を支えてくれて、ありがとう。", presentation: { ...p, characters: [{ characterId: "susanna", expressionId: "smile", position: "left" }, { characterId: "figaro", expressionId: "smile", position: "center" }, { characterId: "marcellina", expressionId: "neutral", position: "right" }] }, next: { nodeId: "family-choice" } },
  "family-choice": { type: "choice", id: "family-choice", prompt: "事情を知ったスザンナを見て、どう感じた？", presentation: p, choices: [
    { id: "misunderstanding", text: "誤解が解けてよかった", effects: [{ type: "setFlag", key: "understandsSusannaMisunderstandingResolved", value: true }], next: { nodeId: "misunderstanding-reaction" } },
    { id: "reunion", text: "フィガロに家族が見つかったのが大きい", effects: [{ type: "setFlag", key: "focusesFigaroFamilyReunion", value: true }], next: { nodeId: "reunion-reaction" } },
    { id: "reversal", text: "マルチェリーナの立場が一気に変わった", effects: [{ type: "setFlag", key: "understandsMarcellinaRoleReversal", value: true }], next: { nodeId: "reversal-reaction" } },
  ] },
  "misunderstanding-reaction": { type: "dialogue", id: "misunderstanding-reaction", text: "一瞬の不安は、思いがけない家族の再会への驚きに変わった。", presentation: p, next: { nodeId: "rejoin" } },
  "reunion-reaction": { type: "dialogue", id: "reunion-reaction", text: "フィガロは、長く知らなかった自分の居場所を取り戻した。", presentation: p, next: { nodeId: "rejoin" } },
  "reversal-reaction": { type: "dialogue", id: "reversal-reaction", text: "結婚を迫る相手だったマルチェリーナは、今では息子を迎える母親だ。", presentation: p, next: { nodeId: "rejoin" } },
  rejoin: { type: "dialogue", id: "rejoin", text: "借金の契約は、家族の再会によってまったく別の意味を持つものになった。", presentation: p, next: { sceneId: "dove-sono", nodeId: "countess-alone" } },
} } satisfies Scene
