import type { Scene } from "../../../engine/types"

const accusation = { backgroundId: "garden-night", characters: [{ characterId: "count", expressionId: "angry", position: "left" as const }, { characterId: "figaro", expressionId: "serious", position: "center" as const }, { characterId: "countess", expressionId: "disguise", position: "right" as const }] }
const reveal = { backgroundId: "garden-night", characters: [{ characterId: "count", expressionId: "surprised", position: "left" as const }, { characterId: "countess", expressionId: "disguise", position: "center" as const }, { characterId: "susanna", expressionId: "disguise", position: "right" as const }] }

export const finalForgiveness = {
  id: "final-forgiveness",
  backgroundId: "garden-night",
  initialNodeId: "count-accuses",
  nodes: {
    "count-accuses": { type: "dialogue", id: "count-accuses", speakerId: "count", text: "皆、来い！　私の妻とフィガロが、この庭で何をしているか見届けるがいい！", presentation: accusation, next: { nodeId: "everyone-gathers" } },
    "everyone-gathers": { type: "dialogue", id: "everyone-gathers", text: "庭に人々が集まる。伯爵は自分が優位に立ったと信じ、二人を厳しく追及した。", presentation: accusation, next: { nodeId: "truth-revealed" } },
    "truth-revealed": { type: "dialogue", id: "truth-revealed", text: "すると、スザンナの服を着ていたのは伯爵夫人本人だと明らかになった。伯爵夫人の服を着ていたのは、本物のスザンナだった。", presentation: reveal, effects: [{ type: "setFlag", key: "countLearnsDisguiseTruth", value: true }], next: { nodeId: "count-realizes" } },
    "count-realizes": { type: "dialogue", id: "count-realizes", text: "伯爵は、自分がずっと妻をスザンナだと思い込み、口説いていたことに気づいた。庭は静まり返る。", presentation: reveal, next: { nodeId: "hypocrisy-callback" } },
    "hypocrisy-callback": { type: "branch", id: "hypocrisy-callback", branches: [{ when: { type: "any", conditions: [{ type: "flag", key: "noticedCountHypocrisy", operator: "===", value: true }, { type: "flag", key: "noticedCountDoubleStandardAct2", operator: "===", value: true }] }, next: { nodeId: "hypocrisy-returned" } }], default: { nodeId: "pain-callback" } },
    "hypocrisy-returned": { type: "dialogue", id: "hypocrisy-returned", text: "他人には厳しかった伯爵が、今は赦しを求める側へ立たされている。", presentation: reveal, next: { nodeId: "pain-callback" } },
    "pain-callback": { type: "branch", id: "pain-callback", branches: [{ when: { type: "any", conditions: [{ type: "flag", key: "understandsCountessPain", operator: "===", value: true }, { type: "flag", key: "understandsCountessLovePersists", operator: "===", value: true }, { type: "flag", key: "understandsCountessResolve", operator: "===", value: true }] }, next: { nodeId: "forgiveness-weight" } }], default: { nodeId: "count-asks-forgiveness" } },
    "forgiveness-weight": { type: "dialogue", id: "forgiveness-weight", text: "長く傷ついてきた伯爵夫人が、ここで何を選ぶか。その重みは、伯爵にも皆にも明らかだった。", presentation: reveal, next: { nodeId: "count-asks-forgiveness" } },
    "count-asks-forgiveness": { type: "dialogue", id: "count-asks-forgiveness", speakerId: "count", text: "伯爵夫人……ロジーナ。どうか、私を赦してほしい。", presentation: reveal, effects: [{ type: "setFlag", key: "countAsksCountessForgiveness", value: true }], next: { nodeId: "countess-forgives" } },
    "countess-forgives": { type: "dialogue", id: "countess-forgives", speakerId: "countess", text: "赦します。あなたが過ちを認めた今、私たちはもう一度、共に歩けるでしょう。", presentation: { ...reveal, characters: [{ characterId: "count", expressionId: "neutral", position: "left" }, { characterId: "countess", expressionId: "disguise", position: "center" }, { characterId: "susanna", expressionId: "disguise", position: "right" }] }, effects: [{ type: "setFlag", key: "countessForgivesCount", value: true }, { type: "setFlag", key: "finalReconciliationReached", value: true }], next: { nodeId: "act4-finale" } },
    "act4-finale": { type: "dialogue", id: "act4-finale", text: "♪ Contessa, perdono!", presentation: { ...reveal, musicId: "act4Finale" }, next: { nodeId: "final-choice" } },
    "final-choice": { type: "choice", id: "final-choice", prompt: "この物語の最後で、最も印象に残ったのは？", presentation: reveal, choices: [
      { id: "count-forgiveness", text: "伯爵が初めて赦しを乞ったこと", effects: [{ type: "setFlag", key: "understandsCountAsksForgiveness", value: true }], next: { nodeId: "count-forgiveness-reaction" } },
      { id: "countess-forgiveness", text: "伯爵夫人が伯爵を赦したこと", effects: [{ type: "setFlag", key: "understandsCountessForgiveness", value: true }, { type: "changeAffinity", characterId: "countess", amount: 1 }], next: { nodeId: "countess-forgiveness-reaction" } },
      { id: "reconciliation", text: "皆が一緒に喜びへ戻れたこと", effects: [{ type: "setFlag", key: "understandsFinalReconciliation", value: true }], next: { nodeId: "reconciliation-reaction" } },
    ] },
    "count-forgiveness-reaction": { type: "dialogue", id: "count-forgiveness-reaction", text: "伯爵は初めて、自分の権力ではなく相手の赦しを必要としている。", presentation: reveal, next: { nodeId: "final-summary" } },
    "countess-forgiveness-reaction": { type: "dialogue", id: "countess-forgiveness-reaction", text: "伯爵夫人の静かな寛大さが、長い一日の混乱を終わらせる。", presentation: reveal, next: { nodeId: "final-summary" } },
    "reconciliation-reaction": { type: "dialogue", id: "reconciliation-reaction", text: "疑いと誤解で離れていた人々の声が、ようやく同じ喜びへ重なっていく。", presentation: reveal, next: { nodeId: "final-summary" } },
    "final-summary": { type: "dialogue", id: "final-summary", text: "長い一日が終わった。フィガロとスザンナの結婚は祝福され、伯爵と伯爵夫人は互いに向き合った。夜の庭には、ようやく笑顔と音楽が戻る。", presentation: { backgroundId: "garden-night", characters: [{ characterId: "figaro", expressionId: "smile", position: "left" }, { characterId: "susanna", expressionId: "disguise", position: "center" }, { characterId: "countess", expressionId: "disguise", position: "right" }] }, next: { nodeId: "game-complete" } },
    "game-complete": { type: "end", id: "game-complete", presentation: reveal },
  },
} satisfies Scene
