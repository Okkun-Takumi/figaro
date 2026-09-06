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
      neutral: {},
      smile: {},
      sad: {},
    },
  },
}
