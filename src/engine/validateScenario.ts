import { characters, type Character } from "../data/characters"
import { backgrounds, type Background } from "../data/backgrounds"
import { musicTracks, type MusicTrack } from "../data/music"
import type { NextTarget, Presentation, Scenario, ScenarioRegistry, StoryNode } from "./types"

export function validateScenario(
  scenario: Scenario,
  scenarioRegistry: ScenarioRegistry,
  characterMaster: Record<string, Character> = characters,
  backgroundMaster: Record<string, Background> = backgrounds,
  musicMaster: Record<string, MusicTrack> = musicTracks,
): string[] {
  const errors: string[] = []
  const validateTarget = (target: NextTarget, sceneId: string, source: string) => {
    const targetScenarioId = target.scenarioId ?? scenario.id
    const targetScenario = scenarioRegistry[targetScenarioId]
    if (!targetScenario) {
      errors.push(`${source}: scenarioId "${targetScenarioId}" does not exist.`)
      return
    }
    const targetSceneId = target.sceneId ?? (target.scenarioId ? targetScenario.initialSceneId : sceneId)
    const targetScene = targetScenario.scenes[targetSceneId]
    if (!targetScene) {
      errors.push(`${source}: sceneId "${targetSceneId}" does not exist in scenario "${targetScenarioId}".`)
    } else if (!targetScene.nodes[target.nodeId]) {
      errors.push(`${source}: nodeId "${target.nodeId}" does not exist in scenario "${targetScenarioId}", scene "${targetSceneId}".`)
    }
  }
  const validatePresentation = (presentation: Presentation | undefined, source: string) => {
    if (presentation?.backgroundId && !backgroundMaster[presentation.backgroundId]) {
      errors.push(`${source}: backgroundId "${presentation.backgroundId}" does not exist.`)
    }
    if (presentation?.musicId && !musicMaster[presentation.musicId]) {
      errors.push(`${source}: musicId "${presentation.musicId}" does not exist.`)
    }
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
    if (scene.id !== sceneId) errors.push(`${sceneId}: Scene.id must match its scene key (received "${scene.id}").`)
    if (scene.backgroundId && !backgroundMaster[scene.backgroundId]) {
      errors.push(`${sceneId}: backgroundId "${scene.backgroundId}" does not exist.`)
    }
    if (!scene.nodes[scene.initialNodeId]) errors.push(`${sceneId}: initialNodeId "${scene.initialNodeId}" does not exist.`)
    Object.entries(scene.nodes).forEach(([nodeId, node]) => {
      if (node.id !== nodeId) errors.push(`${sceneId}.${nodeId}: StoryNode.id must match its node key (received "${node.id}").`)
      validateNode(node, sceneId)
    })
  })
  return errors
}
