import { characters } from "../../data/characters"
import { prologue } from "../../data/scenarios/prologue"
import { getNode } from "../../engine/scenarioEngine"
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

  if (!scenarioId) return <main className="title-screen"><h1>Figaro</h1><button type="button" onClick={() => start(prologue)}>はじめる</button></main>

  const state = { scenarioId, sceneId, nodeId, flags, affinity }
  const node = getNode(prologue, state)
  const presentation = "presentation" in node ? node.presentation : undefined
  const speakerName = node.type === "dialogue" && node.speakerId ? characters[node.speakerId]?.name : undefined
  return (
    <main className={`novel-screen background--${presentation?.backgroundId ?? "default"}`}>
      <CharacterLayer charactersToDisplay={presentation?.characters} />
      {node.type === "dialogue" && <DialogueBox speaker={speakerName} text={node.text} onAdvance={() => advanceDialogue(prologue)} />}
      {node.type === "choice" && <ChoiceList prompt={node.prompt} choices={node.choices} onChoose={(choice) => choose(prologue, choice)} />}
      {node.type === "end" && <section className="end-card"><p>— プロローグ 終 —</p><button type="button" onClick={() => start(prologue)}>もう一度読む</button></section>}
    </main>
  )
}
