type Props = {
  text: string
  onStart: () => void
}

export function IntroductionCard({ text, onStart }: Props) {
  return <section className="boundary-screen boundary-screen--introduction" aria-label="物語の導入">
    <div className="boundary-card boundary-card--introduction">
      <p className="boundary-card__copy">{text}</p>
      <h1>《フィガロの結婚》の世界へ</h1>
      <button type="button" onClick={onStart}>はじめる</button>
    </div>
  </section>
}
