import type { Scene } from "../../../engine/types"

const garden = {
  backgroundId: "garden-night",
  characters: [
    { characterId: "susanna", expressionId: "disguise", position: "left" as const },
    { characterId: "figaro", expressionId: "annoyed", position: "right" as const },
  ],
}

export const susannaDehVieni = {
  id: "susanna-deh-vieni",
  backgroundId: "garden-night",
  initialNodeId: "susanna-enters-garden",
  nodes: {
    "susanna-enters-garden": { type: "dialogue", id: "susanna-enters-garden", text: "伯爵夫人の服を着たスザンナが、夜の庭へ一人で戻ってきた。木陰には、まだフィガロがいる。", presentation: garden, next: { nodeId: "susanna-notices-figaro" } },
    "susanna-notices-figaro": { type: "dialogue", id: "susanna-notices-figaro", text: "スザンナは、フィガロが自分を疑っていることに気づいた。彼に聞こえるよう、わざと穏やかな声を響かせる。", presentation: garden, next: { nodeId: "jealousy-callback" } },
    "jealousy-callback": { type: "branch", id: "jealousy-callback", branches: [{ when: { type: "any", conditions: [{ type: "flag", key: "understandsFigaroJealousy", operator: "===", value: true }, { type: "flag", key: "noticedFigaroJealousyCloudsJudgment", operator: "===", value: true }] }, next: { nodeId: "jealousy-deepens" } }], default: { nodeId: "love-callback" } },
    "jealousy-deepens": { type: "dialogue", id: "jealousy-deepens", text: "フィガロの嫉妬は、スザンナの歌をいっそう伯爵への呼びかけのように聞かせてしまう。", presentation: garden, next: { nodeId: "love-callback" } },
    "love-callback": { type: "branch", id: "love-callback", branches: [{ when: { type: "flag", key: "understandsFigaroLoveForSusanna", operator: "===", value: true }, next: { nodeId: "love-underneath" } }], default: { nodeId: "ruse-callback" } },
    "love-underneath": { type: "dialogue", id: "love-underneath", text: "強い動揺の奥には、スザンナを失いたくないというフィガロの思いがある。", presentation: garden, next: { nodeId: "ruse-callback" } },
    "ruse-callback": { type: "branch", id: "ruse-callback", branches: [{ when: { type: "flag", key: "understandsSusannaRuse", operator: "===", value: true }, next: { nodeId: "susanna-intent" } }], default: { nodeId: "deh-vieni" } },
    "susanna-intent": { type: "dialogue", id: "susanna-intent", text: "スザンナは伯爵へ心を許したのではない。今も、夜の計画を最後まで進めようとしている。", presentation: garden, next: { nodeId: "deh-vieni" } },
    "deh-vieni": { type: "dialogue", id: "deh-vieni", speakerId: "susanna", text: "♪ Deh vieni, non tardar", presentation: { ...garden, musicId: "dehVieniNonTardar" }, next: { nodeId: "song-choice" } },
    "song-choice": { type: "choice", id: "song-choice", prompt: "スザンナは誰に向けて歌っているように見える？", presentation: garden, choices: [
      { id: "figaro", text: "本当はフィガロを意識している", effects: [{ type: "setFlag", key: "understandsDehVieniTargetsFigaro", value: true }], next: { nodeId: "figaro-reaction" } },
      { id: "tease", text: "フィガロをわざと嫉妬させている", effects: [{ type: "setFlag", key: "understandsSusannaTeasesFigaro", value: true }], next: { nodeId: "tease-reaction" } },
      { id: "sincere", text: "恋の歌として純粋に楽しんでいる部分もありそう", effects: [{ type: "setFlag", key: "noticesSusannaSincereLove", value: true }, { type: "changeAffinity", characterId: "susanna", amount: 1 }], next: { nodeId: "sincere-reaction" } },
    ] },
    "figaro-reaction": { type: "dialogue", id: "figaro-reaction", text: "歌の柔らかさは、疑いの底にいるフィガロへも届いている。", presentation: garden, next: { nodeId: "song-rejoin" } },
    "tease-reaction": { type: "dialogue", id: "tease-reaction", text: "スザンナは、木陰の気配を知りながら少しだけ意地悪に歌っている。", presentation: garden, next: { nodeId: "song-rejoin" } },
    "sincere-reaction": { type: "dialogue", id: "sincere-reaction", text: "からかいの中にも、スザンナ自身のまっすぐな愛情が重なっている。", presentation: garden, next: { nodeId: "song-rejoin" } },
    "song-rejoin": { type: "dialogue", id: "song-rejoin", text: "歌が終わるころ、庭には次々と人の気配が増え始めた。フィガロの誤解は、まだ解けない。", presentation: garden, next: { sceneId: "garden-mistaken-identities", nodeId: "cherubino-approaches" } },
  },
} satisfies Scene
