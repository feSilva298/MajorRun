"use client"

import CardSimulation from "@/components/cardsimulation"
import Resume from "@/components/resume"
import { randomTeamsTournament, drawTeams,  drawMaps, resultDuel } from "@/lib/configs"
import { useState, useEffect } from "react"
import { Team } from "@/lib/types/team"

export default function Simulation(){

    const [teams, setTeams] = useState<Team[]>([])
    
    useEffect(() => {
    const tournamentTeams = randomTeamsTournament()
    const drawnTeams = drawTeams(tournamentTeams)
    const results = resultDuel(drawnTeams)

    console.log("16 TIMES:", tournamentTeams)
    console.log("5 TIMES:", drawnTeams)
    console.log("OVERALLS:", results)

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTeams(drawnTeams)
    },[])


    return(
        <>
        
        <div className="flex bg-[#0b0b0f] w-full h-full p-8 justify-center">
            <p className="text-[#c8a24a] text-7xl font-bebas">A Campanha</p>    
        </div>

        <div className="flex justify-center bg-[#0b0b0f] h-full w-full">
        <div className="flex flex-col bg-[#1c1c22] w-[920px] h-full items-center gap-12 p-2">
            <CardSimulation teams={teams}/>
            <Resume/>
            </div>  
            </div>
        </>
    )
}