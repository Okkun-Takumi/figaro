import { useEffect, useRef } from "react"
import { characters } from "../../data/characters"
import type { DialogueLogEntry } from "../../engine/types"

type Props = { entries: DialogueLogEntry[]; onClose: () => void }

export function LogModal({ entries, onClose }: Props) {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  return (
    <section className="log-modal" role="dialog" aria-modal="true" aria-label="会話履歴">
      <div className="log-modal__panel">
        <header className="log-modal__header"><h2>会話履歴</h2><button type="button" onClick={onClose} aria-label="会話履歴を閉じる">閉じる</button></header>
        <div className="log-modal__list" ref={listRef}>
          {entries.map((entry, index) => {
            const isMusic = entry.type === "dialogue" && entry.text.startsWith("♪")
            const isPoint = entry.type === "dialogue" && entry.text.includes("【観劇ポイント】")
            const speaker = entry.speakerId ? characters[entry.speakerId]?.name : undefined
            return (
              <article className={`log-entry${entry.type === "choice" ? " log-entry--choice" : ""}${isMusic ? " log-entry--music" : ""}${isPoint ? " log-entry--point" : ""}`} key={`${entry.scenarioId}-${entry.sceneId}-${entry.nodeId}-${index}`}>
                {entry.type === "choice" ? <span className="log-entry__choice">{entry.text}</span> : <>{isPoint && <span className="log-entry__category">🎭 観劇ポイント</span>}<span className="log-entry__speaker">{speaker ?? "地の文"}</span><p>{entry.text.replace("【観劇ポイント】", "").trim()}</p></>}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
