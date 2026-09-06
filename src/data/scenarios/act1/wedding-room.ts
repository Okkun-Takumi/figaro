import type { Scene } from "../../../engine/types"

const roomPresentation = {
  backgroundId: "wedding-room",
  characters: [
    { characterId: "figaro", expressionId: "neutral", position: "left" as const },
    { characterId: "susanna", expressionId: "neutral", position: "right" as const },
  ],
}

export const weddingRoom = {
  id: "wedding-room",
  initialNodeId: "room-entry",
  nodes: {
    "room-entry": { type: "dialogue", id: "room-entry", speakerId: "figaro", text: "五……十……二十……", presentation: roomPresentation, next: { nodeId: "figaro-measuring" } },
    "figaro-measuring": { type: "dialogue", id: "figaro-measuring", speakerId: "figaro", text: "「この部屋なら、ベッドはここだな。扉からも近いし、朝は日が入る」", presentation: roomPresentation, next: { nodeId: "susanna-question" } },
    "susanna-question": { type: "dialogue", id: "susanna-question", speakerId: "susanna", text: "「本当に、ここでいいと思っているの？」", presentation: { ...roomPresentation, characters: [{ characterId: "figaro", expressionId: "neutral", position: "left" }, { characterId: "susanna", expressionId: "concerned", position: "right" }] }, next: { nodeId: "figaro-answer" } },
    "figaro-answer": { type: "dialogue", id: "figaro-answer", speakerId: "figaro", text: "「伯爵様がくださった部屋だ。何が悪い？」", presentation: roomPresentation, next: { nodeId: "susanna-reveal" } },
    "susanna-reveal": { type: "dialogue", id: "susanna-reveal", speakerId: "susanna", text: "「伯爵の寝室にも、夫人の部屋にも近すぎるのよ。そんな親切、素直に喜べる？」", presentation: roomPresentation, next: { nodeId: "figaro-realizes" } },
    "figaro-realizes": { type: "dialogue", id: "figaro-realizes", speakerId: "figaro", text: "「……なるほど。そういうことか」", presentation: roomPresentation, next: { nodeId: "figaro-looks-away" } },
    "figaro-looks-away": { type: "dialogue", id: "figaro-looks-away", text: "フィガロの表情から、祝いの日の軽さが消えた。", presentation: roomPresentation, effects: [{ type: "setFlag", key: "understandsCoupleRelationship", value: true }, { type: "setFlag", key: "hasMetFigaro", value: true }, { type: "setFlag", key: "hasMetSusanna", value: true }], next: { nodeId: "asked-couple-branch" } },
    "asked-couple-branch": { type: "branch", id: "asked-couple-branch", branches: [{ when: { type: "flag", key: "askedAboutCouple", operator: "===", value: true }, next: { nodeId: "asked-couple-comment" } }], default: { nodeId: "room-motive" } },
    "asked-couple-comment": { type: "dialogue", id: "asked-couple-comment", speakerId: "figaro", text: "「婚礼のことを聞いてきたんだって？ なら、見届けてくれ。これはただの結婚式じゃない」", presentation: roomPresentation, next: { nodeId: "room-motive" } },
    "room-motive": { type: "dialogue", id: "room-motive", speakerId: "susanna", text: "「伯爵は、昔の権利を復活させるつもりなのかもしれない。私を、花嫁ではなく都合のいい相手として見ているの」", presentation: roomPresentation, next: { nodeId: "room-choice" } },
    "room-choice": {
      type: "choice", id: "room-choice", prompt: "二人の話を聞き、どう反応する？", presentation: roomPresentation,
      choices: [
        { id: "support-figaro", text: "フィガロに協力を申し出る", effects: [{ type: "changeAffinity", characterId: "figaro", amount: 1 }], next: { nodeId: "support-figaro-reaction" } },
        { id: "support-susanna", text: "スザンナの気持ちを気づかう", effects: [{ type: "changeAffinity", characterId: "susanna", amount: 1 }, { type: "setFlag", key: "noticedSusannaDiscomfort", value: true }], next: { nodeId: "support-susanna-reaction" } },
        { id: "question-room", text: "部屋を与えた理由を尋ねる", effects: [{ type: "setFlag", key: "suspectsRoomMotive", value: true }], next: { nodeId: "question-room-reaction" } },
      ],
    },
    "support-figaro-reaction": { type: "dialogue", id: "support-figaro-reaction", speakerId: "figaro", text: "「頼もしいね。伯爵の手を読むには、味方が多い方がいい」", presentation: roomPresentation, next: { nodeId: "room-choice-rejoin" } },
    "support-susanna-reaction": { type: "dialogue", id: "support-susanna-reaction", speakerId: "susanna", text: "「ありがとう。私が困っていることを、ちゃんと見てくれるのね」", presentation: roomPresentation, next: { nodeId: "room-choice-rejoin" } },
    "question-room-reaction": { type: "dialogue", id: "question-room-reaction", speakerId: "susanna", text: "「伯爵が私を近くに置きたいから。だからこそ、この部屋は罠なのよ」", presentation: roomPresentation, next: { nodeId: "room-choice-rejoin" } },
    "room-choice-rejoin": { type: "dialogue", id: "room-choice-rejoin", text: "三人は、伯爵の思惑を確かめるために動き始めることにした。", presentation: roomPresentation, next: { nodeId: "susanna-branch" } },
    "susanna-branch": { type: "branch", id: "susanna-branch", branches: [{ when: { type: "affinity", characterId: "susanna", operator: ">=", value: 1 }, next: { nodeId: "susanna-trust" } }], default: { nodeId: "basilio-arrives" } },
    "susanna-trust": { type: "dialogue", id: "susanna-trust", speakerId: "susanna", text: "「あなたにも話しておく。伯爵夫人も、このことに心を痛めているはず」", presentation: roomPresentation, next: { nodeId: "basilio-arrives" } },
    "basilio-arrives": { type: "dialogue", id: "basilio-arrives", text: "そこへ音楽教師バジリオが顔を出した。彼は伯爵の機嫌をうかがいながら、意味ありげに笑っている。", presentation: roomPresentation, next: { nodeId: "basilio-role" } },
    "basilio-role": { type: "dialogue", id: "basilio-role", speakerId: "susanna", text: "「バジリオ、伯爵のために余計な口を利くなら、今すぐ出て行って」", presentation: roomPresentation, effects: [{ type: "setFlag", key: "knowsBasilioRole", value: true }], next: { nodeId: "basilio-exit" } },
    "basilio-exit": { type: "dialogue", id: "basilio-exit", text: "バジリオは肩をすくめて去った。残された二人は、伯爵の関心が本物だと理解する。", presentation: roomPresentation, effects: [{ type: "setFlag", key: "knowsCountsInterestInSusanna", value: true }, { type: "setFlag", key: "understandsRoomTrap", value: true }], next: { nodeId: "right-explanation" } },
    "right-explanation": { type: "dialogue", id: "right-explanation", speakerId: "figaro", text: "「昔の『初夜の権利』を、伯爵はもう廃したと言っていた。それなのに、今さら花嫁へ手を伸ばす気か」", presentation: roomPresentation, next: { nodeId: "susanna-anger" } },
    "susanna-anger": { type: "dialogue", id: "susanna-anger", speakerId: "susanna", text: "「権利の名前を使わなくても同じよ。私の意志なんて、最初から数えていない」", presentation: roomPresentation, effects: [{ type: "setFlag", key: "knowsDroitDuSeigneur", value: true }], next: { sceneId: "figaro-defiance", nodeId: "strategy-choice" } },
  },
} satisfies Scene
