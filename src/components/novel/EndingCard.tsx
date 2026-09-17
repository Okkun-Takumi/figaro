import type { GameState } from "../../engine/types"
import { evaluateEnding } from "../../features/ending/endingEvaluation"

type Props = { state: Pick<GameState, "flags" | "affinity">; view: "diagnosis" | "final"; onProceedToFinal: () => void; onReturnToTitle: () => void; onRestart: () => void }

export function EndingCard({ state, view, onProceedToFinal, onReturnToTitle, onRestart }: Props) {
  if (view === "final") return <section className="boundary-screen boundary-screen--final" aria-label="物語の締め">
    <div className="boundary-card boundary-card--final">
      <p className="boundary-card__copy">聞き覚えのある音楽。<br />見覚えのある人物。<br />「あ、この場面だ」と思える瞬間。<br /><br />そのひとつひとつを、<br />舞台で楽しんでみてください。</p>
      <h1>それでは、劇場で。</h1>
      <button type="button" onClick={onReturnToTitle}>タイトルへ</button>
    </div>
  </section>

  const ending = evaluateEnding(state)
  return <section className="end-card end-card--complete" aria-label="エンディング">
    <header className="ending-section ending-section--title"><p>THE END</p><p>物語を最後まで見届けました。</p></header>
    {ending.hasEnoughMaterial ? <section className="ending-section"><p className="ending-section__eyebrow">YOUR STYLE</p><h2>あなたの観劇タイプ</h2><h3>{ending.styleInfo.name}</h3><p>{ending.styleInfo.description}</p></section> : <section className="ending-section"><p className="ending-section__eyebrow">YOUR STYLE</p><h2>今回の幕で注目したポイント</h2><p>ACT SELECTからの開始だったため、今回は観劇タイプの判定材料が少なめでした。舞台では、人物の気持ちと、すれ違う情報の両方を追ってみてください。</p></section>}
    <section className="ending-section"><p className="ending-section__eyebrow">YOUR FOCUS</p><h2>今回、特に目を向けた人物</h2>{ending.focusDetails.length ? ending.focusDetails.map((focus) => <div className="ending-focus" key={focus.id}><h3>{focus.name}</h3><p>{focus.hint}</p><p className="ending-focus__music">注目曲：{focus.titles.join(" / ")}</p></div>) : <p>今回は特定の人物に偏らず、物語全体を追いながら読み進めました。</p>}</section>
    <section className="ending-section"><p className="ending-section__eyebrow">WATCH FOR</p><h2>舞台で注目してみてほしい3つ</h2><ol className="ending-recommendations">{ending.recommendations.map((item, index) => <li key={item.id}><span>{String(index + 1).padStart(2, "0")}</span>{item.text}</li>)}</ol></section>
    <section className="ending-section ending-section--ready"><p className="ending-section__eyebrow">READY FOR THE OPERA</p><h2>観劇準備完了！</h2><p>なぜフィガロが伯爵と対立するのか、手紙とピンが何を動かすのか、なぜスザンナと伯爵夫人が服を交換するのか――物語の道筋を知ったうえで、舞台の音楽と演技を確かめてみてください。</p></section>
    <div className="end-card__actions"><button type="button" onClick={onRestart}>もう一度読む</button><button type="button" onClick={onProceedToFinal}>次へ</button></div>
  </section>
}
