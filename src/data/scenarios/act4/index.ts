import type { Scenario } from "../../../engine/types"
import { barbarinaLostPin } from "./barbarina-lost-pin"
import { figaroJealousy } from "./figaro-jealousy"
import { gardenDisguises } from "./garden-disguises"
import { susannaDehVieni } from "./susanna-deh-vieni"
import { gardenMistakenIdentities } from "./garden-mistaken-identities"
import { finalForgiveness } from "./final-forgiveness"

export const act4 = {
  id: "act4",
  title: "ACT 4",
  initialSceneId: "barbarina-lost-pin",
  scenes: {
    "barbarina-lost-pin": barbarinaLostPin,
    "figaro-jealousy": figaroJealousy,
    "garden-disguises": gardenDisguises,
    "susanna-deh-vieni": susannaDehVieni,
    "garden-mistaken-identities": gardenMistakenIdentities,
    "final-forgiveness": finalForgiveness,
  },
} satisfies Scenario
