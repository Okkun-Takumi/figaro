import type { Scene } from "../../../engine/types"

export const arrival = {
  id: "arrival",
  backgroundId: "manor-exterior-morning",
  initialNodeId: "morning-estate",
  nodes: {
    "morning-estate": {
      type: "dialogue",
      id: "morning-estate",
      text: "十八世紀、スペイン。セビリア近郊にあるアルマヴィーヴァ伯爵家の館。今日は、この館で長く待たれていた結婚式の日だ。",
      presentation: { backgroundId: "manor-exterior-morning" },
      next: { nodeId: "morning-bell" },
    },
    "morning-bell": {
      type: "dialogue",
      id: "morning-bell",
      text: "陽は低く、庭師たちはまだ花を運んでいる。祝祭の準備の音だけが、静かな朝の空気を満たしていた。",
      next: { nodeId: "messenger-arrives" },
    },
    "messenger-arrives": {
      type: "dialogue",
      id: "messenger-arrives",
      text: "門前に、急ぎ足の使用人が現れる。彼はあなたを探していたらしい。",
      next: { nodeId: "messenger-greeting" },
    },
    "messenger-greeting": {
      type: "dialogue",
      id: "messenger-greeting",
      text: "「失礼します。フィガロさんとスザンナさんの婚礼について、お話を聞きたい方だと伺いました」",
      next: { nodeId: "wedding-introduction" },
    },
    "wedding-introduction": {
      type: "dialogue",
      id: "wedding-introduction",
      text: "今日、この館ではフィガロとスザンナの結婚式が執り行われる。ところが、二人の周囲には晴れやかな話だけでは済まない気配があった。",
      effects: [{ type: "setFlag", key: "knowsWedding", value: true }],
      next: { nodeId: "arrival-choice" },
    },
    "arrival-choice": {
      type: "choice",
      id: "arrival-choice",
      prompt: "何を尋ねる？",
      choices: [
        { id: "ask-couple", text: "フィガロとスザンナについて聞く", effects: [{ type: "setFlag", key: "askedAboutCouple", value: true }], next: { nodeId: "couple-reaction" } },
        { id: "ask-rumor", text: "館で耳にした妙な噂を聞く", effects: [{ type: "setFlag", key: "heardStrangeRumor", value: true }], next: { nodeId: "rumor-reaction" } },
        { id: "ask-meeting", text: "まずは二人に会いたいと言う", next: { nodeId: "meeting-reaction" } },
      ],
    },
    "couple-reaction": {
      type: "dialogue",
      id: "couple-reaction",
      text: "「フィガロさんは館の使用人頭、スザンナさんは伯爵夫人付きの侍女です。お似合いのお二人ですが……今日は何かと気をつけた方がよさそうで」",
      next: { nodeId: "arrival-rejoin" },
    },
    "rumor-reaction": {
      type: "dialogue",
      id: "rumor-reaction",
      text: "「伯爵様が花嫁に目をかけている、という噂です。事実かどうかは、私の口からは……」使用人は言葉を濁した。",
      next: { nodeId: "arrival-rejoin" },
    },
    "meeting-reaction": {
      type: "dialogue",
      id: "meeting-reaction",
      text: "「承知しました。支度部屋へご案内します。二人とも、今はきっと落ち着かないでしょうから」",
      next: { nodeId: "arrival-rejoin" },
    },
    "arrival-rejoin": {
      type: "dialogue",
      id: "arrival-rejoin",
      text: "使用人は館の扉を開け、あなたを中へ招き入れた。",
      next: { sceneId: "manor-hallway", nodeId: "hallway-entry" },
    },
  },
} satisfies Scene
