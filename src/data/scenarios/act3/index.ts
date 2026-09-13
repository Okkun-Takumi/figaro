import type { Scenario } from "../../../engine/types"
import { countRevenge } from "./count-revenge"
import { figaroTrial } from "./figaro-trial"
import { susannaCountRuse } from "./susanna-count-ruse"
import { doveSono } from "./dove-sono"
import { letterDuet } from "./letter-duet"
import { susannaFamilyReveal } from "./susanna-family-reveal"
import { weddingAndLetter } from "./wedding-and-letter"
export const act3 = { id: "act3", title: "第三幕", initialSceneId: "susanna-count-ruse", scenes: { "susanna-count-ruse": susannaCountRuse, "count-revenge": countRevenge, "figaro-trial": figaroTrial, "susanna-family-reveal": susannaFamilyReveal, "dove-sono": doveSono, "letter-duet": letterDuet, "wedding-and-letter": weddingAndLetter } } satisfies Scenario
