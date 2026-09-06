import { create } from "zustand"
import { applyEffects } from "../engine/effectExecutor"
import { getNode, resolveBranch, resolveTarget } from "../engine/scenarioEngine"
import type { Choice, GameState, Scenario } from "../engine/types"

type GameStore = GameState & {
  start: (scenario: Scenario) => void
  advanceDialogue: (scenario: Scenario) => void
  choose: (scenario: Scenario, choice: Choice) => void
  resolveBranches: (scenario: Scenario) => void
}

const initialState: GameState = { scenarioId: "", sceneId: "", nodeId: "", flags: {}, affinity: {} }

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  start: (scenario) => {
    const scene = scenario.scenes[scenario.initialSceneId]
    set({ ...initialState, scenarioId: scenario.id, sceneId: scene.id, nodeId: scene.initialNodeId })
    get().resolveBranches(scenario)
  },
  advanceDialogue: (scenario) => {
    const state = get()
    const node = getNode(scenario, state)
    if (node.type !== "dialogue") return
    const changes = applyEffects(state, node.effects)
    set({ ...changes, ...resolveTarget(state, node.next) })
    get().resolveBranches(scenario)
  },
  choose: (scenario, choice) => {
    const state = get()
    const changes = applyEffects(state, choice.effects)
    set({ ...changes, ...resolveTarget(state, choice.next) })
    get().resolveBranches(scenario)
  },
  resolveBranches: (scenario) => {
    let safetyCounter = 0
    while (getNode(scenario, get()).type === "branch") {
      if (safetyCounter++ > 100) throw new Error("Too many consecutive branch transitions.")
      set(resolveBranch(scenario, get()))
    }
  },
}))
