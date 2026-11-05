import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { Player, Team } from "./types/team"

type MatchResult = { scoreA: number; scoreB: number }

type SimulationStore = {
  dreamTeam: (Player | null)[]
  setDreamTeam: (team: (Player | null)[]) => void
  opponents: Team[]
  setOpponents: (teams: Team[]) => void
  results: MatchResult[]
  setResults: (results: MatchResult[]) => void
  resultsGenerated: boolean
  setResultsGenerated: (v: boolean) => void
}

export const useSimulationStore = create<SimulationStore>()(
  persist(
    (set) => ({
      dreamTeam: [],
      setDreamTeam: (team) => set({ dreamTeam: team }),
      opponents: [],
      setOpponents: (teams) => set({ opponents: teams }),
      results: [],
      setResults: (results) => set({ results }),
      resultsGenerated: false,
      setResultsGenerated: (v) => set({ resultsGenerated: v }),
    }),
    {
      name: "majorrun-simulation",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ dreamTeam: state.dreamTeam }),
    }
  )
)