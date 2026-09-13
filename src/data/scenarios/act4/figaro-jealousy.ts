import type { Scene } from "../../../engine/types"

const garden = {
  backgroundId: "garden-night",
  characters: [
    { characterId: "figaro", expressionId: "annoyed", position: "left" as const },
    { characterId: "marcellina", expressionId: "neutral", position: "right" as const },
  ],
}

export const figaroJealousy = {
  id: "figaro-jealousy",
  backgroundId: "garden-night",
  initialNodeId: "figaro-fury",
  nodes: {
    "figaro-fury": { type: "dialogue", id: "figaro-fury", speakerId: "figaro", text: "伯爵が庭へ来る。スザンナは、その返事を受け取る。……そういうことか。", presentation: garden, next: { nodeId: "marcellina-cautions" } },
    "marcellina-cautions": { type: "dialogue", id: "marcellina-cautions", speakerId: "marcellina", text: "急いで決めつけないで。スザンナには、あなたの知らない事情があるのかもしれない。", presentation: garden, next: { nodeId: "strategy-callback" } },
    "strategy-callback": { type: "branch", id: "strategy-callback", branches: [{ when: { type: "any", conditions: [{ type: "flag", key: "understandsFigaroStrategy", operator: "===", value: true }, { type: "flag", key: "figaroPubliclyPressuredCount", operator: "===", value: true }] }, next: { nodeId: "role-reversal" } }], default: { nodeId: "susanna-ruse-callback" } },
    "role-reversal": { type: "dialogue", id: "role-reversal", text: "これまで伯爵を出し抜く側だったフィガロが、今は自分の嫉妬によって状況を読み違えている。", presentation: garden, next: { nodeId: "susanna-ruse-callback" } },
    "susanna-ruse-callback": { type: "branch", id: "susanna-ruse-callback", branches: [{ when: { type: "flag", key: "understandsSusannaRuse", operator: "===", value: true }, next: { nodeId: "recognition-gap" } }], default: { nodeId: "aprite-un-po" } },
    "recognition-gap": { type: "dialogue", id: "recognition-gap", text: "スザンナが伯爵を罠へ導いていることを知る者には、フィガロとの認識のずれがいっそう痛ましく映る。", presentation: garden, next: { nodeId: "aprite-un-po" } },
    "aprite-un-po": { type: "dialogue", id: "aprite-un-po", speakerId: "figaro", text: "♪ Aprite un po' quegli occhi", presentation: { ...garden, musicId: "apriteUnPoQuegliOcchi" }, next: { nodeId: "jealousy-choice" } },
    "jealousy-choice": { type: "choice", id: "jealousy-choice", prompt: "今のフィガロをどう見る？", presentation: garden, choices: [
      { id: "clouded", text: "嫉妬で冷静さを失っている", effects: [{ type: "setFlag", key: "noticedFigaroJealousyCloudsJudgment", value: true }], next: { nodeId: "clouded-reaction" } },
      { id: "reversal", text: "いつもの策略家らしくない", effects: [{ type: "setFlag", key: "noticedFigaroRoleReversal", value: true }], next: { nodeId: "reversal-reaction" } },
      { id: "love", text: "それだけスザンナを大切に思っている", effects: [{ type: "setFlag", key: "understandsFigaroLoveForSusanna", value: true }, { type: "changeAffinity", characterId: "figaro", amount: 1 }], next: { nodeId: "love-reaction" } },
    ] },
    "clouded-reaction": { type: "dialogue", id: "clouded-reaction", text: "怒りは、確かな証拠より先にフィガロの心を満たしている。", presentation: garden, next: { nodeId: "jealousy-rejoin" } },
    "reversal-reaction": { type: "dialogue", id: "reversal-reaction", text: "人の思惑を読むフィガロが、自分の心だけは読み切れずにいる。", presentation: garden, next: { nodeId: "jealousy-rejoin" } },
    "love-reaction": { type: "dialogue", id: "love-reaction", text: "疑いの深さは、スザンナを失いたくない思いの裏返しでもある。", presentation: garden, next: { nodeId: "jealousy-rejoin" } },
    "jealousy-rejoin": { type: "dialogue", id: "jealousy-rejoin", text: "フィガロは木陰へ身を隠し、庭へ来るはずの二人を待つことにした。", presentation: garden, effects: [{ type: "setFlag", key: "figaroWaitingInGarden", value: true }], next: { sceneId: "garden-disguises", nodeId: "garden-entry" } },
  },
} satisfies Scene
