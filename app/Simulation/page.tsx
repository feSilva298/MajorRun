"use client"

import CardSimulation from "@/components/cardsimulation"
import Resume from "@/components/resume"
import { randomTeamsTournament, drawTeams, drawMaps, resultTeamB, resultFinal, resultTeamA, resolveCampaign, resolvePlayoffs } from "@/lib/configs"
import { useState, useEffect, useRef } from "react"
import { Team, CampaignMatch, PlayoffResult } from "@/lib/types/team"
import { useSimulationStore } from "@/lib/store"
import { useRouter } from "next/navigation"


export default function Simulation(){
    const router = useRouter()
    const dreamTeam = useSimulationStore(state => state.dreamTeam)
    const [allowed, setAllowed] = useState(false)
    const checkedRef = useRef(false)

    const [teams, setTeams] = useState<Team[]>([])
    const [scoreBoard, setScoreBoard] = useState<CampaignMatch[]>([])
    const [playoffResult, setPlayoffResult] = useState<PlayoffResult | null>(null)
    const [maps, setMaps] = useState<string[]>([])
    const [campaignEnded, setCampaignEnded] = useState(false)

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
        const drawnTeams = drawTeams(tournamentTeams, 8)

        const swissOpponents = drawnTeams.slice(0, 5)
        const quarterOpponent = drawnTeams[5]
        const semiOpponent = drawnTeams[6]
        const finalOpponent = drawnTeams[7]

        const strengthA = resultTeamA(swissOpponents)
        const strengthB = resultTeamB(dreamTeam)
        const finalResults = resultFinal(swissOpponents, strengthA, dreamTeam, strengthB)
        const campaign = resolveCampaign(finalResults)

        let playoffs: PlayoffResult | null = null
        if (campaign.status === "qualified") {
            playoffs = resolvePlayoffs(quarterOpponent, semiOpponent, finalOpponent, dreamTeam)
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTeams(drawnTeams)
        setScoreBoard(campaign.matches)
        setPlayoffResult(playoffs)
        setMaps(drawMaps())
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

        <div className="flex justify-center bg-[#0b0b0f] min-h-screen w-full">
        <div className="flex flex-col bg-[#1c1c22] w-[920px] h-full items-center gap-12 p-2">
            <CardSimulation
                teams={teams}
                scoreBoard={scoreBoard}
                playoffResult={playoffResult}
                maps={maps}
                onCampaignEnd={() => setCampaignEnded(true)}
            />
            {campaignEnded && (
                <Resume
                    teams={teams}
                    scoreBoard={scoreBoard}
                    playoffResult={playoffResult}
                    dreamTeam={dreamTeam}
                    maps={maps}
                />
            )}
            </div>  
            </div>
        </>
    )
}