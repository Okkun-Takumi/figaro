import { useState } from "react"
import type { ActStartId } from "../../data/actStartPresets"
import { characters } from "../../data/characters"
import { backgrounds } from "../../data/backgrounds"
import { musicTracks } from "../../data/music"
import { prologue } from "../../data/scenarios/prologue"
import { scenarios } from "../../data/scenarios"
import { getNode, getScenario } from "../../engine/scenarioEngine"
import { loadSavedProgress, readSaveCode } from "../../engine/saveData"
import { useGameStore } from "../../stores/gameStore"
import { CharacterLayer } from "./CharacterLayer"
import { BackgroundLayer } from "./BackgroundLayer"
import { ChoiceList } from "./ChoiceList"
import { DialogueBox } from "./DialogueBox"
import { LogModal } from "./LogModal"
import { MusicUnlockedCard } from "./MusicUnlockedCard"
import { MenuModal } from "./MenuModal"
import { EndingCard } from "./EndingCard"
import { CastModal } from "./CastModal"

export function NovelScreen() {
  const scenarioId = useGameStore((store) => store.scenarioId)
  const sceneId = useGameStore((store) => store.sceneId)
  const nodeId = useGameStore((store) => store.nodeId)
  const flags = useGameStore((store) => store.flags)
  const affinity = useGameStore((store) => store.affinity)
  const start = useGameStore((store) => store.start)
  const startFromAct = useGameStore((store) => store.startFromAct)
  const restore = useGameStore((store) => store.restore)
  const returnToTitle = useGameStore((store) => store.returnToTitle)
  const advanceDialogue = useGameStore((store) => store.advanceDialogue)
  const choose = useGameStore((store) => store.choose)
  const back = useGameStore((store) => store.back)
  const backHistory = useGameStore((store) => store.backHistory)
  const dialogueLog = useGameStore((store) => store.dialogueLog)
  const [pendingScenarioTransition, setPendingScenarioTransition] = useState<{ completedTitle: string; nextTitle: string } | undefined>()
  const [isLogOpen, setIsLogOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCastOpen, setIsCastOpen] = useState(false)
  const [isTitleRestoreOpen, setIsTitleRestoreOpen] = useState(false)
  const [titleRestoreCode, setTitleRestoreCode] = useState("")
  const [titleRestoreMessage, setTitleRestoreMessage] = useState<string>()
  const [isActSelectOpen, setIsActSelectOpen] = useState(false)
  const [savedProgress, setSavedProgress] = useState(() => loadSavedProgress(scenarios))
  const restoreFromTitle = () => {
    const restored = readSaveCode(titleRestoreCode, scenarios)
    if (!restored) {
      setTitleRestoreMessage("復元コードを確認してください。現在のシナリオに存在しない地点は復元できません。")
      return
    }
    restore(restored.state, restored.dialogueLog)
  }
  const beginFromAct = (actId: ActStartId) => {
    startFromAct(actId)
    setSavedProgress(loadSavedProgress(scenarios))
  }

  if (!scenarioId) return (
    <main className="title-screen">
      <div className="title-screen__content">
        <p className="title-screen__eyebrow">INTERACTIVE OPERA GUIDE</p>
        <h1>Figaro</h1>
        <p className="title-screen__lead">《フィガロの結婚》を、物語を読みながら予習するインタラクティブガイドです。</p>
        <p className="title-screen__description">選択肢で登場人物や状況を整理し、♪ MUSIC UNLOCKEDでは実際の楽曲を試聴できます。</p>
        <p className="title-screen__note">イヤホン推奨</p>
        <button type="button" onClick={() => { if (!savedProgress || window.confirm("現在の自動セーブは新しいPROLOGUEの進行で上書きされます。最初から始めますか？")) start(prologue) }}>NEW GAME</button>
        <button type="button" disabled={!savedProgress} onClick={() => savedProgress && restore(savedProgress.state, savedProgress.dialogueLog)}>CONTINUE</button>
        <button type="button" onClick={() => setIsActSelectOpen((open) => !open)} aria-expanded={isActSelectOpen}>ACT SELECT</button>
        {isActSelectOpen && <section className="title-screen__act-select" aria-label="幕を選択">
          <p>途中の幕から始める場合、それ以前に本筋上必ず起きた出来事は既知として開始します。過去の選択・好感度は初期状態になります。</p>
          <button type="button" onClick={() => beginFromAct("prologue")}>PROLOGUE</button>
          <button type="button" onClick={() => beginFromAct("act1")}>ACT 1</button>
          <button type="button" onClick={() => beginFromAct("act2")}>ACT 2</button>
          <button type="button" onClick={() => beginFromAct("act3")}>ACT 3</button>
          <button type="button" onClick={() => beginFromAct("act4")}>ACT 4</button>
        </section>}
        <button className="title-screen__restore-toggle" type="button" onClick={() => setIsTitleRestoreOpen((open) => !open)}>復元コードを入力</button>
        {isTitleRestoreOpen && <div className="title-screen__restore"><textarea value={titleRestoreCode} onChange={(event) => setTitleRestoreCode(event.target.value)} placeholder="FIGARO-2. で始まるコードを貼り付け" aria-label="復元コードを入力" /><button type="button" onClick={restoreFromTitle}>このコードで復元する</button>{titleRestoreMessage && <p role="status">{titleRestoreMessage}</p>}</div>}
      </div>
    </main>
  )

  const state = { scenarioId, sceneId, nodeId, flags, affinity }
  const scenario = getScenario(scenarios, scenarioId)
  const scene = scenario.scenes[sceneId]
  const node = getNode(scenarios, state)
  const presentation = "presentation" in node ? node.presentation : undefined
  const backgroundId = presentation?.backgroundId ?? scene.backgroundId
  const background = backgroundId ? backgrounds[backgroundId] : undefined
  const speakerName = node.type === "dialogue" && node.speakerId ? characters[node.speakerId]?.name : undefined
  const musicTrack = presentation?.musicId ? musicTracks[presentation.musicId] : undefined
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
  const handleRestoreCode = (code: string) => {
    const restored = readSaveCode(code, scenarios)
    if (!restored) return false
    restore(restored.state, restored.dialogueLog)
    setIsMenuOpen(false)
    return true
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
        <button type="button" onClick={back} disabled={backHistory.length === 0 || isLogOpen || isMenuOpen || isCastOpen}>BACK</button>
        <button type="button" onClick={() => setIsLogOpen(true)} disabled={isMenuOpen || isCastOpen}>LOG</button>
        <button type="button" onClick={() => setIsCastOpen(true)} disabled={isLogOpen || isMenuOpen}>CAST</button>
        <button type="button" onClick={() => setIsMenuOpen(true)} disabled={isLogOpen || isCastOpen}>MENU</button>
      </nav>
      {node.type === "dialogue" && (musicTrack ? <MusicUnlockedCard track={musicTrack} text={node.text} onAdvance={handleAdvance} /> : <DialogueBox speaker={speakerName} text={node.text} onAdvance={handleAdvance} />)}
      {node.type === "choice" && <ChoiceList prompt={node.prompt} choices={node.choices} onChoose={(choice) => choose(scenarios, choice)} />}
      {node.type === "end" && (scenarioId === "act4" ? <EndingCard state={state} onReturnToTitle={() => { returnToTitle(); setSavedProgress(loadSavedProgress(scenarios)) }} onRestart={() => { if (window.confirm("最初から読み直しますか？\n\n現在の進行状況は、新しいゲームの開始状態で上書きされます。")) start(prologue) }} /> : <section className="end-card"><p>{scenario.title} 完了</p><button type="button" onClick={() => { if (window.confirm("最初から読み直しますか？\n\n現在の進行状況は、新しいゲームの開始状態で上書きされます。")) start(prologue) }}>もう一度読む</button></section>)}
      {isLogOpen && <LogModal entries={dialogueLog} onClose={() => setIsLogOpen(false)} />}
      {isCastOpen && <CastModal state={state} log={dialogueLog} currentCharacterIds={presentation?.characters?.map((character) => character.characterId) ?? []} onClose={() => setIsCastOpen(false)} />}
      {isMenuOpen && <MenuModal state={state} onClose={() => setIsMenuOpen(false)} onReturnToTitle={() => { returnToTitle(); setSavedProgress(loadSavedProgress(scenarios)); setIsMenuOpen(false) }} onRestart={() => { if (window.confirm("現在の自動セーブは新しいPROLOGUEの進行で上書きされます。最初から始めますか？")) { setIsMenuOpen(false); start(prologue) } }} onRestoreCode={handleRestoreCode} />}
    </main>
  )
}
