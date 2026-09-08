import { create } from "zustand"
import { applyEffects } from "../engine/effectExecutor"
import { getNode, resolveBranch, resolveTarget } from "../engine/scenarioEngine"
import { saveProgress } from "../engine/saveData"
import type { Choice, DialogueLogEntry, GameState, Scenario, ScenarioRegistry } from "../engine/types"

const BACK_HISTORY_LIMIT = 200
const DIALOGUE_LOG_LIMIT = 800

type BackHistoryEntry = {
  state: GameState
  dialogueLog: DialogueLogEntry[]
}

type GameStore = GameState & {
  backHistory: BackHistoryEntry[]
  dialogueLog: DialogueLogEntry[]
  start: (scenario: Scenario) => void
  restore: (state: GameState, dialogueLog: DialogueLogEntry[]) => void
  returnToTitle: () => void
  advanceDialogue: (registry: ScenarioRegistry) => void
  choose: (registry: ScenarioRegistry, choice: Choice) => void
  resolveBranches: (registry: ScenarioRegistry) => void
  back: () => void
}

const initialState: GameState = { scenarioId: "", sceneId: "", nodeId: "", flags: {}, affinity: {} }

function snapshotState(state: GameState): GameState {
  return { scenarioId: state.scenarioId, sceneId: state.sceneId, nodeId: state.nodeId, flags: { ...state.flags }, affinity: { ...state.affinity } }
}

function pushBounded<T>(items: T[], item: T, limit: number): T[] {
  return [...items, item].slice(-limit)
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  backHistory: [],
  dialogueLog: [],
  start: (scenario) => {
    const scene = scenario.scenes[scenario.initialSceneId]
    set({ ...initialState, backHistory: [], dialogueLog: [], scenarioId: scenario.id, sceneId: scene.id, nodeId: scene.initialNodeId })
    get().resolveBranches({ [scenario.id]: scenario })
    const state = get()
    const node = getNode({ [scenario.id]: scenario }, state)
    if (node.type === "dialogue") {
      set({ dialogueLog: [{ type: "dialogue", speakerId: node.speakerId, text: node.text, scenarioId: state.scenarioId, sceneId: state.sceneId, nodeId: state.nodeId }] })
    }
    saveProgress(snapshotState(get()), get().dialogueLog)
  },
  restore: (state, dialogueLog) => {
    set({ ...initialState, ...snapshotState(state), backHistory: [], dialogueLog })
    saveProgress(snapshotState(get()), get().dialogueLog)
  },
  returnToTitle: () => {
    const state = get()
    if (state.scenarioId) saveProgress(snapshotState(state), state.dialogueLog)
    set({ ...initialState, backHistory: [], dialogueLog: [] })
  },
  advanceDialogue: (registry) => {
    const state = get()
    const node = getNode(registry, state)
    if (node.type !== "dialogue") return
    set((current) => ({ backHistory: pushBounded(current.backHistory, { state: snapshotState(current), dialogueLog: current.dialogueLog }, BACK_HISTORY_LIMIT) }))
    const changes = applyEffects(state, node.effects)
    set({ ...changes, ...resolveTarget(registry, state, node.next) })
    get().resolveBranches(registry)
    const nextState = get()
    const nextNode = getNode(registry, nextState)
    if (nextNode.type === "dialogue") {
      set((current) => ({ dialogueLog: pushBounded(current.dialogueLog, { type: "dialogue", speakerId: nextNode.speakerId, text: nextNode.text, scenarioId: nextState.scenarioId, sceneId: nextState.sceneId, nodeId: nextState.nodeId }, DIALOGUE_LOG_LIMIT) }))
    }
    saveProgress(snapshotState(get()), get().dialogueLog)
  },
  choose: (registry, choice) => {
    const state = get()
    set((current) => ({ backHistory: pushBounded(current.backHistory, { state: snapshotState(current), dialogueLog: current.dialogueLog }, BACK_HISTORY_LIMIT) }))
    const changes = applyEffects(state, choice.effects)
    set({ ...changes, ...resolveTarget(registry, state, choice.next) })
    get().resolveBranches(registry)
    const nextState = get()
    const nextNode = getNode(registry, nextState)
    const choiceLog: DialogueLogEntry = { type: "choice", text: `選択：「${choice.text}」`, scenarioId: state.scenarioId, sceneId: state.sceneId, nodeId: state.nodeId }
    set((current) => ({ dialogueLog: pushBounded(current.dialogueLog, choiceLog, DIALOGUE_LOG_LIMIT) }))
    if (nextNode.type === "dialogue") {
      set((current) => ({ dialogueLog: pushBounded(current.dialogueLog, { type: "dialogue", speakerId: nextNode.speakerId, text: nextNode.text, scenarioId: nextState.scenarioId, sceneId: nextState.sceneId, nodeId: nextState.nodeId }, DIALOGUE_LOG_LIMIT) }))
    }
    saveProgress(snapshotState(get()), get().dialogueLog)
  },
  resolveBranches: (registry) => {
    let safetyCounter = 0
    while (getNode(registry, get()).type === "branch") {
      if (safetyCounter++ > 100) throw new Error("Too many consecutive branch transitions.")
      set(resolveBranch(registry, get()))
    }
  },
  back: () => {
    const current = get()
    const entry = current.backHistory[current.backHistory.length - 1]
    if (!entry) return
    set({ ...entry.state, dialogueLog: entry.dialogueLog, backHistory: current.backHistory.slice(0, -1) })
    saveProgress(snapshotState(get()), get().dialogueLog)
  },
}))
