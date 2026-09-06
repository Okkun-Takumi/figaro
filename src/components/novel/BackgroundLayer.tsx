import type { Background } from "../../data/backgrounds"

type Props = { background?: Background }

export function BackgroundLayer({ background }: Props) {
  if (!background?.imagePath) return <div className="background-layer" aria-hidden="true" />

  return (
    <div className="background-layer" aria-hidden="true">
      <img src={background.imagePath} alt="" />
    </div>
  )
}
