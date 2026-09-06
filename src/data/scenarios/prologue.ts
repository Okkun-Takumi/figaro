import type { Scenario } from "../../engine/types"

export const prologue = {
  id: "prologue",
  title: "プロローグ",
  initialSceneId: "town-square",
  scenes: {
    "town-square": {
      id: "town-square",
      initialNodeId: "arrival",
      nodes: {
        arrival: {
          type: "dialogue",
          id: "arrival",
          speakerId: "figaro",
          text: "来てくれたんだね。少し、頼みたいことがあるんだ。",
          presentation: {
            backgroundId: "town-square-day",
            characters: [{ characterId: "figaro", expressionId: "smile", position: "center" }],
          },
          next: { nodeId: "first-choice" },
        },
        "first-choice": {
          type: "choice",
          id: "first-choice",
          prompt: "どう答える？",
          choices: [
            {
              id: "help",
              text: "もちろん、手伝うよ",
              effects: [
                { type: "setFlag", key: "offeredHelp", value: true },
                { type: "changeAffinity", characterId: "figaro", amount: 2 },
              ],
              next: { nodeId: "help-reaction" },
            },
            {
              id: "decline",
              text: "今は難しいかも",
              effects: [
                { type: "setFlag", key: "offeredHelp", value: false },
                { type: "changeAffinity", characterId: "figaro", amount: -1 },
              ],
              next: { nodeId: "decline-reaction" },
            },
          ],
        },
        "help-reaction": {
          type: "dialogue",
          id: "help-reaction",
          speakerId: "figaro",
          text: "本当？ 君がいてくれるなら心強いよ。",
          presentation: {
            characters: [{ characterId: "figaro", expressionId: "smile", position: "center" }],
          },
          next: { nodeId: "rejoin" },
        },
        "decline-reaction": {
          type: "dialogue",
          id: "decline-reaction",
          speakerId: "figaro",
          text: "そうか。無理は言えないね。",
          presentation: {
            characters: [{ characterId: "figaro", expressionId: "sad", position: "center" }],
          },
          next: { nodeId: "rejoin" },
        },
        rejoin: {
          type: "branch",
          id: "rejoin",
          branches: [
            {
              when: { type: "affinity", characterId: "figaro", operator: ">=", value: 2 },
              next: { nodeId: "warm-followup" },
            },
          ],
          default: { nodeId: "normal-followup" },
        },
        "warm-followup": {
          type: "dialogue",
          id: "warm-followup",
          speakerId: "figaro",
          text: "では、一緒に行こう。きっと忘れられない一日になる。",
          next: { nodeId: "chapter-end" },
        },
        "normal-followup": {
          type: "dialogue",
          id: "normal-followup",
          speakerId: "figaro",
          text: "では、また別の機会に。先へ進もう。",
          next: { nodeId: "chapter-end" },
        },
        "chapter-end": { type: "end", id: "chapter-end" },
      },
    },
  },
} satisfies Scenario
