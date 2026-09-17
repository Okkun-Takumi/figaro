import type { Scene } from "../../../engine/types"

const countessSusannaPresentation = {
  backgroundId: "countess-bedroom",
  characters: [
    { characterId: "countess", expressionId: "sad", position: "left" as const },
    { characterId: "susanna", expressionId: "serious", position: "right" as const },
  ],
}

const planPresentation = {
  backgroundId: "countess-bedroom",
  characters: [
    { characterId: "countess", expressionId: "neutral", position: "left" as const },
    { characterId: "susanna", expressionId: "serious", position: "center" as const },
    { characterId: "figaro", expressionId: "serious", position: "right" as const },
  ],
}

export const countessPlan = {
  id: "countess-plan",
  backgroundId: "countess-bedroom",
  initialNodeId: "susanna-reports-count",
  nodes: {
    "susanna-reports-count": { type: "dialogue", id: "susanna-reports-count", speakerId: "susanna", text: "「伯爵様は、今度は庭で会おうとおっしゃいました。」", presentation: countessSusannaPresentation, next: { nodeId: "countess-hurt" } },
    "countess-hurt": { type: "dialogue", id: "countess-hurt", speakerId: "countess", text: "「私の侍女にまで……。」伯爵夫人は傷つきながらも、目をそらさなかった。", presentation: countessSusannaPresentation, next: { nodeId: "figaro-enters" } },
    "figaro-enters": { type: "dialogue", id: "figaro-enters", speakerId: "figaro", text: "「失礼します。奥様、スザンナ。」", presentation: planPresentation, next: { nodeId: "figaro-explains-problem" } },
    "figaro-explains-problem": { type: "dialogue", id: "figaro-explains-problem", speakerId: "figaro", text: "「伯爵様は自分だけ得をするつもりです。なら、その自信を利用しましょう。」", presentation: planPresentation, next: { nodeId: "anonymous-letter-plan" } },
    "anonymous-letter-plan": { type: "dialogue", id: "anonymous-letter-plan", speakerId: "figaro", text: "「まず奥様の名を伏せた手紙で、伯爵を庭へ呼び出します。自分が追われる側だと思わせるんです。」", presentation: planPresentation, effects: [{ type: "setFlag", key: "knowsAnonymousJealousyPlan", value: true }], next: { nodeId: "garden-rendezvous-plan" } },
    "garden-rendezvous-plan": { type: "dialogue", id: "garden-rendezvous-plan", speakerId: "susanna", text: "「私は伯爵様に、庭で会うと伝える。そうすれば伯爵は、きっと約束どおりに来るわ。」", presentation: planPresentation, effects: [{ type: "setFlag", key: "knowsGardenRendezvousPlan", value: true }], next: { nodeId: "cherubino-disguise-plan" } },
    "cherubino-disguise-plan": { type: "dialogue", id: "cherubino-disguise-plan", speakerId: "figaro", text: "「庭へ姿を見せる役は、恋に夢中のケルビーノに頼む。女装してもらえば、伯爵の目をくらませられる。」", presentation: planPresentation, effects: [{ type: "setFlag", key: "knowsCherubinoDisguisePlan", value: true }], next: { nodeId: "plan-summary" } },
    "plan-summary": { type: "dialogue", id: "plan-summary", text: "伯爵を匿名の手紙で不安にさせ、スザンナとの約束へ誘導し、最後にケルビーノの変装で出し抜く。三人は危うい計画を共有した。", presentation: planPresentation, next: { nodeId: "plan-choice" } },
    "plan-choice": {
      type: "choice",
      id: "plan-choice",
      prompt: "一番危なそうなのは？",
      presentation: planPresentation,
      choices: [
        { id: "anonymous-letter-risk", text: "匿名の手紙で伯爵を不安にさせること", effects: [{ type: "setFlag", key: "focusesAnonymousLetterRisk", value: true }], next: { nodeId: "anonymous-letter-risk-reaction" } },
        { id: "disguise-risk", text: "ケルビーノを女装させること", effects: [{ type: "setFlag", key: "focusesDisguiseRisk", value: true }], next: { nodeId: "disguise-risk-reaction" } },
        { id: "jealousy-trap", text: "伯爵自身の嫉妬を利用すること", effects: [{ type: "setFlag", key: "understandsJealousyTrap", value: true }], next: { nodeId: "jealousy-trap-reaction" } },
      ],
    },
    "anonymous-letter-risk-reaction": { type: "dialogue", id: "anonymous-letter-risk-reaction", text: "伯爵は疑い深い。手紙が計画どおりの不安を生むか、警戒を強めるかは紙一重だ。", presentation: planPresentation, next: { nodeId: "plan-rejoin" } },
    "disguise-risk-reaction": { type: "dialogue", id: "disguise-risk-reaction", text: "ケルビーノは目立ちたがりで、しかも恋に夢中だ。変装がいちばん予測できない。", presentation: planPresentation, next: { nodeId: "plan-rejoin" } },
    "jealousy-trap-reaction": { type: "dialogue", id: "jealousy-trap-reaction", text: "伯爵が他人の恋には厳しく、自分の欲望には甘いなら、その感情そのものが罠になる。", presentation: planPresentation, next: { nodeId: "plan-rejoin" } },
    "plan-rejoin": { type: "dialogue", id: "plan-rejoin", text: "誰もが危険を分かっていた。それでも、何もしないよりはましだった。", presentation: planPresentation, next: { nodeId: "figaro-strategy-branch" } },
    "figaro-strategy-branch": { type: "branch", id: "figaro-strategy-branch", branches: [{ when: { type: "flag", key: "understandsFigaroStrategy", operator: "===", value: true }, next: { nodeId: "figaro-strategy-thought" } }], default: { nodeId: "count-jealousy-branch" } },
    "figaro-strategy-thought": { type: "dialogue", id: "figaro-strategy-thought", text: "皆の前で伯爵を追い込んだフィガロは、今度は伯爵自身の感情を利用しようとしている。", presentation: planPresentation, next: { nodeId: "count-jealousy-branch" } },
    "count-jealousy-branch": { type: "branch", id: "count-jealousy-branch", branches: [{ when: { type: "flag", key: "noticedCountJealousy", operator: "===", value: true }, next: { nodeId: "count-jealousy-thought" } }], default: { nodeId: "figaro-leaves" } },
    "count-jealousy-thought": { type: "dialogue", id: "count-jealousy-thought", text: "伯爵が夫人のことにも嫉妬を見せていたなら、その性質を逆手に取る計画には現実味がある。", presentation: planPresentation, next: { nodeId: "figaro-leaves" } },
    "figaro-leaves": { type: "dialogue", id: "figaro-leaves", speakerId: "figaro", text: "「では、準備を。ケルビーノにも話をしてきます。」", presentation: planPresentation, next: { nodeId: "cherubino-arrival" } },
    "cherubino-arrival": { type: "dialogue", id: "cherubino-arrival", text: "ほどなくして、落ち着かない様子のケルビーノが伯爵夫人の部屋へ入ってきた。", presentation: { ...countessSusannaPresentation, characters: [{ characterId: "countess", expressionId: "neutral", position: "left" }, { characterId: "susanna", expressionId: "serious", position: "center" }, { characterId: "cherubino", expressionId: "flustered", position: "right" }] }, next: { sceneId: "cherubino-song", nodeId: "cherubino-enters" } },
  },
} satisfies Scene
