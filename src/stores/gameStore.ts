import { create } from "zustand"
import { applyEffects } from "../engine/effectExecutor"
import { getNode, resolveBranch, resolveTarget } from "../engine/scenarioEngine"
import type { Choice, GameState, Scenario, ScenarioRegistry } from "../engine/types"

type GameStore = GameState & {
  start: (scenario: Scenario) => void
  advanceDialogue: (registry: ScenarioRegistry) => void
  choose: (registry: ScenarioRegistry, choice: Choice) => void
  resolveBranches: (registry: ScenarioRegistry) => void
}

const initialState: GameState = { scenarioId: "", sceneId: "", nodeId: "", flags: {}, affinity: {} }

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  start: (scenario) => {
    const scene = scenario.scenes[scenario.initialSceneId]
    set({ ...initialState, scenarioId: scenario.id, sceneId: scene.id, nodeId: scene.initialNodeId })
    get().resolveBranches({ [scenario.id]: scenario })
  },
  advanceDialogue: (registry) => {
    const state = get()
    const node = getNode(registry, state)
    if (node.type !== "dialogue") return
    const changes = applyEffects(state, node.effects)
    set({ ...changes, ...resolveTarget(registry, state, node.next) })
    get().resolveBranches(registry)
  },
  choose: (registry, choice) => {
    const state = get()
    const changes = applyEffects(state, choice.effects)
    set({ ...changes, ...resolveTarget(registry, state, choice.next) })
    get().resolveBranches(registry)
  },
  resolveBranches: (registry) => {
    let safetyCounter = 0
    while (getNode(registry, get()).type === "branch") {
      if (safetyCounter++ > 100) throw new Error("Too many consecutive branch transitions.")
      set(resolveBranch(registry, get()))
    }
  },
}))
