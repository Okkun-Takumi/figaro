import type { Scene } from "../../../engine/types"

const garden = {
  backgroundId: "garden-night",
  characters: [
    { characterId: "barbarina", expressionId: "worried", position: "left" as const },
    { characterId: "figaro", expressionId: "neutral", position: "center" as const },
    { characterId: "marcellina", expressionId: "neutral", position: "right" as const },
  ],
}

export const barbarinaLostPin = {
  id: "barbarina-lost-pin",
  backgroundId: "garden-night",
  initialNodeId: "barbarina-searches",
  nodes: {
    "barbarina-searches": { type: "dialogue", id: "barbarina-searches", text: "夜の庭で、バルバリーナが草むらを見つめながら、何かを探している。", presentation: garden, effects: [{ type: "setFlag", key: "barbarinaLostPin", value: true }], next: { nodeId: "lho-perduta" } },
    "lho-perduta": { type: "dialogue", id: "lho-perduta", speakerId: "barbarina", text: "♪ L'ho perduta, me meschina", presentation: { ...garden, musicId: "lhoPerduta" }, next: { nodeId: "barbarina-explains" } },
    "barbarina-explains": { type: "dialogue", id: "barbarina-explains", speakerId: "barbarina", text: "伯爵様から、スザンナへこのピンを返すように言われたの。でも、ここで落としてしまったの。", presentation: garden, next: { nodeId: "figaro-asks" } },
    "figaro-asks": { type: "dialogue", id: "figaro-asks", speakerId: "figaro", text: "伯爵が、スザンナにピンを？　いったい何のために。", presentation: garden, next: { nodeId: "barbarina-reveals" } },
    "barbarina-reveals": { type: "dialogue", id: "barbarina-reveals", speakerId: "barbarina", text: "今夜、庭で待っているっていう手紙のお返事でしょう？　伯爵様は、返しておけって。", presentation: garden, effects: [{ type: "setFlag", key: "figaroLearnedAboutGardenMeeting", value: true }, { type: "setFlag", key: "figaroMisunderstandsGardenMeeting", value: true }], next: { nodeId: "pin-callback" } },
    "pin-callback": { type: "branch", id: "pin-callback", branches: [{ when: { type: "any", conditions: [{ type: "flag", key: "knowsPinLetterSignal", operator: "===", value: true }, { type: "flag", key: "noticedLetterPin", operator: "===", value: true }, { type: "flag", key: "tracksPinSignal", operator: "===", value: true }] }, next: { nodeId: "pin-recognized" } }], default: { nodeId: "figaro-misunderstands" } },
    "pin-recognized": { type: "dialogue", id: "pin-recognized", text: "スザンナが手紙を留めていた、あのピンだ。", presentation: garden, next: { nodeId: "figaro-misunderstands" } },
    "figaro-misunderstands": { type: "dialogue", id: "figaro-misunderstands", text: "フィガロの顔から笑みが消えた。スザンナが伯爵と会う約束をしたのだと、彼には聞こえてしまった。", presentation: garden, next: { nodeId: "pin-choice" } },
    "pin-choice": { type: "choice", id: "pin-choice", prompt: "フィガロが動揺した理由は？", presentation: garden, choices: [
      { id: "pin-reply", text: "ピンが密会の返事だと知ったから", effects: [{ type: "setFlag", key: "understandsPinReply", value: true }], next: { nodeId: "pin-reply-reaction" } },
      { id: "betrayal", text: "スザンナに裏切られたと思ったから", effects: [{ type: "setFlag", key: "understandsFigaroJealousy", value: true }], next: { nodeId: "betrayal-reaction" } },
      { id: "lacks-context", text: "フィガロだけが計画の真相を知らないから", effects: [{ type: "setFlag", key: "understandsFigaroLacksPlanContext", value: true }], next: { nodeId: "context-reaction" } },
    ] },
    "pin-reply-reaction": { type: "dialogue", id: "pin-reply-reaction", text: "小さなピンが、庭で交わされる約束の証に見えた。", presentation: garden, next: { nodeId: "pin-rejoin" } },
    "betrayal-reaction": { type: "dialogue", id: "betrayal-reaction", text: "フィガロは、信じていた相手に置き去りにされたように感じている。", presentation: garden, next: { nodeId: "pin-rejoin" } },
    "context-reaction": { type: "dialogue", id: "context-reaction", text: "庭へ向かう本当の作戦を、フィガロだけは知らされていない。", presentation: garden, next: { nodeId: "pin-rejoin" } },
    "pin-rejoin": { type: "dialogue", id: "pin-rejoin", speakerId: "figaro", text: "確かめる。今夜この庭で、何が起きるのかを。", presentation: garden, next: { sceneId: "figaro-jealousy", nodeId: "figaro-fury" } },
  },
} satisfies Scene
