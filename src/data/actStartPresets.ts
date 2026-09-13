import type { FlagValue } from "../engine/types"

export type ActStartPreset = {
  scenarioId: string
  sceneId: string
  nodeId: string
  flags: Record<string, FlagValue>
  affinity: Record<string, number>
}

export const actStartPresets = {
  prologue: {
    scenarioId: "prologue",
    sceneId: "arrival",
    nodeId: "morning-estate",
    flags: {},
    affinity: {},
  },
  act1: {
    scenarioId: "act1",
    sceneId: "wedding-room",
    nodeId: "room-entry",
    flags: {
      knowsWedding: true,
    },
    affinity: {},
  },
  act2: {
    scenarioId: "act2",
    sceneId: "countess-lament",
    nodeId: "act2-entry",
    flags: {
      knowsWedding: true,
      understandsCoupleRelationship: true,
      hasMetFigaro: true,
      hasMetSusanna: true,
      knowsBasilioRole: true,
      knowsCountsInterestInSusanna: true,
      understandsRoomTrap: true,
      knowsDroitDuSeigneur: true,
      figaroPlansResistance: true,
      knowsFigaroDebtContract: true,
      knowsMarcellinaWantsMarriage: true,
      knowsBartoloGrudge: true,
      knowsCountessWasRosina: true,
      knowsCherubinoIsPage: true,
      knowsBarbarinaIncident: true,
      knowsCherubinoBanished: true,
      witnessedCountCourtSusanna: true,
      confirmsCountsPlan: true,
      basilioGossipedAboutCherubino: true,
      countHeardCherubinoRumor: true,
      cherubinoDiscovered: true,
      countRealizesCherubinoOverheard: true,
      cherubinoKnowsCountsPlan: true,
      figaroPubliclyPressuredCount: true,
      understandsFigaroPublicStrategy: true,
      countDelayedWedding: true,
      understandsCountCountermove: true,
      cherubinoSentToArmy: true,
    },
    affinity: {},
  },
} satisfies Record<string, ActStartPreset>

export type ActStartId = keyof typeof actStartPresets
