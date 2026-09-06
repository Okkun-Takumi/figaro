type Props = { speaker?: string; text: string; onAdvance: () => void }

export function DialogueBox({ speaker, text, onAdvance }: Props) {
  const isMusic = text.startsWith("♪")
  const isPoint = text.includes("【観劇ポイント】")
  const displayText = text.replace("【観劇ポイント】", "").trim()
  return (
    <button className={`dialogue-box${isMusic ? " dialogue-box--music" : ""}${isPoint ? " dialogue-box--point" : ""}`} type="button" onClick={onAdvance} aria-label="次の台詞へ進む">
      {isPoint && <span className="dialogue-box__category">🎭 観劇ポイント</span>}
      {speaker && <span className="dialogue-box__speaker">{speaker}</span>}
      <span className="dialogue-box__text">{displayText}</span>
      <span className="dialogue-box__hint"><span className="dialogue-box__tap-label">Tap</span> ▼</span>
    </button>
  )
}
