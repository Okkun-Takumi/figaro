import type { Scene } from "../../../engine/types"

const presentation = {
  backgroundId: "manor-hallway",
  characters: [
    { characterId: "figaro", expressionId: "smile", position: "left" as const },
    { characterId: "count", expressionId: "neutral", position: "right" as const },
  ],
}

export const figaroVillagers = {
  id: "figaro-villagers",
  backgroundId: "manor-hallway",
  initialNodeId: "figaro-calls",
  nodes: {
    "figaro-calls": { type: "dialogue", id: "figaro-calls", speakerId: "figaro", text: "「伯爵様！」", presentation, next: { nodeId: "villagers-praise" } },
    "villagers-praise": { type: "dialogue", id: "villagers-praise", text: "花を持った使用人や村人たちが部屋へ入り、声をそろえた。『伯爵様、万歳！』『おめでとうございます！』", presentation, next: { nodeId: "count-asks" } },
    "count-asks": { type: "dialogue", id: "count-asks", speakerId: "count", text: "「……これは何の騒ぎだ？」", presentation, next: { nodeId: "atmosphere-shifts" } },
    "atmosphere-shifts": { type: "dialogue", id: "atmosphere-shifts", text: "さっきまでの張りつめた空気が、一気に祝祭の色へ変わった。フィガロはスザンナへ小声で告げる。『ここからが勝負だ。』", presentation, next: { nodeId: "giovani-title" } },
    "giovani-title": { type: "dialogue", id: "giovani-title", text: "♪ Giovani liete", presentation: { ...presentation, musicId: "giovaniLiete" }, effects: [{ type: "setFlag", key: "figaroPubliclyPressuredCount", value: true }, { type: "setFlag", key: "understandsFigaroPublicStrategy", value: true }], next: { nodeId: "figaro-praises" } },
    "figaro-praises": { type: "dialogue", id: "figaro-praises", speakerId: "figaro", text: "「伯爵様があの不公平な権利を廃止されたおかげで、俺たちは今日、安心して結婚できます。」", presentation, next: { nodeId: "count-denies-right" } },
    "count-denies-right": { type: "dialogue", id: "count-denies-right", speakerId: "count", text: "「その権利はもう存在しない。」", presentation, next: { nodeId: "figaro-thanks" } },
    "figaro-thanks": { type: "dialogue", id: "figaro-thanks", speakerId: "figaro", text: "「だからこそ皆、伯爵様に感謝しているんです。」", presentation, next: { nodeId: "villagers-repeat" } },
    "villagers-repeat": { type: "dialogue", id: "villagers-repeat", text: "『伯爵様、万歳！』スザンナは伯爵を見る。伯爵に断りづらい形で、本人の“立派さ”を確認させている。", presentation, next: { nodeId: "strategy-branch" } },
    "strategy-branch": { type: "branch", id: "strategy-branch", branches: [{ when: { type: "flag", key: "understandsFigaroStrategy", operator: "===", value: true }, next: { nodeId: "strategy-thought" } }], default: { nodeId: "hypocrisy-branch" } },
    "strategy-thought": { type: "dialogue", id: "strategy-thought", text: "これがフィガロの言っていた“知恵で戦う”ってことか。", presentation, next: { nodeId: "hypocrisy-branch" } },
    "hypocrisy-branch": { type: "branch", id: "hypocrisy-branch", branches: [{ when: { type: "flag", key: "noticedCountHypocrisy", operator: "===", value: true }, next: { nodeId: "hypocrisy-thought" } }], default: { nodeId: "right-branch" } },
    "hypocrisy-thought": { type: "dialogue", id: "hypocrisy-thought", text: "さっきスザンナを口説いていた本人が、今度は皆の前で立派な主人を演じることになる。", presentation, next: { nodeId: "right-branch" } },
    "right-branch": { type: "branch", id: "right-branch", branches: [{ when: { type: "flag", key: "knowsDroitDuSeigneur", operator: "===", value: true }, next: { nodeId: "right-thought" } }], default: { nodeId: "public-choice" } },
    "right-thought": { type: "dialogue", id: "right-thought", text: "自分で廃止した権利だ。ここで否定するわけにはいかない。", presentation, next: { nodeId: "public-choice" } },
    "public-choice": {
      type: "choice", id: "public-choice", prompt: "フィガロの手際をどう見る？", presentation,
      choices: [
        { id: "admire-figaro", text: "フィガロ、うまいな", effects: [{ type: "setFlag", key: "admiresFigaroStrategy", value: true }, { type: "changeAffinity", characterId: "figaro", amount: 1 }], next: { nodeId: "admire-reaction" } },
        { id: "count-cornered", text: "伯爵は相当困ってそうだ", effects: [{ type: "setFlag", key: "noticedCountCornered", value: true }], next: { nodeId: "cornered-reaction" } },
        { id: "expect-countermove", text: "でも、これだけで諦めるかな？", effects: [{ type: "setFlag", key: "expectsCountCountermove", value: true }], next: { nodeId: "countermove-reaction" } },
      ],
    },
    "admire-reaction": { type: "dialogue", id: "admire-reaction", speakerId: "figaro", text: "「褒め言葉はあとで受け取るよ。今はまだ、伯爵の返事を聞こう」", presentation, next: { nodeId: "public-rejoin" } },
    "cornered-reaction": { type: "dialogue", id: "cornered-reaction", text: "伯爵の笑顔は崩れない。けれど、逃げ道を探しているのは明らかだった。", presentation, next: { nodeId: "public-rejoin" } },
    "countermove-reaction": { type: "dialogue", id: "countermove-reaction", text: "伯爵は黙ってはいないだろう。フィガロもそれを承知で、この場を作ったはずだ。", presentation, next: { nodeId: "public-rejoin" } },
    "public-rejoin": { type: "dialogue", id: "public-rejoin", speakerId: "count", text: "「もちろん祝福しよう。ただし結婚式は今すぐではなく、少し後にしよう。もっと立派な式にして、皆の前できちんと祝いたい。」", presentation, effects: [{ type: "setFlag", key: "countDelayedWedding", value: true }], next: { nodeId: "contract-branch" } },
    "contract-branch": { type: "branch", id: "contract-branch", branches: [{ when: { type: "flag", key: "knowsFigaroDebtContract", operator: "===", value: true }, next: { nodeId: "contract-thought" } }], default: { nodeId: "countermove-summary" } },
    "contract-thought": { type: "dialogue", id: "contract-thought", text: "まさか、マルチェリーナの契約を利用するつもりか？", presentation, next: { nodeId: "countermove-summary" } },
    "countermove-summary": { type: "dialogue", id: "countermove-summary", text: "フィガロの作戦は半分成功した。伯爵は皆の前で古い特権を復活させるとは言えない。しかし伯爵も、結婚式を延期し、別の手を探す時間を作った。", presentation, effects: [{ type: "setFlag", key: "understandsCountCountermove", value: true }], next: { sceneId: "cherubino-army", nodeId: "villagers-leave" } },
  },
} satisfies Scene
