import type { Scenario } from "../../engine/types"
import { act1 } from "./act1"
import { prologue } from "./prologue"

export const scenarios: Record<string, Scenario> = { [prologue.id]: prologue, [act1.id]: act1 }
