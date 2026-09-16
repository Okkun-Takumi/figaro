import { characters } from "../../data/characters"
import type { DialogueLogEntry, GameState } from "../../engine/types"

export type RelationType = "婚約" | "夫婦" | "主従" | "共同作戦" | "言い寄る" | "対抗" | "借金契約" | "恨み" | "憧れ" | "親子" | "想いを寄せる"
export type CastCharacter = { id: string; name: string; description: string; relations: string[]; status?: string }
export type CastRelation = { from: string; to: string; label: RelationType }

const actRank: Record<string, number> = { prologue: 0, act1: 1, act2: 2, act3: 3, act4: 4 }
const introducedByAct: Record<string, number> = { figaro: 0, susanna: 0, count: 2, countess: 2, marcellina: 2, bartolo: 2, basilio: 2, cherubino: 2, antonio: 3, barbarina: 4, curzio: 4 }
const baseDescriptions: Record<string, string> = {
  figaro: "伯爵家に仕える従者。スザンナとの結婚を控えている。", susanna: "伯爵夫人に仕える侍女。フィガロとの結婚を控えている。", count: "アルマヴィーヴァ伯爵。屋敷の主人。", countess: "アルマヴィーヴァ伯爵夫人。スザンナの主人。", marcellina: "フィガロに金を貸し、契約を根拠に結婚を求めている女性。", bartolo: "フィガロへ過去の恨みを抱く医師。", basilio: "伯爵家の音楽教師。噂話を運んでくる。", cherubino: "伯爵の小姓。女性たちに憧れる少年。", antonio: "伯爵家の庭師。バルバリーナの父。", barbarina: "庭師アントニオの娘。", curzio: "借金契約を裁定する法律家。",
}

function hasFlag(state: Pick<GameState, "flags">, flag: string) { return state.flags[flag] === true }

export function getCast(state: Pick<GameState, "scenarioId" | "flags">, log: DialogueLogEntry[], currentCharacterIds: string[] = []) {
  const rank = actRank[state.scenarioId] ?? 0
  const spoken = new Set(log.flatMap((entry) => entry.speakerId ? [entry.speakerId] : []))
  const visible = Object.keys(baseDescriptions).filter((id) => rank >= (introducedByAct[id] ?? 99) || spoken.has(id) || currentCharacterIds.includes(id) || (id === "countess" && hasFlag(state, "knowsCountessWasRosina")))
  const descriptions: Record<string, string> = { ...baseDescriptions }
  if (hasFlag(state, "figaroIsMarcellinaSon")) descriptions.marcellina = "フィガロの母であることが判明した女性。当初は借金契約を理由に結婚を求めていた。"
  if (hasFlag(state, "bartoloIsFigaroFather")) descriptions.bartolo = "フィガロの父であることが判明した医師。当初はフィガロに恨みを抱いていた。"
  const familyRevealed = hasFlag(state, "figaroIsMarcellinaSon") || hasFlag(state, "bartoloIsFigaroFather")
  const relations: CastRelation[] = [
    { from: "figaro", to: "susanna", label: "婚約" },
    ...(visible.includes("count") && visible.includes("countess") ? [{ from: "count", to: "countess", label: "夫婦" as const }] : []),
    ...(visible.includes("countess") ? [{ from: "susanna", to: "countess", label: hasFlag(state, "knowsGardenRendezvousPlan") ? "共同作戦" as const : "主従" as const }] : []),
    ...(hasFlag(state, "knowsCountsInterestInSusanna") ? [{ from: "count", to: "susanna", label: "言い寄る" as const }, { from: "figaro", to: "count", label: "対抗" as const }] : []),
    ...(!familyRevealed && hasFlag(state, "knowsFigaroDebtContract") ? [{ from: "marcellina", to: "figaro", label: "借金契約" as const }] : []),
    ...(!familyRevealed && hasFlag(state, "knowsBartoloGrudge") ? [{ from: "bartolo", to: "figaro", label: "恨み" as const }] : []),
    ...(hasFlag(state, "knowsCherubinoLikesCountess") ? [{ from: "cherubino", to: "countess", label: "憧れ" as const }] : []),
    ...(hasFlag(state, "figaroIsMarcellinaSon") ? [{ from: "marcellina", to: "figaro", label: "親子" as const }] : []),
    ...(hasFlag(state, "bartoloIsFigaroFather") ? [{ from: "bartolo", to: "figaro", label: "親子" as const }] : []),
    ...(spoken.has("barbarina") && visible.includes("cherubino") ? [{ from: "barbarina", to: "cherubino", label: "想いを寄せる" as const }] : []),
  ]
  const charactersToShow: CastCharacter[] = visible.map((id) => ({ id, name: characters[id].name, description: descriptions[id], relations: relations.filter((relation) => relation.from === id || relation.to === id).map((relation) => `${characters[relation.from].name}：${relation.label}`), status: hasFlag(state, "countessDisguisedAsSusanna") && id === "countess" ? "現在：スザンナの服" : hasFlag(state, "susannaDisguisedAsCountess") && id === "susanna" ? "現在：伯爵夫人の服" : undefined }))
  return { characters: charactersToShow, relations }
}
