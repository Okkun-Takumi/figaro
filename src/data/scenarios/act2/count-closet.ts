import type { Scene } from "../../../engine/types"

const countessCherubinoPresentation = {
  backgroundId: "countess-bedroom",
  characters: [
    { characterId: "countess", expressionId: "surprised", position: "left" as const },
    { characterId: "cherubino", expressionId: "disguised-worried", position: "right" as const },
  ],
}

const countCountessPresentation = {
  backgroundId: "countess-bedroom",
  characters: [
    { characterId: "count", expressionId: "neutral", position: "left" as const },
    { characterId: "countess", expressionId: "surprised", position: "right" as const },
  ],
}

const tenseTrioPresentation = {
  backgroundId: "countess-bedroom",
  characters: [
    { characterId: "count", expressionId: "angry", position: "left" as const },
    { characterId: "countess", expressionId: "surprised", position: "center" as const },
    { characterId: "susanna", expressionId: "worried", position: "right" as const },
  ],
}

const susannaAlonePresentation = {
  backgroundId: "countess-bedroom",
  characters: [{ characterId: "susanna", expressionId: "serious", position: "center" as const }],
}

export const countCloset = {
  id: "count-closet",
  backgroundId: "countess-bedroom",
  initialNodeId: "count-arrives",
  nodes: {
    "count-arrives": {
      type: "dialogue",
      id: "count-arrives",
      text: "扉の前で伯爵の声がした。伯爵夫人とケルビーノは顔を見合わせる。",
      presentation: countessCherubinoPresentation,
      next: { nodeId: "cherubino-panics" },
    },
    "cherubino-panics": {
      type: "dialogue",
      id: "cherubino-panics",
      speakerId: "cherubino",
      text: "伯爵様だ！　この格好を見られたら、今度こそ終わりだ。",
      presentation: countessCherubinoPresentation,
      next: { nodeId: "cherubino-hides" },
    },
    "cherubino-hides": {
      type: "dialogue",
      id: "cherubino-hides",
      text: "逃げ場を探したケルビーノは、伯爵夫人の寝室に続く小部屋へ滑り込んだ。女装したまま、扉の向こうに身を潜める。",
      presentation: {
        ...countessCherubinoPresentation,
        characters: [
          { characterId: "countess", expressionId: "surprised", position: "left" },
          { characterId: "susanna", expressionId: "worried", position: "right" },
        ],
      },
      effects: [{ type: "setFlag", key: "cherubinoHiddenInCloset", value: true }],
      next: { nodeId: "count-enters" },
    },
    "count-enters": {
      type: "dialogue",
      id: "count-enters",
      speakerId: "count",
      text: "ロジーナ、入るぞ。……ずいぶん慌てた様子だな。",
      presentation: countCountessPresentation,
      next: { nodeId: "count-shows-letter" },
    },
    "count-shows-letter": {
      type: "dialogue",
      id: "count-shows-letter",
      speakerId: "count",
      text: "こんな手紙を受け取った。おまえが今夜、庭で別の男と会うというのは本当か？",
      presentation: countCountessPresentation,
      next: { nodeId: "anonymous-letter-callback" },
    },
    "anonymous-letter-callback": {
      type: "branch",
      id: "anonymous-letter-callback",
      branches: [
        {
          when: { type: "flag", key: "knowsAnonymousJealousyPlan", operator: "===", value: true },
          next: { nodeId: "anonymous-letter-thought" },
        },
      ],
      default: { nodeId: "count-hypocrisy-branch" },
    },
    "anonymous-letter-thought": {
      type: "dialogue",
      id: "anonymous-letter-thought",
      text: "フィガロが仕掛けた匿名の手紙――その狙いどおり、伯爵の嫉妬に火がついている。",
      presentation: countCountessPresentation,
      next: { nodeId: "count-hypocrisy-branch" },
    },
    "count-hypocrisy-branch": {
      type: "branch",
      id: "count-hypocrisy-branch",
      branches: [
        {
          when: { type: "flag", key: "noticedCountHypocrisy", operator: "===", value: true },
          next: { nodeId: "count-hypocrisy-thought" },
        },
      ],
      default: { nodeId: "countess-pain-branch" },
    },
    "count-hypocrisy-thought": {
      type: "dialogue",
      id: "count-hypocrisy-thought",
      text: "自分はスザンナへ迫っていた伯爵が、今は妻を疑っている。その二重基準が、ここではいっそう露わだ。",
      presentation: countCountessPresentation,
      next: { nodeId: "countess-pain-branch" },
    },
    "countess-pain-branch": {
      type: "branch",
      id: "countess-pain-branch",
      branches: [
        {
          when: { type: "flag", key: "understandsCountessPain", operator: "===", value: true },
          next: { nodeId: "countess-pain-thought" },
        },
      ],
      default: { nodeId: "closet-noise" },
    },
    "countess-pain-thought": {
      type: "dialogue",
      id: "countess-pain-thought",
      text: "夫の愛を願っていた伯爵夫人が、今度はその夫から疑いを向けられている。表情が強張るのも無理はない。",
      presentation: countCountessPresentation,
      next: { nodeId: "closet-noise" },
    },
    "closet-noise": {
      type: "dialogue",
      id: "closet-noise",
      text: "そのとき、小部屋の奥で何かがぶつかる小さな音がした。中のケルビーノが、思わず身じろぎしたのだ。",
      presentation: countCountessPresentation,
      next: { nodeId: "count-suspicious" },
    },
    "count-suspicious": {
      type: "dialogue",
      id: "count-suspicious",
      speakerId: "count",
      text: "今の音は何だ？　あの小部屋に、誰かいるのか。",
      presentation: { ...countCountessPresentation, characters: [{ characterId: "count", expressionId: "surprised", position: "left" }, { characterId: "countess", expressionId: "surprised", position: "right" }] },
      next: { nodeId: "countess-claims-susanna" },
    },
    "countess-claims-susanna": {
      type: "dialogue",
      id: "countess-claims-susanna",
      speakerId: "countess",
      text: "……スザンナです。着替えをしているから、今は開けられません。",
      presentation: countCountessPresentation,
      next: { nodeId: "susanna-secretly-returns" },
    },
    "susanna-secretly-returns": {
      type: "dialogue",
      id: "susanna-secretly-returns",
      text: "本物のスザンナが、伯爵の目に入らない場所から戻ってきた。会話を聞き、伯爵夫人が自分の名で小部屋を守ろうとしていると理解する。",
      presentation: tenseTrioPresentation,
      next: { nodeId: "situation-summary" },
    },
    "situation-summary": {
      type: "dialogue",
      id: "situation-summary",
      text: "現在――伯爵は小部屋に誰かがいると疑っている。伯爵夫人は「中はスザンナ」と説明しているが、本当は女装したケルビーノが隠れている。本物のスザンナは、伯爵に見つからない位置から状況を見ている。",
      presentation: tenseTrioPresentation,
      next: { nodeId: "susanna-or-via-sortite" },
    },
    "susanna-or-via-sortite": {
      type: "dialogue",
      id: "susanna-or-via-sortite",
      text: "♪ Susanna, or via sortite",
      presentation: { ...tenseTrioPresentation, musicId: "susannaOrViaSortite" },
      next: { nodeId: "closet-choice" },
    },
    "closet-choice": {
      type: "choice",
      id: "closet-choice",
      prompt: "この状況で一番気になったのは？",
      presentation: tenseTrioPresentation,
      choices: [
        {
          id: "count-double-standard",
          text: "伯爵、自分はスザンナを口説いているのに……",
          effects: [{ type: "setFlag", key: "noticedCountDoubleStandardAct2", value: true }],
          next: { nodeId: "count-double-standard-reaction" },
        },
        {
          id: "countess-under-pressure",
          text: "伯爵夫人、かなり追い詰められている",
          effects: [{ type: "setFlag", key: "sympathizesCountessUnderPressure", value: true }, { type: "changeAffinity", characterId: "countess", amount: 1 }],
          next: { nodeId: "countess-under-pressure-reaction" },
        },
        {
          id: "susanna-position",
          text: "本物のスザンナが戻ってきた。これが鍵になりそう",
          effects: [{ type: "setFlag", key: "tracksSusannaPosition", value: true }],
          next: { nodeId: "susanna-position-reaction" },
        },
      ],
    },
    "count-double-standard-reaction": {
      type: "dialogue",
      id: "count-double-standard-reaction",
      text: "伯爵の疑いはもっともらしく聞こえるが、自分の振る舞いを思えば身勝手にも映る。",
      presentation: tenseTrioPresentation,
      next: { nodeId: "rejoin" },
    },
    "countess-under-pressure-reaction": {
      type: "dialogue",
      id: "countess-under-pressure-reaction",
      text: "伯爵夫人は、ケルビーノを守るためにとっさの嘘を重ねながら、夫の疑念にも耐えている。",
      presentation: tenseTrioPresentation,
      next: { nodeId: "rejoin" },
    },
    "susanna-position-reaction": {
      type: "dialogue",
      id: "susanna-position-reaction",
      text: "伯爵が知らない本物のスザンナの帰還が、この行き詰まった状況を動かす手がかりになりそうだ。",
      presentation: tenseTrioPresentation,
      next: { nodeId: "rejoin" },
    },
    rejoin: {
      type: "dialogue",
      id: "rejoin",
      text: "伯爵夫人の説明と、伯爵が信じている状況には大きなずれがある。スザンナは、それを利用する機会をうかがった。",
      presentation: tenseTrioPresentation,
      next: { nodeId: "count-demands-open" },
    },
    "count-demands-open": {
      type: "dialogue",
      id: "count-demands-open",
      speakerId: "count",
      text: "ならば開けてもらおう。誰が中にいるのか、私の目で確かめる。",
      presentation: tenseTrioPresentation,
      next: { nodeId: "count-decides-tools" },
    },
    "count-decides-tools": {
      type: "dialogue",
      id: "count-decides-tools",
      speakerId: "count",
      text: "扉を壊して、おまえの部屋を傷つけるつもりはない。工具を取ってくる。だが、おまえも一緒に来てもらう。",
      presentation: tenseTrioPresentation,
      next: { nodeId: "count-takes-countess" },
    },
    "count-takes-countess": {
      type: "dialogue",
      id: "count-takes-countess",
      text: "伯爵は伯爵夫人を連れ、工具を取りに部屋を出た。伯爵が戻るまで、部屋にはスザンナと、小部屋の中のケルビーノだけが残される。",
      presentation: susannaAlonePresentation,
      next: { nodeId: "a2-06-pending" },
    },
    "a2-06-pending": {
      type: "dialogue",
      id: "a2-06-pending",
      presentation: susannaAlonePresentation,
      text: "スザンナは小部屋の扉を見つめ、すぐに動き出した。",
      next: { sceneId: "cherubino-escape", nodeId: "susanna-opens-closet" },
    },
  },
} satisfies Scene
