import type { Scene } from "../../../engine/types"

const presentation = {
  backgroundId: "manor-hallway",
  characters: [
    { characterId: "marcellina", expressionId: "neutral", position: "left" as const },
    { characterId: "bartolo", expressionId: "neutral", position: "right" as const },
  ],
}

export const marcellinaBartolo = {
  id: "marcellina-bartolo",
  backgroundId: "manor-hallway",
  initialNodeId: "contract-entry",
  nodes: {
    "contract-entry": { type: "dialogue", id: "contract-entry", text: "フィガロがその場を離れたあと、館の廊下では別の二人が密やかに話していた。", presentation, next: { nodeId: "contract-paper" } },
    "contract-paper": { type: "dialogue", id: "contract-paper", speakerId: "marcellina", text: "「これが契約書よ。フィガロは以前、私から金を借りた。返せなければ、私と結婚するという約束でね」", presentation, effects: [{ type: "setFlag", key: "knowsFigaroDebtContract", value: true }], next: { nodeId: "marcellina-plan" } },
    "marcellina-plan": { type: "dialogue", id: "marcellina-plan", speakerId: "marcellina", text: "「スザンナとの結婚など、そう簡単にはさせないわ」", presentation, effects: [{ type: "setFlag", key: "knowsMarcellinaWantsMarriage", value: true }], next: { nodeId: "player-question" } },
    "player-question": { type: "dialogue", id: "player-question", text: "どうしてバルトロまで、この企みに加わっているのだろう。", presentation, next: { nodeId: "bartolo-grudge" } },
    "bartolo-grudge": { type: "dialogue", id: "bartolo-grudge", speakerId: "bartolo", text: "「あの男には、昔から借りがある。伯爵とロジーナ様の一件で、私の計画を台無しにした男だ」", presentation, effects: [{ type: "setFlag", key: "knowsBartoloGrudge", value: true }, { type: "setFlag", key: "knowsCountessWasRosina", value: true }], next: { nodeId: "bartolo-context" } },
    "bartolo-context": { type: "dialogue", id: "bartolo-context", text: "ロジーナは、いまの伯爵夫人の旧名だ。かつて伯爵と彼女の結婚を助けたフィガロを、バルトロは忘れていなかった。", presentation, next: { nodeId: "contract-choice" } },
    "contract-choice": {
      type: "choice", id: "contract-choice", prompt: "二人の企みを聞いて、どう考える？", presentation,
      choices: [
        { id: "contract-threat", text: "契約ならフィガロが不利だな", effects: [{ type: "setFlag", key: "understandsContractThreat", value: true }], next: { nodeId: "contract-threat-reaction" } },
        { id: "question-marriage", text: "結婚を契約で決めるのか？", effects: [{ type: "setFlag", key: "questionsMarcellina", value: true }], next: { nodeId: "question-marriage-reaction" } },
        { id: "notice-revenge", text: "バルトロは復讐したいだけでは？", effects: [{ type: "setFlag", key: "noticedBartoloRevenge", value: true }], next: { nodeId: "notice-revenge-reaction" } },
      ],
    },
    "contract-threat-reaction": { type: "dialogue", id: "contract-threat-reaction", speakerId: "marcellina", text: "「約束は約束よ。あの人が署名した以上、逃げ道はないはず」", presentation, next: { nodeId: "contract-rejoin" } },
    "question-marriage-reaction": { type: "dialogue", id: "question-marriage-reaction", speakerId: "marcellina", text: "「契約は人の意思を確かめるものでもあるわ。彼が軽く交わした約束なら、なおさらね」", presentation, next: { nodeId: "contract-rejoin" } },
    "notice-revenge-reaction": { type: "dialogue", id: "notice-revenge-reaction", speakerId: "bartolo", text: "「復讐で何が悪い。借りを返す機会が、ようやく巡ってきたのだ」", presentation, next: { nodeId: "contract-rejoin" } },
    "contract-rejoin": { type: "dialogue", id: "contract-rejoin", text: "契約書は静かに畳まれた。しかし、その一枚が婚礼を覆す力を持っていることは明らかだった。", presentation, next: { nodeId: "la-vendetta-title" } },
    "la-vendetta-title": { type: "dialogue", id: "la-vendetta-title", speakerId: "bartolo", text: "♪ La vendetta", presentation: { ...presentation, musicId: "laVendetta" }, next: { sceneId: "susanna-marcellina", nodeId: "duel-entry" } },
  },
} satisfies Scene
