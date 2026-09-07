export type FlagValue = boolean | number | string

export type GameState = {
  scenarioId: string
  sceneId: string
  nodeId: string
  flags: Record<string, FlagValue>
  affinity: Record<string, number>
}

export type DialogueLogEntry = {
  type: "dialogue" | "choice"
  speakerId?: string
  text: string
  scenarioId: string
  sceneId: string
  nodeId: string
}

export type Scenario = {
  id: string
  title: string
  initialSceneId: string
  scenes: Record<string, Scene>
}

export type ScenarioRegistry = Record<string, Scenario>

export type Scene = {
  id: string
  backgroundId?: string
  initialNodeId: string
  nodes: Record<string, StoryNode>
}

export type StoryNode = DialogueNode | ChoiceNode | BranchNode | EndNode

export type NextTarget = { scenarioId?: string; sceneId?: string; nodeId: string }

export type Presentation = {
  backgroundId?: string
  musicId?: string
  characters?: CharacterAppearance[]
}

export type CharacterAppearance = {
  characterId: string
  expressionId?: string
  position: "left" | "center" | "right"
}

export type DialogueNode = {
  type: "dialogue"
  id: string
  speakerId?: string
  text: string
  presentation?: Presentation
  effects?: Effect[]
  next: NextTarget
}

export type ChoiceNode = {
  type: "choice"
  id: string
  prompt?: string
  presentation?: Presentation
  choices: Choice[]
}

export type Choice = {
  id: string
  text: string
  effects?: Effect[]
  next: NextTarget
}

export type BranchNode = {
  type: "branch"
  id: string
  branches: ConditionalBranch[]
  default: NextTarget
}

export type ConditionalBranch = { when: Condition; next: NextTarget }
export type EndNode = { type: "end"; id: string; presentation?: Presentation }

export type Condition =
  | { type: "flag"; key: string; operator: ComparisonOperator; value: FlagValue }
  | { type: "affinity"; characterId: string; operator: ComparisonOperator; value: number }
  | { type: "all"; conditions: Condition[] }
  | { type: "any"; conditions: Condition[] }
  | { type: "not"; condition: Condition }

export type ComparisonOperator = "===" | "!==" | ">" | ">=" | "<" | "<="

export type Effect =
  | { type: "setFlag"; key: string; value: FlagValue }
  | { type: "incrementFlag"; key: string; amount: number }
  | { type: "changeAffinity"; characterId: string; amount: number }
