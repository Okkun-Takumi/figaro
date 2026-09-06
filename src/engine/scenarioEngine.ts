import { evaluateCondition } from "./conditionEvaluator"
import type { GameState, NextTarget, Scenario, StoryNode } from "./types"

export function getNode(scenario: Scenario, state: GameState): StoryNode {
  const scene = scenario.scenes[state.sceneId]
  if (!scene) throw new Error(`Scene not found: ${state.sceneId}`)
  const node = scene.nodes[state.nodeId]
  if (!node) throw new Error(`Node not found: ${state.sceneId}.${state.nodeId}`)
  return node
}

export function resolveTarget(state: GameState, target: NextTarget): Pick<GameState, "sceneId" | "nodeId"> {
  return { sceneId: target.sceneId ?? state.sceneId, nodeId: target.nodeId }
}

export function resolveBranch(scenario: Scenario, state: GameState): Pick<GameState, "sceneId" | "nodeId"> {
  const node = getNode(scenario, state)
  if (node.type !== "branch") throw new Error("Current node is not a branch")
  const target = node.branches.find((branch) => evaluateCondition(branch.when, state))?.next ?? node.default
  return resolveTarget(state, target)
}
