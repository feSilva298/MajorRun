"use client"

import CardSimulation from "@/components/cardsimulation"
import Resume from "@/components/resume"
import { randomTeamsTournament, drawTeams } from "@/lib/teams"
import { useState, useEffect } from "react"
import { Team } from "@/lib/types/team"

export default function Simulation(){

    const [teams, setTeams] = useState<Team[]>([])
    const [maps, setMaps] = useState(["Mirage", "Inferno", "Dust2", "Ancient","Overpass", "Cache", "Anubis", "Nuke", "Train", "Vertigo", "Cobblestone"])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTeams(drawTeams())
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