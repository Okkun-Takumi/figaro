import type { Scene } from "../../../engine/types"

const susannaPresentation = {
  backgroundId: "manor-hallway",
  characters: [{ characterId: "susanna", expressionId: "worried", position: "center" as const }],
}

export const countCherubino = {
  id: "count-cherubino",
  backgroundId: "manor-hallway",
  initialNodeId: "susanna-startles",
  nodes: {
    "susanna-startles": { type: "dialogue", id: "susanna-startles", speakerId: "susanna", text: "「え？」", presentation: susannaPresentation, next: { nodeId: "cherubino-fears" } },
    "cherubino-fears": { type: "dialogue", id: "cherubino-fears", speakerId: "cherubino", text: "「見つかったら本当に終わりだ！」", presentation: { ...susannaPresentation, characters: [{ characterId: "susanna", expressionId: "worried", position: "left" }, { characterId: "cherubino", expressionId: "surprised", position: "right" }] }, next: { nodeId: "susanna-stops" } },
    "susanna-stops": { type: "dialogue", id: "susanna-stops", speakerId: "susanna", text: "「ちょっと、待ちなさい！」", presentation: susannaPresentation, next: { nodeId: "cherubino-hides" } },
    "cherubino-hides": { type: "dialogue", id: "cherubino-hides", text: "ケルビーノは部屋に置かれた大きな椅子の陰へ身を滑り込ませた。", presentation: susannaPresentation, effects: [{ type: "setFlag", key: "cherubinoHiddenFromCount", value: true }], next: { nodeId: "count-enters" } },
    "count-enters": { type: "dialogue", id: "count-enters", speakerId: "count", text: "「スザンナ。」", presentation: { ...susannaPresentation, characters: [{ characterId: "susanna", expressionId: "worried", position: "left" }, { characterId: "count", expressionId: "smile", position: "right" }] }, next: { nodeId: "susanna-greets-count" } },
    "susanna-greets-count": { type: "dialogue", id: "susanna-greets-count", speakerId: "susanna", text: "「伯爵様……。」", presentation: susannaPresentation, next: { nodeId: "count-notices" } },
    "count-notices": { type: "dialogue", id: "count-notices", speakerId: "count", text: "「ずいぶん慌てているようだな。」", presentation: { ...susannaPresentation, characters: [{ characterId: "susanna", expressionId: "worried", position: "left" }, { characterId: "count", expressionId: "smile", position: "right" }] }, next: { nodeId: "susanna-denies" } },
    "susanna-denies": { type: "dialogue", id: "susanna-denies", speakerId: "susanna", text: "「そんなことは……。」伯爵は、この部屋に二人きりだと思っている。", presentation: susannaPresentation, next: { nodeId: "count-proposes" } },
    "count-proposes": { type: "dialogue", id: "count-proposes", speakerId: "count", text: "「バジリオから聞いているだろう。私がお前をどれほど気に入っているか。」", presentation: { ...susannaPresentation, characters: [{ characterId: "susanna", expressionId: "neutral", position: "left" }, { characterId: "count", expressionId: "smile", position: "right" }] }, next: { nodeId: "susanna-refuses" } },
    "susanna-refuses": { type: "dialogue", id: "susanna-refuses", speakerId: "susanna", text: "「そのお話なら、何度お断りしたか分かりません。」", presentation: susannaPresentation, next: { nodeId: "count-garden" } },
    "count-garden": { type: "dialogue", id: "count-garden", speakerId: "count", text: "「夕方、庭で少しだけ会ってくれればいい。もちろん、礼はする。」", presentation: { ...susannaPresentation, characters: [{ characterId: "susanna", expressionId: "neutral", position: "left" }, { characterId: "count", expressionId: "smile", position: "right" }] }, effects: [{ type: "setFlag", key: "witnessedCountCourtSusanna", value: true }, { type: "setFlag", key: "confirmsCountsPlan", value: true }], next: { nodeId: "susanna-refuses-again" } },
    "susanna-refuses-again": { type: "dialogue", id: "susanna-refuses-again", speakerId: "susanna", text: "「結構です。」スザンナが言っていた話は、本当だった。椅子の陰ではケルビーノも、この会話を聞いている。", presentation: susannaPresentation, next: { nodeId: "room-motive-branch" } },
    "room-motive-branch": { type: "branch", id: "room-motive-branch", branches: [{ when: { type: "flag", key: "suspectsRoomMotive", operator: "===", value: true }, next: { nodeId: "room-motive-thought" } }], default: { nodeId: "susanna-priority-branch" } },
    "room-motive-thought": { type: "dialogue", id: "room-motive-thought", text: "やっぱり。この部屋が伯爵の部屋の近くなのは偶然じゃない。", presentation: susannaPresentation, next: { nodeId: "susanna-priority-branch" } },
    "susanna-priority-branch": { type: "branch", id: "susanna-priority-branch", branches: [{ when: { type: "flag", key: "prioritizesSusanna", operator: "===", value: true }, next: { nodeId: "susanna-priority-thought" } }], default: { nodeId: "basilio-voice" } },
    "susanna-priority-thought": { type: "dialogue", id: "susanna-priority-thought", text: "スザンナを一人にしない方がいいと思ったのは正しかった。", presentation: susannaPresentation, next: { nodeId: "basilio-voice" } },
    "basilio-voice": { type: "dialogue", id: "basilio-voice", text: "廊下からバジリオの声がする。『伯爵様はどちらへ？』", presentation: susannaPresentation, next: { nodeId: "count-hides" } },
    "count-hides": { type: "dialogue", id: "count-hides", speakerId: "count", text: "「……バジリオ。ここにいるところを見られるのはまずい。」", presentation: { ...susannaPresentation, characters: [{ characterId: "susanna", expressionId: "worried", position: "left" }, { characterId: "count", expressionId: "surprised", position: "right" }] }, next: { nodeId: "chair-confusion" } },
    "chair-confusion": { type: "dialogue", id: "chair-confusion", text: "伯爵が大きな椅子の後ろへ回ろうとする。そこには、すでにケルビーノがいる。", presentation: susannaPresentation, next: { nodeId: "cherubino-moves" } },
    "cherubino-moves": { type: "dialogue", id: "cherubino-moves", text: "スザンナは慌てて二人の間に入った。伯爵から見えない隙に、ケルビーノはそっと椅子の上へ身を縮める。スザンナは近くの衣服をかけ、彼を隠した。伯爵は椅子の陰へ隠れた。", presentation: susannaPresentation, effects: [{ type: "setFlag", key: "countHiddenFromBasilio", value: true }, { type: "setFlag", key: "cherubinoOverheardCount", value: true }], next: { nodeId: "information-layout" } },
    "information-layout": { type: "dialogue", id: "information-layout", text: "今、この部屋では――\n\n表にいる：スザンナ\n隠れている：伯爵、ケルビーノ\n\nそして二人とも、これからの会話を聞くことができる。\n\n原作では大きな椅子が隠れ場所になるが、舞台によって家具や配置は変わる。それでも、二人が同時に隠れて盗み聞きする構造が重要だ。", presentation: susannaPresentation, next: { nodeId: "basilio-enters" } },
    "basilio-enters": { type: "dialogue", id: "basilio-enters", speakerId: "basilio", text: "「スザンナ、ごきげんよう。伯爵様を見なかったかい？」", presentation: { ...susannaPresentation, characters: [{ characterId: "susanna", expressionId: "neutral", position: "left" }, { characterId: "basilio", expressionId: "smile", position: "right" }] }, next: { nodeId: "susanna-dismisses" } },
    "susanna-dismisses": { type: "dialogue", id: "susanna-dismisses", speakerId: "susanna", text: "「伯爵様が私のところに何の用があるというんです？ それより出ていってください。」", presentation: susannaPresentation, next: { nodeId: "basilio-lingers" } },
    "basilio-lingers": { type: "dialogue", id: "basilio-lingers", speakerId: "basilio", text: "「まあまあ。フィガロも伯爵様を探しているし、少し話をしよう。噂ほど面白いものはないからね」", presentation: { ...susannaPresentation, characters: [{ characterId: "susanna", expressionId: "neutral", position: "left" }, { characterId: "basilio", expressionId: "smile", position: "right" }] }, next: { nodeId: "basilio-role-branch" } },
    "basilio-role-branch": { type: "branch", id: "basilio-role-branch", branches: [{ when: { type: "flag", key: "knowsBasilioRole", operator: "===", value: true }, next: { nodeId: "basilio-role-thought" } }], default: { nodeId: "basilio-gossip" } },
    "basilio-role-thought": { type: "dialogue", id: "basilio-role-thought", text: "スザンナが言っていた“音楽以外も運ぶ男”か。", presentation: susannaPresentation, next: { nodeId: "basilio-gossip" } },
    "basilio-gossip": { type: "dialogue", id: "basilio-gossip", speakerId: "basilio", text: "「伯爵がスザンナを気に入っている話より、ケルビーノの方が面白い。食事の席でも、伯爵夫人をずっと見つめている。誰が見ても分かるくらいにね」", presentation: { ...susannaPresentation, characters: [{ characterId: "susanna", expressionId: "worried", position: "left" }, { characterId: "basilio", expressionId: "smile", position: "right" }] }, effects: [{ type: "setFlag", key: "basilioGossipedAboutCherubino", value: true }, { type: "setFlag", key: "countHeardCherubinoRumor", value: true }], next: { sceneId: "cherubino-discovered", nodeId: "count-emerges" } },
  },
} satisfies Scene
