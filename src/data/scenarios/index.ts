import type { Scenario } from "../../engine/types"
import { act1 } from "./act1"
import { act2 } from "./act2"
import { act3 } from "./act3"
import { prologue } from "./prologue"

export const scenarios: Record<string, Scenario> = { [prologue.id]: prologue, [act1.id]: act1, [act2.id]: act2, [act3.id]: act3 }
