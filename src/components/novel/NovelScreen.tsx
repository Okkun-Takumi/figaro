import { useEffect, useRef, useState } from "react"
import { characters } from "../../data/characters"
import { backgrounds } from "../../data/backgrounds"
import { prologue } from "../../data/scenarios/prologue"
import { scenarios } from "../../data/scenarios"
import { getNode, getScenario } from "../../engine/scenarioEngine"
import { useGameStore } from "../../stores/gameStore"
import { CharacterLayer } from "./CharacterLayer"
import { ChoiceList } from "./ChoiceList"
import { DialogueBox } from "./DialogueBox"

export function NovelScreen() {
  const scenarioId = useGameStore((store) => store.scenarioId)
  const sceneId = useGameStore((store) => store.sceneId)
  const nodeId = useGameStore((store) => store.nodeId)
  const flags = useGameStore((store) => store.flags)
  const affinity = useGameStore((store) => store.affinity)
  const start = useGameStore((store) => store.start)
  const advanceDialogue = useGameStore((store) => store.advanceDialogue)
  const choose = useGameStore((store) => store.choose)
  const previousScenarioId = useRef<string | undefined>(undefined)
  const [completedScenarioTitle, setCompletedScenarioTitle] = useState<string | undefined>()

  useEffect(() => {
    if (!scenarioId) {
      previousScenarioId.current = undefined
      return
    }
    const previousId = previousScenarioId.current
    previousScenarioId.current = scenarioId
    if (!previousId || previousId === scenarioId) return

    setCompletedScenarioTitle(`${getScenario(scenarios, previousId).title} 完了`)
  }, [scenarioId])

  if (!scenarioId) return <main className="title-screen"><h1>Figaro</h1><button type="button" onClick={() => start(prologue)}>はじめる</button></main>

  const state = { scenarioId, sceneId, nodeId, flags, affinity }
  const scenario = getScenario(scenarios, scenarioId)
  const node = getNode(scenarios, state)
  const presentation = "presentation" in node ? node.presentation : undefined
  const background = presentation?.backgroundId ? backgrounds[presentation.backgroundId] : undefined
  const speakerName = node.type === "dialogue" && node.speakerId ? characters[node.speakerId]?.name : undefined
  return (
    <main className={`novel-screen ${background?.className ?? "background--default"}`}>
      {completedScenarioTitle && (
        <section className="scenario-complete-screen" aria-label={`${completedScenarioTitle}画面`}>
          <p>{completedScenarioTitle}</p>
          <button type="button" onClick={() => setCompletedScenarioTitle(undefined)}>{scenario.title}へ進む</button>
        </section>
      )}
      <CharacterLayer charactersToDisplay={presentation?.characters} />
      {node.type === "dialogue" && <DialogueBox speaker={speakerName} text={node.text} onAdvance={() => advanceDialogue(scenarios)} />}
      {node.type === "choice" && <ChoiceList prompt={node.prompt} choices={node.choices} onChoose={(choice) => choose(scenarios, choice)} />}
      {node.type === "end" && <section className="end-card"><p>{scenario.title} 完了</p><button type="button" onClick={() => start(prologue)}>もう一度読む</button></section>}
    </main>
  )
}
