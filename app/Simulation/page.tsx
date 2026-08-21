"use client"

import CardSimulation from "@/components/cardsimulation"
import Resume from "@/components/resume"
import { randomTeamsTournament, drawTeams,resultTeamB,resultFinal, resultTeamA } from "@/lib/configs"
import { useState, useEffect, useRef } from "react"
import { Team } from "@/lib/types/team"
import { useSimulationStore } from "@/lib/store"
import { useRouter } from "next/navigation"


export default function Simulation(){
    const router = useRouter()
    const dreamTeam = useSimulationStore(state => state.dreamTeam)
    const [allowed, setAllowed] = useState(false)
    const checkedRef = useRef(false)

    const [teams, setTeams] = useState<Team[]>([])
    const [results, setResults] = useState<{ scoreA: number; scoreB: number }[]>([])
    
 useEffect(() => {
    if (checkedRef.current) return 
        checkedRef.current = true


    const cameFromDraft = sessionStorage.getItem("cameFromDraft")

    if (!cameFromDraft) {
        router.replace("/Draft")
        return
    }

    sessionStorage.removeItem("cameFromDraft")
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAllowed(true)
    }, [router])

    useEffect(() => {
        if (!allowed) return
        if (useSimulationStore.getState().resultsGenerated) return

        const tournamentTeams = randomTeamsTournament()
        const drawnTeams = drawTeams(tournamentTeams)
        const strengthA = resultTeamA(drawnTeams)
        const strengthB = resultTeamB(dreamTeam)
        const finalResults = resultFinal(drawnTeams, strengthA, dreamTeam, strengthB)

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTeams(drawnTeams)
        setResults(finalResults)
        useSimulationStore.getState().setResultsGenerated(true)
    }, [allowed, dreamTeam])

    if (!allowed) {
        return null
    }

    return(
        <>
        
        <div className="flex bg-[#0b0b0f] w-full h-full p-8 justify-center">
            <p className="text-[#c8a24a] text-7xl font-bebas">A Campanha</p>    
        </div>

        <div className="flex justify-center bg-[#0b0b0f] h-full w-full">
        <div className="flex flex-col bg-[#1c1c22] w-[920px] h-full items-center gap-12 p-2">
            <CardSimulation teams={teams} results={results}/>
            <Resume/>
            </div>  
            </div>
        </>
    )
}