import { useState } from "react"
import { characters } from "../../data/characters"
import { backgrounds } from "../../data/backgrounds"
import { prologue } from "../../data/scenarios/prologue"
import { scenarios } from "../../data/scenarios"
import { getNode, getScenario } from "../../engine/scenarioEngine"
import { useGameStore } from "../../stores/gameStore"
import { CharacterLayer } from "./CharacterLayer"
import { BackgroundLayer } from "./BackgroundLayer"
import { ChoiceList } from "./ChoiceList"
import { DialogueBox } from "./DialogueBox"
import { LogModal } from "./LogModal"

export function NovelScreen() {
  const scenarioId = useGameStore((store) => store.scenarioId)
  const sceneId = useGameStore((store) => store.sceneId)
  const nodeId = useGameStore((store) => store.nodeId)
  const flags = useGameStore((store) => store.flags)
  const affinity = useGameStore((store) => store.affinity)
  const start = useGameStore((store) => store.start)
  const advanceDialogue = useGameStore((store) => store.advanceDialogue)
  const choose = useGameStore((store) => store.choose)
  const back = useGameStore((store) => store.back)
  const backHistory = useGameStore((store) => store.backHistory)
  const dialogueLog = useGameStore((store) => store.dialogueLog)
  const [pendingScenarioTransition, setPendingScenarioTransition] = useState<{ completedTitle: string; nextTitle: string } | undefined>()
  const [isLogOpen, setIsLogOpen] = useState(false)

  if (!scenarioId) return <main className="title-screen"><h1>Figaro</h1><button type="button" onClick={() => start(prologue)}>はじめる</button></main>

  const state = { scenarioId, sceneId, nodeId, flags, affinity }
  const scenario = getScenario(scenarios, scenarioId)
  const scene = scenario.scenes[sceneId]
  const node = getNode(scenarios, state)
  const presentation = "presentation" in node ? node.presentation : undefined
  const backgroundId = presentation?.backgroundId ?? scene.backgroundId
  const background = backgroundId ? backgrounds[backgroundId] : undefined
  const speakerName = node.type === "dialogue" && node.speakerId ? characters[node.speakerId]?.name : undefined
  const handleAdvance = () => {
    if (node.type !== "dialogue") return
    if (node.next.scenarioId && node.next.scenarioId !== scenarioId) {
      const nextScenario = getScenario(scenarios, node.next.scenarioId)
      setPendingScenarioTransition({ completedTitle: `${scenario.title} 完了`, nextTitle: nextScenario.title })
      return
    }
    advanceDialogue(scenarios)
  }

  const continueScenarioTransition = () => {
    setPendingScenarioTransition(undefined)
    advanceDialogue(scenarios)
  }
  return (
    <main className={`novel-screen ${background?.className ?? "background--default"}`}>
      {pendingScenarioTransition && (
        <section className="scenario-complete-screen" aria-label={`${pendingScenarioTransition.completedTitle}画面`}>
          <p>{pendingScenarioTransition.completedTitle}</p>
          <button type="button" onClick={continueScenarioTransition}>{pendingScenarioTransition.nextTitle}へ進む</button>
        </section>
      )}
      <BackgroundLayer background={background} />
      <div className="novel-screen__shade" aria-hidden="true" />
      <CharacterLayer charactersToDisplay={presentation?.characters} />
      <nav className="game-controls" aria-label="ゲーム操作">
        <button type="button" onClick={back} disabled={backHistory.length === 0 || isLogOpen}>BACK</button>
        <button type="button" onClick={() => setIsLogOpen(true)}>LOG</button>
      </nav>
      {node.type === "dialogue" && <DialogueBox speaker={speakerName} text={node.text} onAdvance={handleAdvance} />}
      {node.type === "choice" && <ChoiceList prompt={node.prompt} choices={node.choices} onChoose={(choice) => choose(scenarios, choice)} />}
      {node.type === "end" && <section className="end-card"><p>{scenario.title} 完了</p><button type="button" onClick={() => start(prologue)}>もう一度読む</button></section>}
      {isLogOpen && <LogModal entries={dialogueLog} onClose={() => setIsLogOpen(false)} />}
    </main>
  )
}
