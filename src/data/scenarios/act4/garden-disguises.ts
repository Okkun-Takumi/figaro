import type { Scene } from "../../../engine/types"

const beforeChange = {
  backgroundId: "garden-night",
  characters: [
    { characterId: "susanna", expressionId: "serious", position: "left" as const },
    { characterId: "countess", expressionId: "neutral", position: "right" as const },
  ],
}
const afterChange = {
  backgroundId: "garden-night",
  characters: [
    { characterId: "susanna", expressionId: "disguise", position: "left" as const },
    { characterId: "countess", expressionId: "disguise", position: "right" as const },
  ],
}

export const gardenDisguises = {
  id: "garden-disguises",
  backgroundId: "garden-night",
  initialNodeId: "garden-entry",
  nodes: {
    "garden-entry": { type: "dialogue", id: "garden-entry", text: "夜の庭に、伯爵夫人とスザンナが現れた。少し離れた木陰では、フィガロが様子をうかがっている。", presentation: beforeChange, next: { nodeId: "plan-reminder" } },
    "plan-reminder": { type: "dialogue", id: "plan-reminder", speakerId: "countess", text: "伯爵はスザンナに会うつもりで来るわ。けれど、その前に立つのは私です。", presentation: beforeChange, next: { nodeId: "susanna-explains" } },
    "susanna-explains": { type: "dialogue", id: "susanna-explains", speakerId: "susanna", text: "私は奥様の服を着ます。奥様は私の服で、伯爵様がどう振る舞うかを確かめるのです。", presentation: beforeChange, next: { nodeId: "costume-change" } },
    "costume-change": { type: "dialogue", id: "costume-change", text: "二人は衣装を交換した。スザンナは伯爵夫人の服を身につけ、伯爵夫人はスザンナの服を着て、夜の庭へ踏み出す。", presentation: afterChange, effects: [{ type: "setFlag", key: "countessDisguisedAsSusanna", value: true }, { type: "setFlag", key: "susannaDisguisedAsCountess", value: true }], next: { nodeId: "swap-callback" } },
    "swap-callback": { type: "branch", id: "swap-callback", branches: [{ when: { type: "flag", key: "anticipatesDisguiseSwap", operator: "===", value: true }, next: { nodeId: "swap-anticipated" } }], default: { nodeId: "resolve-callback" } },
    "swap-anticipated": { type: "dialogue", id: "swap-anticipated", text: "予想されていた衣装交換が、ついに夜の庭で実行された。", presentation: afterChange, next: { nodeId: "resolve-callback" } },
    "resolve-callback": { type: "branch", id: "resolve-callback", branches: [{ when: { type: "flag", key: "understandsCountessResolve", operator: "===", value: true }, next: { nodeId: "countess-resolve" } }], default: { nodeId: "trust-callback" } },
    "countess-resolve": { type: "dialogue", id: "countess-resolve", text: "悲しみを抱えていた伯爵夫人は、今は自ら計画の中心に立っている。", presentation: afterChange, next: { nodeId: "trust-callback" } },
    "trust-callback": { type: "branch", id: "trust-callback", branches: [{ when: { type: "flag", key: "focusesCountessSusannaTrust", operator: "===", value: true }, next: { nodeId: "trust-reminder" } }], default: { nodeId: "disguise-choice" } },
    "trust-reminder": { type: "dialogue", id: "trust-reminder", text: "この大胆な計画は、伯爵夫人とスザンナが互いを信じているからこそ成り立っている。", presentation: afterChange, next: { nodeId: "disguise-choice" } },
    "disguise-choice": { type: "choice", id: "disguise-choice", prompt: "この変装で一番重要なのは？", presentation: afterChange, choices: [
      { id: "count-mistake", text: "伯爵が伯爵夫人をスザンナだと思うこと", effects: [{ type: "setFlag", key: "understandsCountMistakenIdentitySetup", value: true }], next: { nodeId: "count-mistake-reaction" } },
      { id: "figaro-confusion", text: "フィガロも二人の衣装交換を知らないこと", effects: [{ type: "setFlag", key: "anticipatesFigaroDisguiseConfusion", value: true }], next: { nodeId: "figaro-confusion-reaction" } },
      { id: "countess-test", text: "伯爵夫人自身が夫の行動を確かめること", effects: [{ type: "setFlag", key: "understandsCountessTestsCount", value: true }, { type: "changeAffinity", characterId: "countess", amount: 1 }], next: { nodeId: "countess-test-reaction" } },
    ] },
    "count-mistake-reaction": { type: "dialogue", id: "count-mistake-reaction", text: "伯爵が見間違えれば、彼自身の言葉と行動が試されることになる。", presentation: afterChange, next: { nodeId: "disguise-rejoin" } },
    "figaro-confusion-reaction": { type: "dialogue", id: "figaro-confusion-reaction", text: "隠れているフィガロも、衣装の入れ替わりを知らない。誤解はさらに複雑になる。", presentation: afterChange, next: { nodeId: "disguise-rejoin" } },
    "countess-test-reaction": { type: "dialogue", id: "countess-test-reaction", text: "伯爵夫人は、自分の目で夫の本心を確かめようとしている。", presentation: afterChange, next: { nodeId: "disguise-rejoin" } },
    "disguise-rejoin": { type: "dialogue", id: "disguise-rejoin", text: "そのとき、庭の向こうから誰かが近づく気配がした。ケルビーノが、スザンナの服を着た伯爵夫人を見つけようとしている。", presentation: { backgroundId: "garden-night", characters: [{ characterId: "susanna", expressionId: "disguise", position: "left" }, { characterId: "countess", expressionId: "disguise", position: "center" }, { characterId: "cherubino", expressionId: "surprised", position: "right" }] }, next: { sceneId: "susanna-deh-vieni", nodeId: "susanna-enters-garden" } },
  },
} satisfies Scene
