import { characters, type Character } from "../data/characters"
import type { NextTarget, Presentation, Scenario, StoryNode } from "./types"

export function validateScenario(scenario: Scenario, characterMaster: Record<string, Character> = characters): string[] {
  const errors: string[] = []
  const validateTarget = (target: NextTarget, sceneId: string, source: string) => {
    const targetSceneId = target.sceneId ?? sceneId
    const targetScene = scenario.scenes[targetSceneId]
    if (!targetScene) {
      errors.push(`${source}: sceneId "${targetSceneId}" does not exist.`)
    } else if (!targetScene.nodes[target.nodeId]) {
      errors.push(`${source}: nodeId "${target.nodeId}" does not exist in scene "${targetSceneId}".`)
    }
  }
  const validatePresentation = (presentation: Presentation | undefined, source: string) => {
    for (const appearance of presentation?.characters ?? []) {
      const character = characterMaster[appearance.characterId]
      if (!character) {
        errors.push(`${source}: characterId "${appearance.characterId}" does not exist.`)
      } else if (appearance.expressionId && !character.expressions[appearance.expressionId]) {
        errors.push(`${source}: expressionId "${appearance.expressionId}" does not exist for character "${appearance.characterId}".`)
      }
    }
  }
  const validateNode = (node: StoryNode, sceneId: string) => {
    const source = `${sceneId}.${node.id}`
    if (node.type === "dialogue") {
      if (node.speakerId && !characterMaster[node.speakerId]) errors.push(`${source}: speakerId "${node.speakerId}" does not exist.`)
      validatePresentation(node.presentation, source)
      validateTarget(node.next, sceneId, source)
    }
    if (node.type === "choice") {
      validatePresentation(node.presentation, source)
      node.choices.forEach((choice) => validateTarget(choice.next, sceneId, `${source}.${choice.id}`))
    }
    if (node.type === "branch") {
      node.branches.forEach((branch, index) => validateTarget(branch.next, sceneId, `${source}.branches[${index}]`))
      validateTarget(node.default, sceneId, `${source}.default`)
    }
    if (node.type === "end") validatePresentation(node.presentation, source)
  }

  if (!scenario.scenes[scenario.initialSceneId]) errors.push(`initialSceneId "${scenario.initialSceneId}" does not exist.`)
  Object.entries(scenario.scenes).forEach(([sceneId, scene]) => {
    if (!scene.nodes[scene.initialNodeId]) errors.push(`${sceneId}: initialNodeId "${scene.initialNodeId}" does not exist.`)
    Object.values(scene.nodes).forEach((node) => validateNode(node, sceneId))
  })
  return errors
}
