import { useState } from "react"
import type { MusicTrack } from "../../data/music"

type Props = {
  track: MusicTrack
  text: string
  onAdvance: () => void
}

export function MusicUnlockedCard({ track, text, onAdvance }: Props) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const params = new URLSearchParams({ rel: "0", autoplay: "1" })
  if (track.startSeconds !== undefined) params.set("start", String(track.startSeconds))
  if (track.endSeconds !== undefined) params.set("end", String(track.endSeconds))
  const playerUrl = track.youtubeVideoId ? `https://www.youtube.com/embed/${track.youtubeVideoId}?${params.toString()}` : undefined

  return (
    <section className="music-unlocked-card" aria-label={`${track.title} MUSIC UNLOCKED`}>
      <span className="music-unlocked-card__eyebrow">♪ MUSIC UNLOCKED</span>
      <h2>{track.title}</h2>
      <p className="music-unlocked-card__singer">歌：{track.performers.join(" / ")}</p>
      <div className="music-unlocked-card__guide"><h3>この場面</h3><p>{track.situation}</p></div>
      <div className="music-unlocked-card__guide"><h3>この曲の意味</h3><p>{track.meaning}</p></div>
      <div className="music-unlocked-card__guide music-unlocked-card__guide--point"><h3>観劇ポイント</h3><p>{track.viewingPoint}</p></div>
      {text.trim() !== `♪ ${track.title}` && <p className="music-unlocked-card__story-text">{text}</p>}
      {playerUrl && !isPlayerOpen && <button type="button" className="music-unlocked-card__listen" onClick={() => setIsPlayerOpen(true)}>▶ 演奏を聴く</button>}
      {isPlayerOpen && playerUrl && <div className="music-unlocked-card__player"><iframe src={playerUrl} title={`${track.title} のYouTube演奏`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>}
      {isPlayerOpen && <button type="button" className="music-unlocked-card__close-player" onClick={() => setIsPlayerOpen(false)}>プレイヤーを閉じる</button>}
      <button type="button" className="music-unlocked-card__continue" onClick={onAdvance}>続ける　▼</button>
    </section>
  )
}
