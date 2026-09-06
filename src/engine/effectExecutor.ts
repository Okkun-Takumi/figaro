import type { Effect, GameState } from "./types"

export function applyEffects(state: GameState, effects: Effect[] = []): Pick<GameState, "flags" | "affinity"> {
  const flags = { ...state.flags }
  const affinity = { ...state.affinity }
  for (const effect of effects) {
    switch (effect.type) {
      case "setFlag": flags[effect.key] = effect.value; break
      case "incrementFlag": {
        const current = flags[effect.key]
        flags[effect.key] = (typeof current === "number" ? current : 0) + effect.amount
        break
      }
      case "changeAffinity": affinity[effect.characterId] = (affinity[effect.characterId] ?? 0) + effect.amount; break
    }
  }
  return { flags, affinity }
}
