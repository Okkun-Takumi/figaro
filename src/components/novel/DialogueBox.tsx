type Props = { speaker?: string; text: string; onAdvance: () => void }

export function DialogueBox({ speaker, text, onAdvance }: Props) {
  return (
    <button className="dialogue-box" type="button" onClick={onAdvance} aria-label="次の台詞へ進む">
      {speaker && <span className="dialogue-box__speaker">{speaker}</span>}
      <span className="dialogue-box__text">{text}</span>
      <span className="dialogue-box__hint">クリックして進む</span>
    </button>
  )
}
