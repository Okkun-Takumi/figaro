import type { Scenario } from "../../../engine/types"
import { arrival } from "./arrival"
import { manorHallway } from "./hallway"
import { intro } from "./intro"

export const prologue = {
  id: "prologue",
  title: "PROLOGUE",
  initialSceneId: "intro",
  scenes: { intro, arrival, "manor-hallway": manorHallway },
} satisfies Scenario
