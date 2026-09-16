import { characters } from "../../data/characters"
import { musicTracks } from "../../data/music"
import type { GameState } from "../../engine/types"

export type ViewingStyle = "strategy" | "humanDrama" | "almavivaHousehold" | "operaExplorer"

type StyleInfo = { name: string; description: string }
type Recommendation = { id: string; text: string; kind: "story" | "people" | "music" }

const styleOrder: ViewingStyle[] = ["strategy", "humanDrama", "almavivaHousehold", "operaExplorer"]

export const viewingStyles: Record<ViewingStyle, StyleInfo> = {
  strategy: { name: "策略ウォッチャー", description: "今回の選択では、手紙や変装、人物たちの作戦など、「誰が何を知っているか」に注目することが多かったようです。舞台では人物の出入りや小道具も追うと、取り違えの面白さがさらに見えてきます。" },
  humanDrama: { name: "人間ドラマ派", description: "今回の選択では、登場人物の気持ちや関係の変化へ目を向けることが多かったようです。歌詞だけでなく、表情や声色にも注目すると、人物たちの感情がより伝わります。" },
  almavivaHousehold: { name: "伯爵家ウォッチャー", description: "今回の選択では、伯爵の振る舞いと伯爵夫人との関係を追うことが多かったようです。伯爵の言葉と、伯爵夫人がそれをどう受け止めるかを見比べてみてください。" },
  operaExplorer: { name: "オペラ探究派", description: "今回の選択では、人物関係や出来事を広く見渡していたようです。舞台では、独唱から重唱・合唱へ広がる音楽と、物語の変化を一緒に味わってみてください。" },
}

const flagsByStyle: Record<ViewingStyle, string[]> = {
  strategy: ["understandsFigaroStrategy", "understandsJealousyTrap", "understandsLetterTrap", "noticedLetterPin", "anticipatesDisguiseSwap", "tracksPinSignal", "understandsCountMistakenIdentitySetup", "tracksGardenTrap"],
  humanDrama: ["prioritizesSusanna", "noticedSusannaDiscomfort", "understandsCountessPain", "understandsVoiCheSapete", "sympathizesWithCherubino", "understandsFigaroLoveForSusanna", "noticesSusannaSincereLove", "understandsCountessForgiveness"],
  almavivaHousehold: ["noticedCountHypocrisy", "noticedCountJealousy", "understandsCountPowerThreat", "understandsCountStatusAnxiety", "sympathizesCountessUnderPressure", "understandsCountessResolve", "understandsCountessTestsCount", "understandsCountAsksForgiveness"],
  operaExplorer: ["understandsCoupleRelationship", "understandsContractThreat", "understandsCherubinoInfatuation", "understandsFigaroPublicStrategy", "understandsMissingSealPayoff", "understandsMarcellinaRoleReversal", "understandsFinalReconciliation", "understandsWomenControlFinalPlan"],
}

const recommendations: Record<ViewingStyle, Recommendation[]> = {
  strategy: [
    { id: "letter", kind: "story", text: "手紙とピンが、誰から誰へ渡り、どの誤解を生むのかを追ってみてください。" },
    { id: "disguise", kind: "people", text: "夜の庭では、誰が誰を別人だと思っているかに注目してみてください。" },
    { id: "ensemble", kind: "music", text: "人物が増えるほど音楽が複雑になる第二幕フィナーレのアンサンブルを味わってみてください。" },
  ],
  humanDrama: [
    { id: "countess", kind: "people", text: "伯爵夫人の感情が「Porgi, amor」から「Dove sono」へどう変化するかを追ってみてください。" },
    { id: "figaro", kind: "people", text: "伯爵へ立ち向かうフィガロが、第四幕では嫉妬に揺れるところにも注目してみてください。" },
    { id: "voices", kind: "music", text: "人物の心情が、歌詞だけでなく声色や歌い方でどう表れるかを聴いてみてください。" },
  ],
  almavivaHousehold: [
    { id: "count", kind: "people", text: "伯爵がスザンナに接する時と、伯爵夫人を疑う時の態度の違いを見比べてみてください。" },
    { id: "forgiveness", kind: "story", text: "最後に伯爵が赦しを求め、伯爵夫人が答えるまでの間の変化に注目してみてください。" },
    { id: "countessMusic", kind: "music", text: "伯爵夫人の二つのアリアで、傷つきと決意がどう響き分けられるかを聴いてみてください。" },
  ],
  operaExplorer: [
    { id: "relationships", kind: "story", text: "人物が何を知っているか、誰に誤解されているかを整理しながら観てみてください。" },
    { id: "ensemble", kind: "music", text: "独唱から二重唱、三重唱、合唱へと音楽が広がる瞬間に注目してみてください。" },
    { id: "finale", kind: "people", text: "各フィナーレで、複数人物の思惑が同時に進む面白さを追ってみてください。" },
  ],
}

const focusHints: Record<string, { hint: string; musicIds: string[] }> = {
  figaro: { hint: "伯爵への対抗心だけでなく、スザンナへの愛情や嫉妬にも注目してみてください。", musicIds: ["seVuolBallare", "apriteUnPoQuegliOcchi"] },
  susanna: { hint: "状況をよく理解し、周囲を動かしていくスザンナの機転に注目してみてください。", musicIds: ["veniteInginocchiatevi", "sullAria", "dehVieniNonTardar"] },
  marcellina: { hint: "契約を武器にした人物が、最後には家族として迎え入れる関係の反転に注目してみてください。", musicIds: ["viaRestiServita", "riconosciInQuestoAmplesso"] },
  cherubino: { hint: "恋に振り回されながらも、騒動を大きく動かしていくケルビーノの存在に注目してみてください。", musicIds: ["nonSoPiu", "voiCheSapete", "nonPiuAndrai"] },
  countess: { hint: "夫への思いと、傷つきながらも自ら行動する姿に注目してみてください。", musicIds: ["porgiAmor", "doveSono"] },
}

function selectedFlagCount(flags: Record<string, unknown>) {
  return Object.values(flagsByStyle).flat().filter((flag) => flags[flag] === true).length
}

export function evaluateEnding(state: Pick<GameState, "flags" | "affinity">) {
  const materialCount = selectedFlagCount(state.flags)
  const scores = Object.fromEntries(styleOrder.map((style) => [style, flagsByStyle[style].filter((flag) => state.flags[flag] === true).length])) as Record<ViewingStyle, number>
  const style = styleOrder.reduce((best, styleCandidate) => scores[styleCandidate] > scores[best] ? styleCandidate : best, "operaExplorer")
  const focusCandidates = Object.entries(state.affinity).filter(([id, value]) => focusHints[id] && value > 0)
  const maxAffinity = focusCandidates.length ? Math.max(...focusCandidates.map(([, value]) => value)) : 0
  const focusedCharacters = focusCandidates.filter(([, value]) => value === maxAffinity).sort(([a], [b]) => a.localeCompare(b)).slice(0, 2).map(([id]) => id)
  return {
    hasEnoughMaterial: materialCount >= 6,
    materialCount,
    style,
    styleInfo: viewingStyles[style],
    focusedCharacters,
    focusDetails: focusedCharacters.map((id) => ({ id, name: characters[id].name, ...focusHints[id], titles: focusHints[id].musicIds.map((musicId) => musicTracks[musicId].title) })),
    recommendations: recommendations[style],
  }
}
