import type { Scenario } from "../../../engine/types"
import { cherubino } from "./cherubino"
import { cherubinoDiscovered } from "./cherubino-discovered"
import { cherubinoArmy } from "./cherubino-army"
import { countCherubino } from "./count-cherubino"
import { figaroDefiance } from "./figaro-defiance"
import { figaroVillagers } from "./figaro-villagers"
import { marcellinaBartolo } from "./marcellina-bartolo"
import { susannaMarcellina } from "./susanna-marcellina"
import { weddingRoom } from "./wedding-room"

export const act1 = {
  id: "act1",
  title: "ACT 1",
  initialSceneId: "wedding-room",
  scenes: {
    "wedding-room": weddingRoom,
    "figaro-defiance": figaroDefiance,
    "marcellina-bartolo": marcellinaBartolo,
    "susanna-marcellina": susannaMarcellina,
    cherubino,
    "count-cherubino": countCherubino,
    "cherubino-discovered": cherubinoDiscovered,
    "figaro-villagers": figaroVillagers,
    "cherubino-army": cherubinoArmy,
  },
} satisfies Scenario
