import { evaluateCondition } from "./conditionEvaluator"
import type { GameState, NextTarget, Scenario, ScenarioRegistry, StoryNode } from "./types"

export function getScenario(registry: ScenarioRegistry, scenarioId: string): Scenario {
  const scenario = registry[scenarioId]
  if (!scenario) throw new Error(`Scenario not found: ${scenarioId}`)
  return scenario
}

export function getNode(registry: ScenarioRegistry, state: GameState): StoryNode {
  const scenario = getScenario(registry, state.scenarioId)
  const scene = scenario.scenes[state.sceneId]
  if (!scene) throw new Error(`Scene not found: ${state.sceneId}`)
  const node = scene.nodes[state.nodeId]
  if (!node) throw new Error(`Node not found: ${state.sceneId}.${state.nodeId}`)
  return node
}

export function resolveTarget(registry: ScenarioRegistry, state: GameState, target: NextTarget): Pick<GameState, "scenarioId" | "sceneId" | "nodeId"> {
  const scenarioId = target.scenarioId ?? state.scenarioId
  const scenario = getScenario(registry, scenarioId)
  const sceneId = target.sceneId ?? (scenarioId === state.scenarioId ? state.sceneId : scenario.initialSceneId)
  return { scenarioId, sceneId, nodeId: target.nodeId }
}

export function resolveBranch(registry: ScenarioRegistry, state: GameState): Pick<GameState, "scenarioId" | "sceneId" | "nodeId"> {
  const node = getNode(registry, state)
  if (node.type !== "branch") throw new Error("Current node is not a branch")
  const target = node.branches.find((branch) => evaluateCondition(branch.when, state))?.next ?? node.default
  return resolveTarget(registry, state, target)
}
