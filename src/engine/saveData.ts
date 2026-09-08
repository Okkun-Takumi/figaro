import type { DialogueLogEntry, FlagValue, GameState, ScenarioRegistry } from "./types"

export const SAVE_DATA_VERSION = 2
export const SAVE_CODE_PREFIX = `FIGARO-${SAVE_DATA_VERSION}.`
const AUTO_SAVE_KEY = "figaro:auto-save"
const AUTO_SAVE_VERSIONS = new Set([1, SAVE_DATA_VERSION])
const DIALOGUE_LOG_LIMIT = 800
const MAX_SAVE_CODE_LENGTH = 20_000

export type RestoredProgress = {
  state: GameState
  dialogueLog: DialogueLogEntry[]
}

type SavedProgress = {
  version: number
  state: GameState
  dialogueLog?: DialogueLogEntry[]
}

type SaveCodePayload = {
  version: typeof SAVE_DATA_VERSION
  state: GameState
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isFlagValue(value: unknown): value is FlagValue {
  return typeof value === "boolean" || typeof value === "number" || typeof value === "string"
}

function isValidState(value: unknown, registry: ScenarioRegistry): value is GameState {
  if (!isRecord(value)
    || typeof value.scenarioId !== "string"
    || typeof value.sceneId !== "string"
    || typeof value.nodeId !== "string"
    || !isRecord(value.flags)
    || !isRecord(value.affinity)) return false

  const scenario = registry[value.scenarioId]
  const scene = scenario?.scenes[value.sceneId]
  const node = scene?.nodes[value.nodeId]
  if (!scenario || !scene || !node || node.type === "branch") return false

  return Object.values(value.flags).every(isFlagValue)
    && Object.values(value.affinity).every((affinity) => typeof affinity === "number" && Number.isFinite(affinity))
}

function cloneState(state: GameState): GameState {
  return { scenarioId: state.scenarioId, sceneId: state.sceneId, nodeId: state.nodeId, flags: { ...state.flags }, affinity: { ...state.affinity } }
}

function isValidLogEntry(value: unknown): value is DialogueLogEntry {
  return isRecord(value)
    && (value.type === "dialogue" || value.type === "choice")
    && typeof value.text === "string"
    && typeof value.scenarioId === "string"
    && typeof value.sceneId === "string"
    && typeof value.nodeId === "string"
    && (value.speakerId === undefined || typeof value.speakerId === "string")
}

function parseSavedProgress(value: unknown, registry: ScenarioRegistry): RestoredProgress | undefined {
  if (!isRecord(value) || !AUTO_SAVE_VERSIONS.has(value.version as number) || !isValidState(value.state, registry)) return undefined
  const dialogueLog = Array.isArray(value.dialogueLog) ? value.dialogueLog.filter(isValidLogEntry).slice(-DIALOGUE_LOG_LIMIT) : []
  return { state: cloneState(value.state), dialogueLog }
}

function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text)
  let binary = ""
  bytes.forEach((byte) => { binary += String.fromCharCode(byte) })
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "")
}

function fromBase64Url(value: string): string | undefined {
  try {
    const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=")
    const binary = atob(padded)
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
    return new TextDecoder().decode(bytes)
  } catch {
    return undefined
  }
}

export function createSaveCode(state: GameState): string {
  const payload: SaveCodePayload = { version: SAVE_DATA_VERSION, state: cloneState(state) }
  return `${SAVE_CODE_PREFIX}${toBase64Url(JSON.stringify(payload))}`
}

export function readSaveCode(code: string, registry: ScenarioRegistry): RestoredProgress | undefined {
  const normalized = code.trim()
  if (normalized.length > MAX_SAVE_CODE_LENGTH || !normalized.startsWith(SAVE_CODE_PREFIX)) return undefined
  const decoded = fromBase64Url(normalized.slice(SAVE_CODE_PREFIX.length))
  if (!decoded) return undefined
  try {
    const payload = JSON.parse(decoded)
    if (!isRecord(payload) || payload.version !== SAVE_DATA_VERSION || !isValidState(payload.state, registry)) return undefined
    return { state: cloneState(payload.state), dialogueLog: [] }
  } catch {
    return undefined
  }
}

export function saveProgress(state: GameState, dialogueLog: DialogueLogEntry[]): void {
  try {
    localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify({ version: SAVE_DATA_VERSION, state: cloneState(state), dialogueLog } satisfies SavedProgress))
  } catch {
    // Storage can be unavailable in private browsing or restricted contexts.
  }
}

export function loadSavedProgress(registry: ScenarioRegistry): RestoredProgress | undefined {
  try {
    const stored = localStorage.getItem(AUTO_SAVE_KEY)
    return stored ? parseSavedProgress(JSON.parse(stored), registry) : undefined
  } catch {
    return undefined
  }
}
