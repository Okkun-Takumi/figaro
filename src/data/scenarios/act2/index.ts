import type { Scenario } from "../../../engine/types"
import { cherubinoDisguise } from "./cherubino-disguise"
import { cherubinoEscape } from "./cherubino-escape"
import { act2Finale } from "./act2-finale"
import { cherubinoSong } from "./cherubino-song"
import { countCloset } from "./count-closet"
import { countessLament } from "./countess-lament"
import { countessPlan } from "./countess-plan"

export const act2 = {
  id: "act2",
  title: "第二幕",
  initialSceneId: "countess-lament",
  scenes: {
    "countess-lament": countessLament,
    "countess-plan": countessPlan,
    "cherubino-song": cherubinoSong,
    "cherubino-disguise": cherubinoDisguise,
    "count-closet": countCloset,
    "cherubino-escape": cherubinoEscape,
    "act2-finale": act2Finale,
  },
} satisfies Scenario
