export type MusicTrack = {
  id: string
  title: string
  performers: string[]
  situation: string
  meaning: string
  viewingPoint: string
  youtubeVideoId?: string
  startSeconds?: number
  endSeconds?: number
}

export const musicTracks: Record<string, MusicTrack> = {
  seVuolBallare: { id: "seVuolBallare", title: "Se vuol ballare", performers: ["フィガロ"], situation: "伯爵がスザンナを狙っていると知った直後。", meaning: "伯爵へ正面から反抗するのではなく、知恵で対抗しようとする挑戦の歌。", viewingPoint: "軽快で優雅な音楽と挑戦的な内容のギャップ、フィガロが頭で伯爵と戦う姿に注目。", youtubeVideoId: "36lY7OwT0Fo", startSeconds: 0 },
  laVendetta: { id: "laVendetta", title: "La vendetta", performers: ["バルトロ"], situation: "フィガロの借金契約が明らかになり、バルトロが復讐の機会を得た場面。", meaning: "フィガロへの過去の恨みから、復讐の機会が来たと喜ぶアリア。", viewingPoint: "バルトロが昔の恨みを晴らそうとしている場面だと分かればよい。", youtubeVideoId: "8JNzZ6xXYdw", startSeconds: 0 },
  viaRestiServita: { id: "viaRestiServita", title: "Via resti servita", performers: ["スザンナ", "マルチェリーナ"], situation: "二人が結婚をめぐって、丁寧な言葉で譲り合っている場面。", meaning: "表面上は礼儀正しいが、実際には互いに嫌味をぶつけ合っている二重唱。", viewingPoint: "二人が丁寧に譲り合うほど、実際には喧嘩が激しくなっている。", youtubeVideoId: "GadAVsrQ6qY", startSeconds: 0 },
  nonSoPiu: { id: "nonSoPiu", title: "Non so più", performers: ["ケルビーノ"], situation: "ケルビーノが、自分でもなぜ胸が高鳴るのか分からず戸惑っている場面。", meaning: "恋そのものに恋しているような思春期を表すアリア。", viewingPoint: "特定の一人だけへの告白ではなく、ケルビーノ自身が恋愛感情に振り回されている場面として聴く。", youtubeVideoId: "J9usaRXn1IA", startSeconds: 0 },
  cosaSento: { id: "cosaSento", title: "Cosa sento!", performers: ["伯爵", "バジリオ", "スザンナ"], situation: "伯爵がケルビーノを責め、バジリオとスザンナも状況の悪化に巻き込まれる場面。", meaning: "伯爵は嫉妬と怒り、バジリオはしまったという動揺、スザンナは状況の悪化への恐れを抱える三重唱。", viewingPoint: "伯爵は嫉妬と怒り、バジリオはしまった、スザンナは最悪、という三者三様の状態に注目。", youtubeVideoId: "i_7WVMCE0Wo", startSeconds: 0 },
  giovaniLiete: { id: "giovaniLiete", title: "Giovani liete", performers: ["村人たち", "合唱"], situation: "張りつめた空気が祝祭へ変わり、フィガロが伯爵を公衆の前で追い込もうとする場面。", meaning: "村人たちが、伯爵が古い特権を放棄したことを称える祝福の合唱。", viewingPoint: "華やかな合唱だが、皆の前で褒められるほど伯爵はスザンナへ手を出しにくくなる政治的な圧力に注目。", youtubeVideoId: "V4jioIqA4Zg", startSeconds: 0 },
  nonPiuAndrai: { id: "nonPiuAndrai", title: "Non più andrai", performers: ["フィガロ"], situation: "ケルビーノが館を追い出され、軍隊へ送られることになった場面。", meaning: "フィガロが、女性たちの周囲を飛び回る生活の終わりと軍隊生活をからかうアリア。", viewingPoint: "軍服、行進、泥、武器という大げさな新生活と、軍隊の行進を思わせる音楽に注目。", youtubeVideoId: "TKvjFAxXsa4", startSeconds: 0 },
}
