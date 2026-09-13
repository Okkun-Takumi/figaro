import type { Scene } from "../../../engine/types"

const lamentPresentation = {
  backgroundId: "countess-bedroom",
  characters: [{ characterId: "countess", expressionId: "sad", position: "center" as const }],
}

const countessSusannaPresentation = {
  backgroundId: "countess-bedroom",
  characters: [
    { characterId: "countess", expressionId: "sad", position: "left" as const },
    { characterId: "susanna", expressionId: "worried", position: "right" as const },
  ],
}

export const countessLament = {
  id: "countess-lament",
  backgroundId: "countess-bedroom",
  initialNodeId: "act2-entry",
  nodes: {
    "act2-entry": { type: "dialogue", id: "act2-entry", text: "伯爵夫人の部屋。結婚式の朝、館の中ではまだ準備の気配が続いている。", presentation: lamentPresentation, next: { nodeId: "countess-alone" } },
    "countess-alone": { type: "dialogue", id: "countess-alone", speakerId: "countess", text: "「どうして、こんなことになってしまったの……。」", presentation: lamentPresentation, next: { nodeId: "porgi-amor" } },
    "porgi-amor": { type: "dialogue", id: "porgi-amor", text: "♪ Porgi, amor, qualche ristoro", presentation: { ...lamentPresentation, musicId: "porgiAmor" }, next: { nodeId: "countess-after-song" } },
    "countess-after-song": { type: "dialogue", id: "countess-after-song", text: "伯爵夫人は、夫の心が自分から離れていくことを感じている。それでも怒りだけではなく、失いたくない思いが残っていた。", presentation: lamentPresentation, next: { nodeId: "countess-choice" } },
    "countess-choice": {
      type: "choice",
      id: "countess-choice",
      prompt: "伯爵夫人を見て、どう感じた？",
      presentation: lamentPresentation,
      choices: [
        { id: "still-loves-count", text: "まだ伯爵を愛しているんだ", effects: [{ type: "setFlag", key: "understandsCountessStillLovesCount", value: true }], next: { nodeId: "still-loves-count-reaction" } },
        { id: "understand-pain", text: "傷ついているというより、消耗している", effects: [{ type: "setFlag", key: "understandsCountessPain", value: true }, { type: "changeAffinity", characterId: "countess", amount: 1 }], next: { nodeId: "understand-pain-reaction" } },
        { id: "connect-act1", text: "これまで見た伯爵との落差が大きい", effects: [{ type: "setFlag", key: "connectsCountBehaviorToCountessPain", value: true }], next: { nodeId: "connect-act1-reaction" } },
      ],
    },
    "still-loves-count-reaction": { type: "dialogue", id: "still-loves-count-reaction", text: "夫を責める言葉より先に、愛が戻ることを願う。その願いが、伯爵夫人の孤独をいっそう深くしている。", presentation: lamentPresentation, next: { nodeId: "lament-rejoin" } },
    "understand-pain-reaction": { type: "dialogue", id: "understand-pain-reaction", text: "声を荒らげることもできないほど、伯爵夫人は長く一人で苦しんできたように見える。", presentation: lamentPresentation, next: { nodeId: "lament-rejoin" } },
    "connect-act1-reaction": { type: "dialogue", id: "connect-act1-reaction", text: "スザンナを口説こうとしていた伯爵の姿を思い出すと、この部屋の静けさはまったく違って見える。", presentation: lamentPresentation, next: { nodeId: "lament-rejoin" } },
    "lament-rejoin": { type: "dialogue", id: "lament-rejoin", text: "伯爵夫人は窓の外を見つめ、しばらく黙っていた。", presentation: lamentPresentation, next: { nodeId: "count-hypocrisy-branch" } },
    "count-hypocrisy-branch": { type: "branch", id: "count-hypocrisy-branch", branches: [{ when: { type: "flag", key: "noticedCountHypocrisy", operator: "===", value: true }, next: { nodeId: "count-hypocrisy-thought" } }], default: { nodeId: "rosina-branch" } },
    "count-hypocrisy-thought": { type: "dialogue", id: "count-hypocrisy-thought", text: "スザンナを口説きながら、妻には厳しく振る舞う伯爵。その振る舞いは、ここで見る伯爵夫人の痛みとつながっている。", presentation: lamentPresentation, next: { nodeId: "rosina-branch" } },
    "rosina-branch": { type: "branch", id: "rosina-branch", branches: [{ when: { type: "flag", key: "knowsCountessWasRosina", operator: "===", value: true }, next: { nodeId: "rosina-thought" } }], default: { nodeId: "susanna-enters" } },
    "rosina-thought": { type: "dialogue", id: "rosina-thought", text: "かつてロジーナと呼ばれた彼女が、いまは伯爵夫人としてこの孤独を抱えている。", presentation: lamentPresentation, next: { nodeId: "susanna-enters" } },
    "susanna-enters": { type: "dialogue", id: "susanna-enters", speakerId: "susanna", text: "「奥様。失礼します。」", presentation: countessSusannaPresentation, next: { nodeId: "countess-asks-susanna" } },
    "countess-asks-susanna": { type: "dialogue", id: "countess-asks-susanna", speakerId: "countess", text: "「スザンナ。あなたの結婚式の朝なのに、心配ばかりかけてしまうわね。」", presentation: countessSusannaPresentation, next: { sceneId: "countess-plan", nodeId: "susanna-reports-count" } },
  },
} satisfies Scene
