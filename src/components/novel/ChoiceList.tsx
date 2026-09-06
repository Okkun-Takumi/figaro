import type { Choice } from "../../engine/types"

type Props = { prompt?: string; choices: Choice[]; onChoose: (choice: Choice) => void }

export function ChoiceList({ prompt, choices, onChoose }: Props) {
  return (
    <section className="choices" aria-label="選択肢">
      {prompt && <p className="choices__prompt">{prompt}</p>}
      {choices.map((choice) => <button className="choices__button" type="button" key={choice.id} onClick={() => onChoose(choice)}>{choice.text}</button>)}
    </section>
  )
}
