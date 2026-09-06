export type Character = {
  id: string
  name: string
  color: string
  expressions: Record<string, { imagePath?: string }>
}

export const characters: Record<string, Character> = {
  figaro: {
    id: "figaro",
    name: "フィガロ",
    color: "#d7b26d",
    expressions: {
      neutral: { imagePath: "/characters/figaro/neutral.webp" },
      smile: { imagePath: "/characters/figaro/smile.webp" },
      serious: { imagePath: "/characters/figaro/serious.webp" },
      annoyed: { imagePath: "/characters/figaro/annoyed.webp" },
    },
  },
  susanna: {
    id: "susanna",
    name: "スザンナ",
    color: "#b9829d",
    expressions: {
      neutral: { imagePath: "/characters/susanna/neutral.webp" },
      smile: { imagePath: "/characters/susanna/smile.webp" },
      serious: { imagePath: "/characters/susanna/serious.webp" },
      worried: { imagePath: "/characters/susanna/worried.webp" },
    },
  },
  marcellina: {
    id: "marcellina",
    name: "マルチェリーナ",
    color: "#8d7394",
    expressions: {
      neutral: {},
      smile: {},
      angry: {},
      surprised: {},
    },
  },
  bartolo: {
    id: "bartolo",
    name: "バルトロ",
    color: "#7b6455",
    expressions: {
      neutral: {},
      smile: {},
      angry: {},
      surprised: {},
    },
  },
  cherubino: {
    id: "cherubino",
    name: "ケルビーノ",
    color: "#7e9bad",
    expressions: {
      neutral: { imagePath: "/characters/cherubino/neutral.webp" },
      flustered: { imagePath: "/characters/cherubino/flustered.webp" },
      worried: { imagePath: "/characters/cherubino/worried.webp" },
      surprised: { imagePath: "/characters/cherubino/surprised.webp" },
    },
  },
  count: {
    id: "count",
    name: "伯爵",
    color: "#536f89",
    expressions: {
      neutral: { imagePath: "/characters/count/neutral.webp" },
      charming: { imagePath: "/characters/count/charming.webp" },
      angry: { imagePath: "/characters/count/angry.webp" },
      surprised: { imagePath: "/characters/count/surprised.webp" },
    },
  },
  countess: {
    id: "countess",
    name: "伯爵夫人",
    color: "#714353",
    expressions: {
      neutral: { imagePath: "/characters/countess/neutral.webp" },
      sad: { imagePath: "/characters/countess/sad.webp" },
      smile: { imagePath: "/characters/countess/smile.webp" },
      surprised: { imagePath: "/characters/countess/surprised.webp" },
    },
  },
  basilio: {
    id: "basilio",
    name: "バジリオ",
    color: "#88735f",
    expressions: {
      neutral: {},
      smile: {},
      surprised: {},
      worried: {},
    },
  },
}
