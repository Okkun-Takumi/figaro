import { characters } from "../../data/characters"
import type { CSSProperties } from "react"
import type { CharacterAppearance } from "../../engine/types"

type Props = { charactersToDisplay?: CharacterAppearance[] }

export function CharacterLayer({ charactersToDisplay = [] }: Props) {
  return (
    <div className={`character-layer${charactersToDisplay.length > 1 ? " character-layer--multiple" : ""}`} aria-hidden="true">
      {charactersToDisplay.map((appearance) => {
        const character = characters[appearance.characterId]
        const expressionId = appearance.expressionId ?? "neutral"
        const imagePath = character?.expressions[expressionId]?.imagePath
        return (
          <div className={`character character--${appearance.position}${imagePath ? " character--image" : ""}`} key={`${appearance.characterId}-${appearance.position}-${expressionId}`} style={{ "--character-color": character?.color } as CSSProperties}>
            {imagePath ? <img className="character__image" src={imagePath} alt={character?.name ?? appearance.characterId} /> : <><span className="character__expression">{expressionId}</span><span className="character__name">{character?.name ?? appearance.characterId}</span></>}
          </div>
        )
      })}
    </div>
  )
}
