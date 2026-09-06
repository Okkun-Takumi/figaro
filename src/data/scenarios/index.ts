import type { Scenario } from "../../engine/types"
import { prologue } from "./prologue"

export const scenarios: Record<string, Scenario> = { [prologue.id]: prologue }
