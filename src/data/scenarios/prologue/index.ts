import type { Scenario } from "../../../engine/types"
import { arrival } from "./arrival"
import { manorHallway } from "./hallway"

export const prologue = {
  id: "prologue",
  title: "プロローグ",
  initialSceneId: "arrival",
  scenes: { arrival, "manor-hallway": manorHallway },
} satisfies Scenario
