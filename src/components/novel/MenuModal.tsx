import { useState } from "react"
import { createSaveCode } from "../../engine/saveData"
import type { GameState } from "../../engine/types"

type Props = {
  state: GameState
  onClose: () => void
  onReturnToTitle: () => void
  onRestart: () => void
  onRestoreCode: (code: string) => boolean
}

export function MenuModal({ state, onClose, onReturnToTitle, onRestart, onRestoreCode }: Props) {
  const [restoreCode, setRestoreCode] = useState("")
  const [message, setMessage] = useState<string>()
  const saveCode = createSaveCode(state)

  const copySaveCode = async () => {
    try {
      await navigator.clipboard.writeText(saveCode)
      setMessage("復元コードをコピーしました。")
    } catch {
      setMessage("コードを選択してコピーしてください。")
    }
  }

  const restore = () => {
    if (onRestoreCode(restoreCode)) return
    setMessage("復元コードを確認してください。現在のシナリオに存在しない地点は復元できません。")
  }

  return (
    <section className="menu-modal" role="dialog" aria-modal="true" aria-label="メニュー">
      <div className="menu-modal__panel">
        <header className="menu-modal__header"><h2>メニュー</h2><button type="button" onClick={onClose}>閉じる</button></header>
        <div className="menu-modal__content">
          <section className="menu-modal__section">
            <h3>自動セーブ</h3>
            <p>進行はこの端末・このブラウザに自動保存されています。</p>
            <button type="button" onClick={onReturnToTitle}>タイトルへ戻る</button>
            <button type="button" onClick={onRestart}>最初からやり直す</button>
          </section>
          <section className="menu-modal__section">
            <h3>復元コード</h3>
            <p>別の端末へ現在の進行状況を移す場合は、このコードをコピーしてください。会話LOGは移行されません。</p>
            <textarea readOnly value={saveCode} aria-label="現在の復元コード" />
            <button type="button" onClick={copySaveCode}>復元コードをコピー</button>
          </section>
          <section className="menu-modal__section">
            <h3>コードから復元</h3>
            <p>復元コードを入力すると、現在の進行状況を置き換えます。会話LOGは新しく記録されます。</p>
            <textarea value={restoreCode} onChange={(event) => setRestoreCode(event.target.value)} placeholder="FIGARO-2. で始まるコードを貼り付け" aria-label="復元コードを入力" />
            <button type="button" onClick={restore}>このコードで復元する</button>
          </section>
          {message && <p className="menu-modal__message" role="status">{message}</p>}
        </div>
      </div>
    </section>
  )
}
