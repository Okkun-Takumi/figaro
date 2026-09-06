export type Background = {
  id: string
  className: string
}

export const backgrounds: Record<string, Background> = {
  "manor-exterior-morning": {
    id: "manor-exterior-morning",
    className: "background--manor-exterior-morning",
  },
  "manor-hallway": {
    id: "manor-hallway",
    className: "background--manor-hallway",
  },
  "wedding-room": {
    id: "wedding-room",
    className: "background--wedding-room",
  },
}
