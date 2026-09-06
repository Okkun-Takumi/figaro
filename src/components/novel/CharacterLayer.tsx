import { characters } from "../../data/characters"
import type { CSSProperties } from "react"
import type { CharacterAppearance } from "../../engine/types"

type Props = { charactersToDisplay?: CharacterAppearance[] }

export function CharacterLayer({ charactersToDisplay = [] }: Props) {
  return (
    <div className="character-layer" aria-hidden="true">
      {charactersToDisplay.map((appearance) => {
        const character = characters[appearance.characterId]
        return (
          <div className={`character character--${appearance.position}`} key={appearance.characterId} style={{ "--character-color": character?.color } as CSSProperties}>
            <span className="character__expression">{appearance.expressionId ?? "neutral"}</span>
            <span className="character__name">{character?.name ?? appearance.characterId}</span>
          </div>
        )
      })}
    </div>
  )
}
