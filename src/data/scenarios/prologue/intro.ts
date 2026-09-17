import type { Scene } from "../../../engine/types"

export const intro = {
  id: "intro",
  initialNodeId: "introduction",
  nodes: {
    introduction: {
      type: "dialogue",
      id: "introduction",
      text: "今日は、フィガロとスザンナの結婚式。\n\nあなたはアルマヴィーヴァ伯爵の屋敷を手伝うため、\n一日だけやってきた使用人だ。\n\nけれど、この屋敷では今、\nいくつもの思惑が動き始めている。\n\n誰の言葉を信じ、何に気づくか。",
      presentation: { screen: "introduction" },
      next: { sceneId: "arrival", nodeId: "morning-estate" },
    },
  },
} satisfies Scene
