import type { Scene } from "../../../engine/types"
const p = { backgroundId: "countess-bedroom", characters: [{ characterId: "countess", expressionId: "sad", position: "center" as const }] }
export const doveSono = { id: "dove-sono", backgroundId: "countess-bedroom", initialNodeId: "countess-alone", nodes: {
  "countess-alone": { type: "dialogue", id: "countess-alone", text: "伯爵夫人は一人になり、結婚したばかりの頃の幸せを思い返していた。", presentation: p, next: { nodeId: "dove-sono-music" } },
  "dove-sono-music": { type: "dialogue", id: "dove-sono-music", text: "♪ Dove sono i bei momenti", presentation: { ...p, musicId: "doveSono" }, next: { nodeId: "countess-resolves" } },
  "countess-resolves": { type: "dialogue", id: "countess-resolves", speakerId: "countess", text: "失ったものを嘆くだけでは終わらせない。もう一度、あの人の心を取り戻せるかもしれない。", presentation: { backgroundId: "countess-bedroom", characters: [{ characterId: "countess", expressionId: "neutral", position: "center" }] }, next: { nodeId: "dove-choice" } },
  "dove-choice": { type: "choice", id: "dove-choice", prompt: "伯爵夫人の気持ちはどう変わった？", presentation: p, choices: [
    { id: "love", text: "まだ伯爵を愛している", effects: [{ type: "setFlag", key: "understandsCountessLovePersists", value: true }], next: { nodeId: "love-reaction" } },
    { id: "resolve", text: "悲しむだけでなく、行動しようとしている", effects: [{ type: "setFlag", key: "understandsCountessResolve", value: true }, { type: "changeAffinity", characterId: "countess", amount: 1 }], next: { nodeId: "resolve-reaction" } },
    { id: "loss", text: "昔の幸せを失ったことが一番つらい", effects: [{ type: "setFlag", key: "focusesCountessLostHappiness", value: true }], next: { nodeId: "loss-reaction" } },
  ] },
  "love-reaction": { type: "dialogue", id: "love-reaction", text: "愛情が残っているからこそ、伯爵夫人は希望を捨てきれない。", presentation: p, next: { nodeId: "rejoin" } },
  "resolve-reaction": { type: "dialogue", id: "resolve-reaction", text: "伯爵夫人は悲しみを抱えたまま、次の一手を選ぼうとしている。", presentation: p, next: { nodeId: "rejoin" } },
  "loss-reaction": { type: "dialogue", id: "loss-reaction", text: "過去の幸福を知っているから、今の孤独はいっそう深い。", presentation: p, next: { nodeId: "rejoin" } },
  rejoin: { type: "dialogue", id: "rejoin", text: "伯爵夫人はスザンナを呼び、夜の計画を最後まで進める決意を固めた。", presentation: p, next: { sceneId: "letter-duet", nodeId: "countess-dictates" } },
} } satisfies Scene
