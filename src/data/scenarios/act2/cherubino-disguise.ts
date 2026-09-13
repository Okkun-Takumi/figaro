import type { Scene } from "../../../engine/types"

const preparationPresentation = {
  backgroundId: "countess-bedroom",
  characters: [
    { characterId: "countess", expressionId: "neutral", position: "left" as const },
    { characterId: "susanna", expressionId: "serious", position: "center" as const },
    { characterId: "cherubino", expressionId: "flustered", position: "right" as const },
  ],
}

const disguisedPresentation = {
  backgroundId: "countess-bedroom",
  characters: [
    { characterId: "countess", expressionId: "neutral", position: "left" as const },
    { characterId: "susanna", expressionId: "smile", position: "center" as const },
    { characterId: "cherubino", expressionId: "disguised", position: "right" as const },
  ],
}

const worriedDisguisedPresentation = {
  backgroundId: "countess-bedroom",
  characters: [
    { characterId: "countess", expressionId: "surprised", position: "left" as const },
    { characterId: "susanna", expressionId: "worried", position: "center" as const },
    { characterId: "cherubino", expressionId: "disguised-worried", position: "right" as const },
  ],
}

export const cherubinoDisguise = {
  id: "cherubino-disguise",
  backgroundId: "countess-bedroom",
  initialNodeId: "disguise-start",
  nodes: {
    "disguise-start": {
      type: "dialogue",
      id: "disguise-start",
      text: "スザンナはケルビーノを椅子へ座らせ、急いで変装の支度に取りかかった。",
      presentation: preparationPresentation,
      next: { nodeId: "susanna-orders-kneel" },
    },
    "susanna-orders-kneel": {
      type: "dialogue",
      id: "susanna-orders-kneel",
      speakerId: "susanna",
      text: "じっとしていて。髪も服も、私がちゃんと整えるから。",
      presentation: preparationPresentation,
      next: { nodeId: "venite-inginocchiatevi" },
    },
    "venite-inginocchiatevi": {
      type: "dialogue",
      id: "venite-inginocchiatevi",
      text: "♪ Venite, inginocchiatevi",
      presentation: { ...preparationPresentation, musicId: "veniteInginocchiatevi" },
      next: { nodeId: "disguise-progress" },
    },
    "disguise-progress": {
      type: "dialogue",
      id: "disguise-progress",
      text: "スザンナは髪を結い、服の襟元を整えていく。ケルビーノは落ち着かない様子で身を縮めた。",
      presentation: preparationPresentation,
      next: { nodeId: "cherubino-transformed" },
    },
    "cherubino-transformed": {
      type: "dialogue",
      id: "cherubino-transformed",
      speakerId: "cherubino",
      text: "こんな格好、本当に必要なのか？　なんだか、すごく恥ずかしいよ。",
      presentation: disguisedPresentation,
      next: { nodeId: "susanna-checks-him" },
    },
    "susanna-checks-him": {
      type: "dialogue",
      id: "susanna-checks-him",
      speakerId: "susanna",
      text: "大丈夫。これなら、急に見られてもすぐには気づかれないわ。",
      presentation: disguisedPresentation,
      next: { nodeId: "countess-watches" },
    },
    "countess-watches": {
      type: "dialogue",
      id: "countess-watches",
      speakerId: "countess",
      text: "そのリボンは、もう少し胸元の近くに留めてちょうだい。",
      presentation: disguisedPresentation,
      next: { nodeId: "ribbon-discovery" },
    },
    "ribbon-discovery": {
      type: "dialogue",
      id: "ribbon-discovery",
      speakerId: "cherubino",
      text: "それは……伯爵夫人からいただいたリボンなんです。ずっと持っていました。",
      presentation: disguisedPresentation,
      next: { nodeId: "susanna-explains-ribbon" },
    },
    "susanna-explains-ribbon": {
      type: "dialogue",
      id: "susanna-explains-ribbon",
      speakerId: "susanna",
      text: "それ、伯爵様が伯爵夫人へ贈ったものよ。ケルビーノが大事に持っていたのね。",
      presentation: disguisedPresentation,
      next: { nodeId: "countess-recognizes-ribbon" },
    },
    "countess-recognizes-ribbon": {
      type: "dialogue",
      id: "countess-recognizes-ribbon",
      speakerId: "countess",
      text: "まあ……同じリボンだったのね。",
      presentation: {
        ...disguisedPresentation,
        characters: [
          { characterId: "countess", expressionId: "surprised", position: "left" },
          { characterId: "susanna", expressionId: "smile", position: "center" },
          { characterId: "cherubino", expressionId: "disguised", position: "right" },
        ],
      },
      effects: [{ type: "setFlag", key: "noticedCherubinoKeepsCountessRibbon", value: true }],
      next: { nodeId: "countess-focus-branch" },
    },
    "countess-focus-branch": {
      type: "branch",
      id: "countess-focus-branch",
      branches: [
        {
          when: { type: "flag", key: "noticedCherubinoFocusOnCountess", operator: "===", value: true },
          next: { nodeId: "countess-focus-reaction" },
        },
      ],
      default: { nodeId: "disguise-choice" },
    },
    "countess-focus-reaction": {
      type: "dialogue",
      id: "countess-focus-reaction",
      text: "以前の歌と重ねると、ケルビーノが伯爵夫人をどれほど意識しているかが、いっそう伝わってくる。",
      presentation: disguisedPresentation,
      next: { nodeId: "disguise-choice" },
    },
    "disguise-choice": {
      type: "choice",
      id: "disguise-choice",
      prompt: "変装したケルビーノを見て、どう感じる？",
      presentation: disguisedPresentation,
      choices: [
        {
          id: "disguise-works",
          text: "これなら伯爵も騙せそうだ",
          effects: [{ type: "setFlag", key: "believesCherubinoDisguiseWorks", value: true }],
          next: { nodeId: "disguise-works-reaction" },
        },
        {
          id: "focuses-countess",
          text: "やっぱり伯爵夫人をかなり意識している",
          effects: [{ type: "setFlag", key: "noticedCherubinoFocusOnCountess", value: true }],
          next: { nodeId: "focuses-countess-reaction" },
        },
        {
          id: "countess-tenderness",
          text: "伯爵夫人もケルビーノを気にかけているみたいだ",
          effects: [{ type: "setFlag", key: "noticedCountessTendernessToCherubino", value: true }],
          next: { nodeId: "countess-tenderness-reaction" },
        },
      ],
    },
    "disguise-works-reaction": {
      type: "dialogue",
      id: "disguise-works-reaction",
      text: "見た目だけなら、ケルビーノだとすぐ見抜くのは難しそうだ。",
      presentation: disguisedPresentation,
      next: { nodeId: "disguise-rejoin" },
    },
    "focuses-countess-reaction": {
      type: "dialogue",
      id: "focuses-countess-reaction",
      text: "ケルビーノは伯爵夫人の前で、変装の最中にもどこかそわそわしている。",
      presentation: disguisedPresentation,
      next: { nodeId: "disguise-rejoin" },
    },
    "countess-tenderness-reaction": {
      type: "dialogue",
      id: "countess-tenderness-reaction",
      text: "伯爵夫人の気遣いには、困っている少年を放っておけない優しさがにじんでいる。",
      presentation: disguisedPresentation,
      next: { nodeId: "disguise-rejoin" },
    },
    "disguise-rejoin": {
      type: "dialogue",
      id: "disguise-rejoin",
      text: "ひとまず変装は整った。あとは、伯爵がここへ来ないことを願うだけだ。",
      presentation: disguisedPresentation,
      next: { nodeId: "susanna-leaves" },
    },
    "susanna-leaves": {
      type: "dialogue",
      id: "susanna-leaves",
      speakerId: "susanna",
      text: "足りないものを取ってくるわ。二人とも、ここで待っていて。",
      presentation: disguisedPresentation,
      next: { nodeId: "count-knocks" },
    },
    "count-knocks": {
      type: "dialogue",
      id: "count-knocks",
      text: "そのとき、扉の外から伯爵の声と足音が近づいてきた。ケルビーノの顔から血の気が引く。",
      presentation: worriedDisguisedPresentation,
      next: { nodeId: "a2-05-pending" },
    },
    "a2-05-pending": {
      type: "dialogue",
      id: "a2-05-pending",
      presentation: worriedDisguisedPresentation,
      text: "伯爵の声は、もう扉のすぐ外まで来ている。",
      next: { sceneId: "count-closet", nodeId: "count-arrives" },
    },
  },
} satisfies Scene
