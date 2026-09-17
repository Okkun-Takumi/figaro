import type { Scene } from "../../../engine/types"

const countessAsSusanna = { backgroundId: "garden-night", characters: [{ characterId: "countess", expressionId: "disguise", position: "left" as const }, { characterId: "cherubino", expressionId: "flustered", position: "right" as const }] }
const countMeeting = { backgroundId: "garden-night", characters: [{ characterId: "countess", expressionId: "disguise", position: "left" as const }, { characterId: "count", expressionId: "charming", position: "right" as const }] }
const figaroMeeting = { backgroundId: "garden-night", characters: [{ characterId: "susanna", expressionId: "disguise", position: "left" as const }, { characterId: "figaro", expressionId: "serious", position: "right" as const }] }

export const gardenMistakenIdentities = {
  id: "garden-mistaken-identities",
  backgroundId: "garden-night",
  initialNodeId: "cherubino-approaches",
  nodes: {
    "cherubino-approaches": { type: "dialogue", id: "cherubino-approaches", text: "ケルビーノは、スザンナの服を着た伯爵夫人を見つけると、スザンナ本人だと思って駆け寄った。", presentation: countessAsSusanna, next: { nodeId: "cherubino-greets" } },
    "cherubino-greets": { type: "dialogue", id: "cherubino-greets", speakerId: "cherubino", text: "スザンナ！　やっと会えた。少しだけ話を――", presentation: countessAsSusanna, next: { nodeId: "count-arrives" } },
    "count-arrives": { type: "dialogue", id: "count-arrives", text: "そこへ伯爵が現れた。伯爵もまた、目の前の伯爵夫人をスザンナだと思い込んでいる。ケルビーノは慌てて身を隠した。", presentation: countMeeting, next: { nodeId: "count-courts" } },
    "count-courts": { type: "dialogue", id: "count-courts", speakerId: "count", text: "待たせたね、スザンナ。今夜こそ、誰にも邪魔はさせない。", presentation: countMeeting, next: { nodeId: "identity-layout" } },
    "identity-layout": { type: "dialogue", id: "identity-layout", text: "伯爵とケルビーノは、スザンナの服を着た伯爵夫人をスザンナだと思っている。フィガロは伯爵夫人の服を着たスザンナを、伯爵夫人だと思っている。二人の女性だけが、衣装の入れ替わりを知っていた。", presentation: { backgroundId: "garden-night", characters: [{ characterId: "countess", expressionId: "disguise", position: "left" }, { characterId: "susanna", expressionId: "disguise", position: "center" }, { characterId: "count", expressionId: "charming", position: "right" }] }, next: { nodeId: "setup-callback" } },
    "setup-callback": { type: "branch", id: "setup-callback", branches: [{ when: { type: "flag", key: "understandsCountMistakenIdentitySetup", operator: "===", value: true }, next: { nodeId: "setup-realized" } }], default: { nodeId: "figaro-callback" } },
    "setup-realized": { type: "dialogue", id: "setup-realized", text: "伯爵が伯爵夫人をスザンナだと思う状況が、いま目の前で成立している。", presentation: countMeeting, next: { nodeId: "figaro-callback" } },
    "figaro-callback": { type: "branch", id: "figaro-callback", branches: [{ when: { type: "flag", key: "anticipatesFigaroDisguiseConfusion", operator: "===", value: true }, next: { nodeId: "figaro-confused" } }], default: { nodeId: "test-callback" } },
    "figaro-confused": { type: "dialogue", id: "figaro-confused", text: "衣装の入れ替わりは、隠れて見ていたフィガロまで惑わせている。", presentation: countMeeting, next: { nodeId: "test-callback" } },
    "test-callback": { type: "branch", id: "test-callback", branches: [{ when: { type: "flag", key: "understandsCountessTestsCount", operator: "===", value: true }, next: { nodeId: "test-underway" } }], default: { nodeId: "susanna-appears" } },
    "test-underway": { type: "dialogue", id: "test-underway", text: "伯爵夫人は、自分自身で夫の裏切りを確かめようとしている。", presentation: countMeeting, next: { nodeId: "susanna-appears" } },
    "susanna-appears": { type: "dialogue", id: "susanna-appears", text: "伯爵夫人の服を着たスザンナが、フィガロの前へ姿を見せた。フィガロは彼女を伯爵夫人だと思い、丁重に声をかける。", presentation: figaroMeeting, next: { nodeId: "figaro-recognizes" } },
    "figaro-recognizes": { type: "dialogue", id: "figaro-recognizes", text: "けれど、わずかな声の調子と仕草で、フィガロは正体を悟った。目の前にいるのは、伯爵夫人ではなくスザンナだ。", presentation: figaroMeeting, effects: [{ type: "setFlag", key: "figaroRecognizesSusannaInDisguise", value: true }], next: { nodeId: "figaro-teases" } },
    "figaro-teases": { type: "dialogue", id: "figaro-teases", speakerId: "figaro", text: "奥様ほど気高い方には、つい心を奪われてしまいます。どうか、この哀れな男を憐れんでください。", presentation: { ...figaroMeeting, characters: [{ characterId: "susanna", expressionId: "disguise", position: "left" }, { characterId: "figaro", expressionId: "smile", position: "right" }] }, next: { nodeId: "susanna-angered" } },
    "susanna-angered": { type: "dialogue", id: "susanna-angered", speakerId: "susanna", text: "まあ。今度は伯爵夫人にまで恋を囁くの？　あなた、まだ何も分かっていないのね。", presentation: figaroMeeting, effects: [{ type: "setFlag", key: "susannaKnowsFigaroRecognizedHer", value: true }], next: { nodeId: "figaro-reveals-knowledge" } },
    "figaro-reveals-knowledge": { type: "dialogue", id: "figaro-reveals-knowledge", speakerId: "figaro", text: "分かっているさ、スザンナ。君が僕をからかったように、今度は僕の番だ。", presentation: { ...figaroMeeting, characters: [{ characterId: "susanna", expressionId: "disguise", position: "left" }, { characterId: "figaro", expressionId: "smile", position: "right" }] }, next: { nodeId: "mistake-choice" } },
    "mistake-choice": { type: "choice", id: "mistake-choice", prompt: "今、一番大きなすれ違いは？", presentation: figaroMeeting, choices: [
      { id: "count", text: "伯爵が妻をスザンナだと思っていること", effects: [{ type: "setFlag", key: "tracksCountMistakesCountessForSusanna", value: true }], next: { nodeId: "count-choice-reaction" } },
      { id: "figaro", text: "フィガロがスザンナを伯爵夫人だと思っていたこと", effects: [{ type: "setFlag", key: "tracksFigaroMistakesSusannaForCountess", value: true }], next: { nodeId: "figaro-choice-reaction" } },
      { id: "women", text: "真相を知っている女性二人が状況を動かしていること", effects: [{ type: "setFlag", key: "understandsWomenControlFinalPlan", value: true }, { type: "changeAffinity", characterId: "susanna", amount: 1 }], next: { nodeId: "women-choice-reaction" } },
    ] },
    "count-choice-reaction": { type: "dialogue", id: "count-choice-reaction", text: "伯爵は、自分が妻に試されていることをまだ知らない。", presentation: countMeeting, next: { nodeId: "mistake-rejoin" } },
    "figaro-choice-reaction": { type: "dialogue", id: "figaro-choice-reaction", text: "フィガロの誤解は解けたが、庭にはまだ別の誤解が重なっている。", presentation: figaroMeeting, next: { nodeId: "mistake-rejoin" } },
    "women-choice-reaction": { type: "dialogue", id: "women-choice-reaction", text: "伯爵夫人とスザンナは、互いに正体を知ったまま最後の局面を動かしている。", presentation: figaroMeeting, next: { nodeId: "mistake-rejoin" } },
    "mistake-rejoin": { type: "dialogue", id: "mistake-rejoin", text: "伯爵は、妻とフィガロが何かを企んでいると誤解した。怒りに駆られ、皆を呼び集める。", presentation: { backgroundId: "garden-night", characters: [{ characterId: "count", expressionId: "angry", position: "left" }, { characterId: "countess", expressionId: "disguise", position: "center" }, { characterId: "figaro", expressionId: "smile", position: "right" }] }, next: { sceneId: "final-forgiveness", nodeId: "count-accuses" } },
  },
} satisfies Scene
