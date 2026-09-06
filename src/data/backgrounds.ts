export type Background = {
  id: string
  className: string
  imagePath?: string
}

export const backgrounds: Record<string, Background> = {
  "manor-exterior-morning": {
    id: "manor-exterior-morning",
    className: "background--manor-exterior-morning",
    imagePath: "/backgrounds/manor-exterior-morning.webp",
  },
  "manor-hallway": {
    id: "manor-hallway",
    className: "background--manor-hallway",
    imagePath: "/backgrounds/manor-hallway.webp",
  },
  "wedding-room": {
    id: "wedding-room",
    className: "background--wedding-room",
    imagePath: "/backgrounds/wedding-room.webp",
  },
}
