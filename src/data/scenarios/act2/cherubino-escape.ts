import type { Scene } from "../../../engine/types"

const worriedPresentation = {
  backgroundId: "countess-bedroom",
  characters: [
    { characterId: "susanna", expressionId: "worried", position: "left" as const },
    { characterId: "cherubino", expressionId: "disguised-worried", position: "right" as const },
  ],
}

const susannaAlonePresentation = {
  backgroundId: "countess-bedroom",
  characters: [{ characterId: "susanna", expressionId: "serious", position: "center" as const }],
}

const emptyBedroomPresentation = { backgroundId: "countess-bedroom" }

export const cherubinoEscape = {
  id: "cherubino-escape",
  backgroundId: "countess-bedroom",
  initialNodeId: "susanna-opens-closet",
  nodes: {
    "susanna-opens-closet": {
      type: "dialogue",
      id: "susanna-opens-closet",
      text: "伯爵と伯爵夫人が工具を取りに出た直後、スザンナは小部屋の扉をそっと開けた。",
      presentation: susannaAlonePresentation,
      next: { nodeId: "cherubino-emerges" },
    },
    "cherubino-emerges": {
      type: "dialogue",
      id: "cherubino-emerges",
      speakerId: "cherubino",
      text: "もう戻ってくる？　ここにいたら、伯爵夫人まで困らせてしまう。",
      presentation: worriedPresentation,
      effects: [{ type: "setFlag", key: "cherubinoHiddenInCloset", value: false }],
      next: { nodeId: "aprite-presto" },
    },
    "aprite-presto": {
      type: "dialogue",
      id: "aprite-presto",
      text: "♪ Aprite, presto, aprite!",
      presentation: { ...worriedPresentation, musicId: "apritePrestoAprite" },
      next: { nodeId: "escape-options" },
    },
    "escape-options": {
      type: "dialogue",
      id: "escape-options",
      speakerId: "susanna",
      text: "急いで。伯爵様が戻る前に、ここから出なければならないわ。",
      presentation: worriedPresentation,
      next: { nodeId: "doors-unavailable" },
    },
    "doors-unavailable": {
      type: "dialogue",
      id: "doors-unavailable",
      text: "けれど廊下へ出れば、伯爵と鉢合わせになる。部屋の扉も、いつもの出口も使えない。",
      presentation: worriedPresentation,
      next: { nodeId: "window-only" },
    },
    "window-only": {
      type: "dialogue",
      id: "window-only",
      speakerId: "susanna",
      text: "残るのは、庭に面したあの窓だけ……。危ないけれど、ほかに道はないわ。",
      presentation: worriedPresentation,
      next: { nodeId: "cherubino-decides-jump" },
    },
    "cherubino-decides-jump": {
      type: "dialogue",
      id: "cherubino-decides-jump",
      speakerId: "cherubino",
      text: "伯爵夫人をこれ以上巻き込めない。僕が行くよ。庭なら、下まで降りられるはずだ。",
      presentation: worriedPresentation,
      next: { nodeId: "countess-tenderness-branch" },
    },
    "countess-tenderness-branch": {
      type: "branch",
      id: "countess-tenderness-branch",
      branches: [
        {
          when: { type: "flag", key: "noticedCountessTendernessToCherubino", operator: "===", value: true },
          next: { nodeId: "countess-tenderness-thought" },
        },
      ],
      default: { nodeId: "cherubino-sympathy-branch" },
    },
    "countess-tenderness-thought": {
      type: "dialogue",
      id: "countess-tenderness-thought",
      text: "伯爵夫人の気遣いを見ていたからこそ、ケルビーノも彼女を危険に巻き込みたくないのだと伝わってくる。",
      presentation: worriedPresentation,
      next: { nodeId: "cherubino-sympathy-branch" },
    },
    "cherubino-sympathy-branch": {
      type: "branch",
      id: "cherubino-sympathy-branch",
      branches: [
        {
          when: { type: "flag", key: "sympathizesWithCherubino", operator: "===", value: true },
          next: { nodeId: "cherubino-sympathy-thought" },
        },
      ],
      default: { nodeId: "susanna-position-branch" },
    },
    "cherubino-sympathy-thought": {
      type: "dialogue",
      id: "cherubino-sympathy-thought",
      text: "軍隊送りになったうえ、今度は窓から逃げる羽目になる。ケルビーノの騒動は、ますます大きくなっていく。",
      presentation: worriedPresentation,
      next: { nodeId: "susanna-position-branch" },
    },
    "susanna-position-branch": {
      type: "branch",
      id: "susanna-position-branch",
      branches: [
        {
          when: { type: "flag", key: "tracksSusannaPosition", operator: "===", value: true },
          next: { nodeId: "susanna-position-thought" },
        },
      ],
      default: { nodeId: "escape-choice" },
    },
    "susanna-position-thought": {
      type: "dialogue",
      id: "susanna-position-thought",
      text: "本物のスザンナが部屋に残っていたからこそ、小部屋を開け、ケルビーノを逃がすことができる。",
      presentation: worriedPresentation,
      next: { nodeId: "escape-choice" },
    },
    "escape-choice": {
      type: "choice",
      id: "escape-choice",
      prompt: "ケルビーノの決断を見て、どう感じた？",
      presentation: worriedPresentation,
      choices: [
        {
          id: "jump-is-only-way",
          text: "もう飛び降りるしかない",
          effects: [{ type: "setFlag", key: "understandsCherubinoEscapeRisk", value: true }],
          next: { nodeId: "jump-is-only-way-reaction" },
        },
        {
          id: "protects-countess",
          text: "伯爵夫人を巻き込まないために逃げるんだ",
          effects: [{ type: "setFlag", key: "noticedCherubinoProtectsCountess", value: true }, { type: "changeAffinity", characterId: "cherubino", amount: 1 }],
          next: { nodeId: "protects-countess-reaction" },
        },
        {
          id: "susanna-next-step",
          text: "スザンナが次に何をするかが重要そう",
          effects: [{ type: "setFlag", key: "anticipatesSusannaSubstitution", value: true }],
          next: { nodeId: "susanna-next-step-reaction" },
        },
      ],
    },
    "jump-is-only-way-reaction": {
      type: "dialogue",
      id: "jump-is-only-way-reaction",
      text: "危険でも、伯爵が戻るまでのわずかな時間には、ほかの逃げ道がない。",
      presentation: worriedPresentation,
      next: { nodeId: "rejoin" },
    },
    "protects-countess-reaction": {
      type: "dialogue",
      id: "protects-countess-reaction",
      text: "ケルビーノは自分の身だけでなく、伯爵夫人が受ける危険も考えている。",
      presentation: worriedPresentation,
      next: { nodeId: "rejoin" },
    },
    "susanna-next-step-reaction": {
      type: "dialogue",
      id: "susanna-next-step-reaction",
      text: "逃げるだけでは足りない。小部屋を開けられたとき、誰がそこにいるのかも問題になる。",
      presentation: worriedPresentation,
      next: { nodeId: "rejoin" },
    },
    rejoin: {
      type: "dialogue",
      id: "rejoin",
      text: "ケルビーノは窓辺へ向かった。スザンナは庭を見下ろし、息をのんだ。",
      presentation: worriedPresentation,
      next: { nodeId: "cherubino-jumps" },
    },
    "cherubino-jumps": {
      type: "dialogue",
      id: "cherubino-jumps",
      text: "ケルビーノは庭へ向けて窓から飛び降りた。無事を確かめる余裕もなく、その姿は窓の下へ消えた。",
      presentation: susannaAlonePresentation,
      effects: [{ type: "setFlag", key: "cherubinoEscapedThroughWindow", value: true }],
      next: { nodeId: "susanna-checks-window" },
    },
    "susanna-checks-window": {
      type: "dialogue",
      id: "susanna-checks-window",
      speakerId: "susanna",
      text: "大丈夫……？　お願いだから、けがをしていないで。",
      presentation: susannaAlonePresentation,
      next: { nodeId: "closet-empty" },
    },
    "closet-empty": {
      type: "dialogue",
      id: "closet-empty",
      text: "しかし、小部屋は空になってしまった。伯爵が扉を開ければ、伯爵夫人の説明が嘘だったと分かってしまう。",
      presentation: susannaAlonePresentation,
      next: { nodeId: "susanna-decides-substitute" },
    },
    "susanna-decides-substitute": {
      type: "dialogue",
      id: "susanna-decides-substitute",
      speakerId: "susanna",
      text: "だったら、今度は私が中に入る。伯爵様が開けたとき、言ったとおりスザンナがいればいいのよ。",
      presentation: susannaAlonePresentation,
      next: { nodeId: "susanna-enters-closet" },
    },
    "susanna-enters-closet": {
      type: "dialogue",
      id: "susanna-enters-closet",
      text: "スザンナは小部屋へ入り、扉を閉めた。これで中にいるのは、本当にスザンナだ。",
      presentation: emptyBedroomPresentation,
      effects: [{ type: "setFlag", key: "susannaReplacedCherubinoInCloset", value: true }],
      next: { nodeId: "situation-summary" },
    },
    "situation-summary": {
      type: "dialogue",
      id: "situation-summary",
      text: "現在――ケルビーノは窓から庭へ逃げた。小部屋にはスザンナが隠れている。伯爵は「スザンナではない誰か」がいると疑い、伯爵夫人はまだ中にケルビーノがいると思っている。二人とも、今いるのが本物のスザンナだとは知らない。",
      presentation: emptyBedroomPresentation,
      next: { nodeId: "count-returning" },
    },
    "count-returning": {
      type: "dialogue",
      id: "count-returning",
      text: "廊下から、伯爵と伯爵夫人の足音が近づいてくる。小部屋の中で、スザンナは静かに待った。",
      presentation: emptyBedroomPresentation,
      next: { nodeId: "a2-07-pending" },
    },
    "a2-07-pending": {
      type: "dialogue",
      id: "a2-07-pending",
      presentation: emptyBedroomPresentation,
      text: "扉の鍵が回る音がした。",
      next: { sceneId: "act2-finale", nodeId: "count-returns" },
    },
  },
} satisfies Scene
