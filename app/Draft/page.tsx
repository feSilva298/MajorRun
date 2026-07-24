"use client"

import CardPlayers from "@/components/cardPlayers"
import StarPlayer from "@/components/starplayer"
import Stats from "@/components/stastistics"
import SelectPlayers from "@/components/selectplayers"
import RerollTeams from "@/components/rerollteams"
import Link from "next/link"
import { getRandomTeams } from "@/lib/teams"
import { Player, Team } from "@/lib/types/team"
import { useState, useEffect } from "react"
import json from "@/data/teams_with_ids.json"

export default function Draft(){

const [draftedTeams, setDraftedTeams] = useState<Team[]>([]);
const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
const [starPlayer, setStarPlayer] = useState<Player | null>(null);
const [cards, setCards] = useState<(Player | null)[]>([null,null,null,null]);
const [rodadas, setRodadas] = useState(1)
const [countReroll, setCountReroll] = useState(0)
const [removeTeam, setRemoveTeam] = useState<Team[]>(json)

function placePlayer(index: number): boolean {
    if (!selectedPlayer) return false;
    if (cards[index]) return false;

    const newCards = [...cards];                                                
    newCards[index] = selectedPlayer;
    setCards(newCards);

    setSelectedPlayer(null);
    setRodadas(prev => prev + 1);
    setRemoveTeam(prev => prev.filter(team => !team.players.some(obj => obj.idPlayer === selectedPlayer.idPlayer)))
    setDraftedTeams(getRandomTeams());

    return true;
}
    
function placeStarPlayer(): boolean {
    if (!selectedPlayer) return false;
    if (starPlayer) return false;
    
    setStarPlayer(selectedPlayer);
    setSelectedPlayer(null);

    setRodadas(prev => prev + 1);
    setRemoveTeam(prev => prev.filter(team => !team.players.some(obj => obj.idPlayer === selectedPlayer.idPlayer)))
    setDraftedTeams(getRandomTeams());

    return true;
}   
    useEffect(() => { 
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDraftedTeams(getRandomTeams());
}, [removeTeam]);

if (draftedTeams.length === 0) {
    return (
        <div className="flex items-center justify-center h-screen bg-[#0B0B0F] text-[#ededed]">
            Carregando...
        </div>
    );
}
    if (rodadas == 6) {
        return(
            <>
            <div className="flex flex-col bg-[#0B0B0F] justify-center gap-6 w-screen h-screen">
                <div className="flex justify-center gap-330">
                    <p className="text-[#ededed] font-bold font-bebas text-6xl">Draft</p>
                    <p className="text-[#ededed] font-bold font-bebas text-6xl">Rodada 5/5</p>
                </div>
                <div className="flex justify-center gap-6">
                
                    <div className="flex bg-[#1C1C22] w-[350px] h-[750px] p-6 justify-center">
                        <Link href="/Simulation" className="h-fit hover:bg-[#c8a24a] transition-all duration-200">
                            <button className="w-[300px] text-[#ededed] text-4xl font-bold border-[#c8a24a] border-2 p-6">Começar</button>
                        </Link>
                    </div>
                
                <div className="bg-[#1C1C22] w-[1000px] h-[750px] flex flex-col justify-center items-center p-6 gap-6">
                    <div>
                        <StarPlayer starPlayer={starPlayer} handleClick={placeStarPlayer} />
                    </div>
                    <div className="flex gap-6">
                        <CardPlayers player={cards[0]} handleClick={() => placePlayer(0)} />
                        <CardPlayers player={cards[1]} handleClick={() => placePlayer(1)} />
                    </div>
                    <div className="flex gap-6">
                        <CardPlayers player={cards[2]} handleClick={() => placePlayer(2)} />
                        <CardPlayers player={cards[3]} handleClick={() => placePlayer(3)} />
                    </div>
                </div>
                <div className="bg-[#1C1C22] w-[350px] h-[750px] p-6">
                    <Stats overallStarPlayer={starPlayer} overallPlayers={cards} />
                </div>  
            </div>
            </div>    
            </>
        )
    }
    return(
        <>
        
            <div className="flex flex-col bg-[#0B0B0F] justify-center gap-6 w-screen h-screen">
                <div className="flex justify-center gap-330">
                    <p className="text-[#ededed] font-bold font-bebas text-6xl">Draft</p>
                    <p className="text-[#ededed] font-bold font-bebas text-6xl">Rodada {rodadas}/5</p>
                </div>
                <div className="flex justify-center gap-6">
                <div className=" flex flex-col bg-[#1C1C22] w-[350px] h-[750px] p-6 gap-4">
                   <SelectPlayers  selectedTeams={draftedTeams} onSelectPlayer={setSelectedPlayer} />
                   {countReroll >= 3 ? "" : <RerollTeams setDraftedTeams={setDraftedTeams} setCountReroll={setCountReroll}  /> }
                   
                </div>
                <div className="bg-[#1C1C22] w-[1000px] h-[750px] flex flex-col justify-center items-center p-6 gap-6">
                    <div>
                        <StarPlayer starPlayer={starPlayer} handleClick={placeStarPlayer} />
                    </div>
                    <div className="flex gap-6">
                        <CardPlayers player={cards[0]} handleClick={() => placePlayer(0)} />
                        <CardPlayers player={cards[1]} handleClick={() => placePlayer(1)} />
                    </div>
                    <div className="flex gap-6">
                        <CardPlayers player={cards[2]} handleClick={() => placePlayer(2)} />
                        <CardPlayers player={cards[3]} handleClick={() => placePlayer(3)} />
                    </div>
                </div>
                <div className="bg-[#1C1C22] w-[350px] h-[750px] p-6">
                    <Stats overallStarPlayer={starPlayer} overallPlayers={cards}/>
                </div>  
            </div>
            </div> 
        </>
    )}