import type { Scene } from "../../../engine/types"

export const manorHallway = {
  id: "manor-hallway",
  initialNodeId: "hallway-entry",
  nodes: {
    "hallway-entry": {
      type: "dialogue",
      id: "hallway-entry",
      text: "館の中へ入ると、華やかな飾りつけとは対照的に、使用人たちは妙に声を潜めていた。",
      presentation: { backgroundId: "manor-hallway" },
      next: { nodeId: "hallway-whisper" },
    },
    "hallway-whisper": {
      type: "dialogue",
      id: "hallway-whisper",
      text: "「伯爵はね……」「いや、奥様がお気の毒だ」断片的な囁きが、通り過ぎるたびに耳へ残る。",
      next: { nodeId: "hallway-figaro" },
    },
    "hallway-figaro": {
      type: "dialogue",
      id: "hallway-figaro",
      speakerId: "figaro",
      text: "「あなたが話を聞きに来た人だね。ちょうどいい、部屋へ来てくれ」",
      presentation: { characters: [{ characterId: "figaro", expressionId: "neutral", position: "left" }] },
      next: { nodeId: "hallway-susanna" },
    },
    "hallway-susanna": {
      type: "dialogue",
      id: "hallway-susanna",
      speakerId: "susanna",
      text: "「急いで。今日の婚礼には、少し事情があるの」",
      presentation: { characters: [{ characterId: "figaro", expressionId: "neutral", position: "left" }, { characterId: "susanna", expressionId: "concerned", position: "right" }] },
      next: { nodeId: "prologue-transition" },
    },
    "prologue-transition": {
      type: "dialogue",
      id: "prologue-transition",
      text: "何をしてるんだ……？",
      next: { scenarioId: "act1", sceneId: "wedding-room", nodeId: "room-entry" },
    },
  },
} satisfies Scene
