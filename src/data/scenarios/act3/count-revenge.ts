import type { Scene } from "../../../engine/types"
const p = { backgroundId: "great-hall", characters: [{ characterId: "count", expressionId: "angry", position: "center" as const }] }
export const countRevenge = { id: "count-revenge", backgroundId: "great-hall", initialNodeId: "count-realizes-ruse", nodes: {
  "count-realizes-ruse": { type: "dialogue", id: "count-realizes-ruse", speakerId: "count", text: "あの二人は、私を笑いものにするつもりだったのか。", presentation: p, next: { nodeId: "vedro-mentr-io-sospiro" } },
  "vedro-mentr-io-sospiro": { type: "dialogue", id: "vedro-mentr-io-sospiro", text: "♪ Vedrò mentr'io sospiro", presentation: { ...p, musicId: "vedroMentrIoSospiro" }, next: { nodeId: "jealousy-branch" } },
  "jealousy-branch": { type: "branch", id: "jealousy-branch", branches: [{ when: { type: "flag", key: "understandsCountJealousyBackfires", operator: "===", value: true }, next: { nodeId: "jealousy-thought" } }], default: { nodeId: "public-pressure-branch" } },
  "jealousy-thought": { type: "dialogue", id: "jealousy-thought", text: "疑いに振り回された嫉妬は、今度はフィガロへの復讐心へ変わっている。", presentation: p, next: { nodeId: "public-pressure-branch" } },
  "public-pressure-branch": { type: "branch", id: "public-pressure-branch", branches: [{ when: { type: "flag", key: "figaroPubliclyPressuredCount", operator: "===", value: true }, next: { nodeId: "public-pressure-thought" } }], default: { nodeId: "revenge-choice" } },
  "public-pressure-thought": { type: "dialogue", id: "public-pressure-thought", text: "皆の前で追い込まれた屈辱も、伯爵の怒りの底に残っている。", presentation: p, next: { nodeId: "revenge-choice" } },
  "revenge-choice": { type: "choice", id: "revenge-choice", prompt: "伯爵が特に許せないのは何だと思う？", presentation: p, choices: [
    { id: "romantic-jealousy", text: "スザンナに拒まれること", effects: [{ type: "setFlag", key: "focusesCountRomanticJealousy", value: true }], next: { nodeId: "romantic-reaction" } },
    { id: "power-threat", text: "フィガロに出し抜かれること", effects: [{ type: "setFlag", key: "understandsCountPowerThreat", value: true }, { type: "changeAffinity", characterId: "figaro", amount: 1 }], next: { nodeId: "power-reaction" } },
    { id: "status-anxiety", text: "自分の権威が通じないこと", effects: [{ type: "setFlag", key: "understandsCountStatusAnxiety", value: true }], next: { nodeId: "status-reaction" } },
  ] },
  "romantic-reaction": { type: "dialogue", id: "romantic-reaction", text: "欲しいものを拒まれたことが、伯爵の自尊心を傷つけている。", presentation: p, next: { nodeId: "revenge-rejoin" } },
  "power-reaction": { type: "dialogue", id: "power-reaction", text: "主人である伯爵にとって、召使いのフィガロに出し抜かれることは大きな屈辱に映る。", presentation: p, next: { nodeId: "revenge-rejoin" } },
  "status-reaction": { type: "dialogue", id: "status-reaction", text: "伯爵の怒りには、恋愛の嫉妬だけでなく、自分の立場が思いどおりにならない苛立ちもにじんでいる。", presentation: p, next: { nodeId: "revenge-rejoin" } },
  "revenge-rejoin": { type: "dialogue", id: "revenge-rejoin", speakerId: "count", text: "結婚など、そう簡単にさせるものか。契約の裁定で、あの男を追い詰めてやる。", presentation: p, next: { sceneId: "figaro-trial", nodeId: "trial-opens" } },
} } satisfies Scene
