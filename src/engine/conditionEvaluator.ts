import type { ComparisonOperator, Condition, FlagValue, GameState } from "./types"

function compare(left: FlagValue | number | undefined, operator: ComparisonOperator, right: FlagValue | number): boolean {
  switch (operator) {
    case "===": return left === right
    case "!==": return left !== right
    case ">": return typeof left === "number" && typeof right === "number" && left > right
    case ">=": return typeof left === "number" && typeof right === "number" && left >= right
    case "<": return typeof left === "number" && typeof right === "number" && left < right
    case "<=": return typeof left === "number" && typeof right === "number" && left <= right
  }
}

export function evaluateCondition(condition: Condition, state: GameState): boolean {
  switch (condition.type) {
    case "flag": return compare(state.flags[condition.key], condition.operator, condition.value)
    case "affinity": return compare(state.affinity[condition.characterId] ?? 0, condition.operator, condition.value)
    case "all": return condition.conditions.every((item) => evaluateCondition(item, state))
    case "any": return condition.conditions.some((item) => evaluateCondition(item, state))
    case "not": return !evaluateCondition(condition.condition, state)
  }
}
