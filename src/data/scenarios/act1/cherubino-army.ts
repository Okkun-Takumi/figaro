import type { Scene } from "../../../engine/types"

const presentation = {
  backgroundId: "manor-hallway",
  characters: [
    { characterId: "cherubino", expressionId: "neutral", position: "left" as const },
    { characterId: "count", expressionId: "neutral", position: "right" as const },
  ],
}

export const cherubinoArmy = {
  id: "cherubino-army",
  initialNodeId: "villagers-leave",
  nodes: {
    "villagers-leave": { type: "dialogue", id: "villagers-leave", text: "村人たちが去ると、フィガロはケルビーノがすっかり落ち込んでいることに気づいた。", presentation, next: { nodeId: "figaro-asks" } },
    "figaro-asks": { type: "dialogue", id: "figaro-asks", speakerId: "figaro", text: "「どうした、ケルビーノ。」", presentation: { ...presentation, characters: [{ characterId: "figaro", expressionId: "neutral", position: "left" }, { characterId: "cherubino", expressionId: "neutral", position: "right" }] }, next: { nodeId: "susanna-explains" } },
    "susanna-explains": { type: "dialogue", id: "susanna-explains", speakerId: "susanna", text: "「伯爵様に館を追い出されるのよ。」", presentation: { ...presentation, characters: [{ characterId: "susanna", expressionId: "concerned", position: "left" }, { characterId: "cherubino", expressionId: "neutral", position: "right" }] }, next: { nodeId: "figaro-surprised" } },
    "figaro-surprised": { type: "dialogue", id: "figaro-surprised", speakerId: "figaro", text: "「今日みたいなめでたい日に？」", presentation, next: { nodeId: "cherubino-pleads" } },
    "cherubino-pleads": { type: "dialogue", id: "cherubino-pleads", speakerId: "cherubino", text: "「伯爵様……お許しください。」", presentation, next: { nodeId: "count-rebukes" } },
    "count-rebukes": { type: "dialogue", id: "count-rebukes", speakerId: "count", text: "「お前は許されるようなことをしたか？」", presentation, next: { nodeId: "susanna-defends" } },
    "susanna-defends": { type: "dialogue", id: "susanna-defends", speakerId: "susanna", text: "「まだ子どもです。」", presentation, next: { nodeId: "count-wary" } },
    "count-wary": { type: "dialogue", id: "count-wary", speakerId: "count", text: "「君が思っているほど子どもでもない。」伯爵の声には、叱責だけでなく警戒も混じっていた。", presentation, next: { nodeId: "count-forgives" } },
    "count-forgives": { type: "dialogue", id: "count-forgives", speakerId: "count", text: "「……いいだろう。許そう。それどころか、もっと良い話がある。」", presentation, next: { nodeId: "count-promotes" } },
    "count-promotes": { type: "dialogue", id: "count-promotes", speakerId: "count", text: "「私の連隊で士官の席が一つ空いている。お前をそこへ任命しよう。」", presentation, next: { nodeId: "cherubino-confused" } },
    "cherubino-confused": { type: "dialogue", id: "cherubino-confused", speakerId: "cherubino", text: "「……え？」", presentation, next: { nodeId: "count-orders" } },
    "count-orders": { type: "dialogue", id: "count-orders", speakerId: "count", text: "「すぐに出発しろ。」表面上は昇進と名誉だが、実際にはケルビーノを館から遠ざける措置だった。", presentation, next: { nodeId: "overheard-branch" } },
    "overheard-branch": { type: "branch", id: "overheard-branch", branches: [{ when: { type: "flag", key: "countRealizesCherubinoOverheard", operator: "===", value: true }, next: { nodeId: "overheard-thought" } }], default: { nodeId: "jealousy-branch" } },
    "overheard-thought": { type: "dialogue", id: "overheard-thought", text: "許したんじゃない。自分の秘密を聞いたケルビーノを、館から遠ざけるつもりなんだ。", presentation, next: { nodeId: "jealousy-branch" } },
    "jealousy-branch": { type: "branch", id: "jealousy-branch", branches: [{ when: { type: "flag", key: "noticedCountJealousy", operator: "===", value: true }, next: { nodeId: "jealousy-thought" } }], default: { nodeId: "army-choice" } },
    "jealousy-thought": { type: "dialogue", id: "jealousy-thought", text: "伯爵夫人のそばにも置いておきたくない、ということか。", presentation, next: { nodeId: "army-choice" } },
    "army-choice": {
      type: "choice", id: "army-choice", prompt: "伯爵の“許し”をどう受け取る？", presentation,
      choices: [
        { id: "question-promotion", text: "これ、本当に褒美なのか？", effects: [{ type: "setFlag", key: "questionsCherubinoPromotion", value: true }], next: { nodeId: "question-promotion-reaction" } },
        { id: "understand-removal", text: "伯爵にとって都合が良すぎる", effects: [{ type: "setFlag", key: "understandsCherubinoRemoval", value: true }], next: { nodeId: "understand-removal-reaction" } },
        { id: "sympathize", text: "ケルビーノ、かわいそうだな", effects: [{ type: "changeAffinity", characterId: "cherubino", amount: 1 }, { type: "setFlag", key: "sympathizesWithCherubino", value: true }], next: { nodeId: "sympathize-reaction" } },
      ],
    },
    "question-promotion-reaction": { type: "dialogue", id: "question-promotion-reaction", text: "名誉ある任命に見えるほど、断る余地は小さくなる。", presentation, next: { nodeId: "army-choice-rejoin" } },
    "understand-removal-reaction": { type: "dialogue", id: "understand-removal-reaction", text: "伯爵にとって、ケルビーノが遠くへ行くことはあまりに都合がよかった。", presentation, next: { nodeId: "army-choice-rejoin" } },
    "sympathize-reaction": { type: "dialogue", id: "sympathize-reaction", speakerId: "cherubino", text: "「ありがとう。でも、行くしかないみたいだ。」", presentation, next: { nodeId: "army-choice-rejoin" } },
    "army-choice-rejoin": { type: "dialogue", id: "army-choice-rejoin", speakerId: "figaro", text: "「せめて明日まで待てませんか。」", presentation, next: { nodeId: "susanna-asks-delay" } },
    "susanna-asks-delay": { type: "dialogue", id: "susanna-asks-delay", speakerId: "susanna", text: "「そうです。今日だけでも館にいさせてください。」", presentation, next: { nodeId: "count-refuses-delay" } },
    "count-refuses-delay": { type: "dialogue", id: "count-refuses-delay", speakerId: "count", text: "「だめだ。すぐに出発しろ。」", presentation, effects: [{ type: "setFlag", key: "cherubinoSentToArmy", value: true }], next: { nodeId: "cherubino-accepts" } },
    "cherubino-accepts": { type: "dialogue", id: "cherubino-accepts", speakerId: "cherubino", text: "「……分かりました。」", presentation, next: { nodeId: "figaro-comforts" } },
    "figaro-comforts": { type: "dialogue", id: "figaro-comforts", speakerId: "figaro", text: "「おいおい。そんな顔をするなよ、少尉殿。」", presentation: { ...presentation, characters: [{ characterId: "figaro", expressionId: "smile", position: "left" }, { characterId: "cherubino", expressionId: "neutral", position: "right" }] }, next: { nodeId: "figaro-teases" } },
    "figaro-teases": { type: "dialogue", id: "figaro-teases", speakerId: "figaro", text: "「今までみたいに、女の子の周りをひらひら飛び回る生活とはお別れだな。きれいな服も帽子も、恋のため息も終わり。」", presentation, next: { nodeId: "figaro-march" } },
    "figaro-march": { type: "dialogue", id: "figaro-march", speakerId: "figaro", text: "「これからは軍服。肩には銃、横には剣。泥の中を行進だ。」", presentation, next: { nodeId: "player-asks-comfort" } },
    "player-asks-comfort": { type: "dialogue", id: "player-asks-comfort", text: "慰めてるのか、それ……？", presentation, next: { nodeId: "figaro-insists" } },
    "figaro-insists": { type: "dialogue", id: "figaro-insists", speakerId: "figaro", text: "「もちろん。」", presentation, next: { nodeId: "susanna-calls-out" } },
    "susanna-calls-out": { type: "dialogue", id: "susanna-calls-out", speakerId: "susanna", text: "「絶対楽しんでるでしょ。」", presentation, next: { nodeId: "non-piu-title" } },
    "non-piu-title": { type: "dialogue", id: "non-piu-title", text: "♪ Non più andrai", presentation, next: { nodeId: "non-piu-explanation" } },
    "non-piu-explanation": { type: "dialogue", id: "non-piu-explanation", text: "歌う人物：フィガロ。軍隊へ送られるケルビーノをからかうアリア。今までのように女性たちの周囲を飛び回り、おしゃれをして恋に夢中になる生活は終わる。", presentation, next: { nodeId: "non-piu-point" } },
    "non-piu-point": { type: "dialogue", id: "non-piu-point", text: "【観劇ポイント】これから待つのは軍服、行進、泥、武器、軍隊生活。フィガロはわざと大げさに新生活を描いている。音楽も軍隊の行進を思わせるようになっていく。", presentation, next: { nodeId: "non-piu-summary" } },
    "non-piu-summary": { type: "dialogue", id: "non-piu-summary", text: "ACT 1でこの曲が始まったら、「ケルビーノが館を追い出され、フィガロが軍隊生活を茶化している」と分かればOK。", presentation, next: { nodeId: "act1-summary" } },
    "act1-summary": { type: "dialogue", id: "act1-summary", text: "ACT 1 COMPLETE\n\n結婚式の朝。フィガロとスザンナは伯爵の企みを知った。フィガロは伯爵を公衆の前で追い込んだが、結婚式は延期された。マルチェリーナの契約も残っている。そしてケルビーノは、突然軍隊へ送られることになった。結婚式まではまだ遠い。", presentation, next: { nodeId: "act1-complete" } },
    "act1-complete": { type: "end", id: "act1-complete" },
  },
} satisfies Scene
