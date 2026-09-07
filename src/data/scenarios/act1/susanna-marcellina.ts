import type { Scene } from "../../../engine/types"

const presentation = {
  backgroundId: "manor-hallway",
  characters: [
    { characterId: "susanna", expressionId: "smile", position: "left" as const },
    { characterId: "marcellina", expressionId: "smug", position: "right" as const },
  ],
}

export const susannaMarcellina = {
  id: "susanna-marcellina",
  backgroundId: "manor-hallway",
  initialNodeId: "duel-entry",
  nodes: {
    "duel-entry": { type: "dialogue", id: "duel-entry", text: "バルトロが去ると、入れ替わるようにスザンナが廊下へ現れた。マルチェリーナは、完璧な笑顔を浮かべる。", presentation, next: { nodeId: "marcellina-greeting" } },
    "marcellina-greeting": { type: "dialogue", id: "marcellina-greeting", speakerId: "marcellina", text: "「お忙しい花嫁さん。どうぞお先にお通りになって」", presentation, next: { nodeId: "susanna-reply" } },
    "susanna-reply": { type: "dialogue", id: "susanna-reply", speakerId: "susanna", text: "「いえいえ、人生のご経験が豊かなあなたこそ、どうぞお先に」", presentation, next: { nodeId: "marcellina-needle" } },
    "marcellina-needle": { type: "dialogue", id: "marcellina-needle", speakerId: "marcellina", text: "「若さだけでは、よい結婚は続かなくてよ」", presentation, next: { nodeId: "susanna-needle" } },
    "susanna-needle": { type: "dialogue", id: "susanna-needle", speakerId: "susanna", text: "「ええ。だから、相手の気持ちをよく確かめないといけませんね」", presentation, next: { nodeId: "duel-choice" } },
    "duel-choice": {
      type: "choice", id: "duel-choice", prompt: "二人の丁寧すぎる会話をどう受け取る？", presentation,
      choices: [
        { id: "notice-insults", text: "二人とも笑っているのに怖い……", effects: [{ type: "setFlag", key: "noticedPoliteInsults", value: true }], next: { nodeId: "notice-insults-reaction" } },
        { id: "support-susanna", text: "スザンナの方が一枚上手だ", effects: [{ type: "changeAffinity", characterId: "susanna", amount: 1 }], next: { nodeId: "support-susanna-reaction" } },
        { id: "understand-marcellina", text: "マルチェリーナにも事情があるのかも", effects: [{ type: "changeAffinity", characterId: "marcellina", amount: 1 }], next: { nodeId: "understand-marcellina-reaction" } },
      ],
    },
    "notice-insults-reaction": { type: "dialogue", id: "notice-insults-reaction", text: "言葉は柔らかいのに、互いに譲る気はまったくない。廊下の空気だけが冷えていく。", presentation, next: { nodeId: "duel-rejoin" } },
    "support-susanna-reaction": { type: "dialogue", id: "support-susanna-reaction", speakerId: "susanna", text: "「まあ、そんなふうに見える？ 私はただ、礼儀を守っているだけよ」", presentation, next: { nodeId: "duel-rejoin" } },
    "understand-marcellina-reaction": { type: "dialogue", id: "understand-marcellina-reaction", speakerId: "marcellina", text: "「事情のない人などいないわ。だから私は、手に入るはずのものを手放したくないだけ」", presentation, next: { nodeId: "duel-rejoin" } },
    "duel-rejoin": { type: "dialogue", id: "duel-rejoin", speakerId: "susanna", text: "「では、失礼します。どうぞあなたも、お幸せに」", presentation, next: { nodeId: "via-resti-title" } },
    "via-resti-title": { type: "dialogue", id: "via-resti-title", text: "♪ Via resti servita", presentation: { ...presentation, musicId: "viaRestiServita" }, next: { nodeId: "marcellina-exit" } },
    "marcellina-exit": { type: "dialogue", id: "marcellina-exit", text: "マルチェリーナは微笑んだまま去った。スザンナが息をつく間もなく、誰かが慌てて駆け寄ってくる。", presentation, next: { sceneId: "cherubino", nodeId: "cherubino-entry" } },
  },
} satisfies Scene
