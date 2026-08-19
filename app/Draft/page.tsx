"use client"

import CardPlayers from "@/components/cardplayers"
import StarPlayer from "@/components/starplayer"
import Stats from "@/components/stastistics"
import SelectPlayers from "@/components/selectplayers"
import RerollTeams from "@/components/rerollteams"
import Link from "next/link"
import { getRandomTeams, resultTeamB, starPlayerTeamB } from "@/lib/configs"
import { Player, Team } from "@/lib/types/team"
import { useState, useEffect } from "react"
import json from "@/data/teams_with_ids.json"

export default function Draft(){

const [draftedTeams, setDraftedTeams] = useState<Team[]>([]);
const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
const [rounds, setRounds] = useState(1);
const [team, setTeam] = useState<(Player | null)[]>([null]);
const [countReroll, setCountReroll] = useState(0);
const [removeTeam, setRemoveTeam] = useState<Team[]>(json);
const [roleValue, setRoleValue] = useState([0,0,0,0,0]);


//functions Players ---------------------------------------------------------------------------------
function placePlayer(slotIndex: number) {
    if (!selectedPlayer) return false;
    if (team[slotIndex]) return false;

    setTeam((prev) => [...prev, selectedPlayer]);

    setSelectedPlayer(null);
    setRounds(prev => prev + 1);

    setRemoveTeam(prev =>
        prev.filter(team =>
            !team.players.some(obj => obj.idPlayer === selectedPlayer.idPlayer)
        )
    );

    return true;
}

function switchRolePlayer(index: number) {
    if(!team[index]) return;
    if(team[index].rolesAllowed.length === 1) return;

    setRoleValue(prev=>{
        const next = [...prev];

        next[index] = next[index] === 0 ? 1 : 0;

        return next;
    });
}
//-------------------------------------------------------------------------------------------------

//function starPlayer------------------------------------------------------------------------------
function placeStarPlayer() {
    if (!selectedPlayer) return false;

    setTeam(prev => {
        const next = [...prev];

        next[0] = selectedPlayer;

        return next;
    });

    setSelectedPlayer(null);
    setRounds(prev => prev + 1);
     setRemoveTeam(prev =>
        prev.filter(team =>
            !team.players.some(obj => obj.idPlayer === selectedPlayer.idPlayer)
        )
    );

    return true;
}

//--------------------------------------------------------------------------------------------------


function analysesRoles(){
    if(!team) return 

    return team.filter((player, index) => {
        const role = player?.rolesAllowed[roleValue[index]];

        return team.some((comparePlayer, compareIndex) => {
            if (index === compareIndex) return false;

            const compareRole = comparePlayer?.rolesAllowed[roleValue[compareIndex]];
    
            return role === compareRole;
        });
    });
}

resultTeamB(team)
starPlayerTeamB(team)

useEffect(() => { 
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraftedTeams(getRandomTeams(removeTeam));
}, [removeTeam]);

if (draftedTeams.length === 0) {
    return (
        <div className="flex items-center justify-center h-screen bg-[#0B0B0F] text-[#ededed]">
            Carregando...
        </div>
    );
}
    if (rounds == 6) {
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
                        <StarPlayer starPlayer={team[0]} handleClick={() => placeStarPlayer()} SwitchRole={switchRolePlayer} value={roleValue[0]} cardIndex={0} />
                    </div>
                    <div className="flex gap-6">
                        <CardPlayers player={team[1]} handleClick={() => placePlayer(1)} SwitchRole={switchRolePlayer} value={roleValue[1]} cardIndex={1} />
                        <CardPlayers player={team[2]} handleClick={() => placePlayer(2)} SwitchRole={switchRolePlayer} value={roleValue[2]} cardIndex={2}/>
                    </div>
                    <div className="flex gap-6">
                        <CardPlayers player={team[3]} handleClick={() => placePlayer(3)} SwitchRole={switchRolePlayer} value={roleValue[3]} cardIndex={3}/>
                        <CardPlayers player={team[4]} handleClick={() => placePlayer(4)} SwitchRole={switchRolePlayer} value={roleValue[4]} cardIndex={4}/>
                    </div>
                </div>
                <div className="bg-[#1C1C22] w-[350px] h-[750px] p-6">
                    <Stats players={team} playerRoleIdx={roleValue} analysesRoles={analysesRoles()} />
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
                    <p className="text-[#ededed] font-bold font-bebas text-6xl">Rodada {rounds}/5</p>
                </div>
                <div className="flex justify-center gap-6">
                <div className=" flex flex-col bg-[#1C1C22] w-[350px] h-[750px] p-6 gap-4">
                   <SelectPlayers  selectedTeams={draftedTeams} onSelectPlayer={setSelectedPlayer} />
                   {countReroll >= 3 ? "" : <RerollTeams removeTeam={removeTeam} setDraftedTeams={setDraftedTeams} setCountReroll={setCountReroll}  /> }
                   
                </div>
                <div className="bg-[#1C1C22] w-[1000px] h-[750px] flex flex-col justify-center items-center p-6 gap-6">
                    <div>
                        <StarPlayer starPlayer={team[0]} handleClick={() => placeStarPlayer()} SwitchRole={switchRolePlayer} value={roleValue[0]} cardIndex={0}/>
                    </div>
                    <div className="flex gap-6">
                        <CardPlayers player={team[1]} handleClick={() => placePlayer(1)} SwitchRole={switchRolePlayer} value={roleValue[1]} cardIndex={1} />
                        <CardPlayers player={team[2]} handleClick={() => placePlayer(2)} SwitchRole={switchRolePlayer} value={roleValue[2]} cardIndex={2}/>
                    </div>
                    <div className="flex gap-6">
                        <CardPlayers player={team[3]} handleClick={() => placePlayer(3)} SwitchRole={switchRolePlayer} value={roleValue[3]} cardIndex={3}/>
                        <CardPlayers player={team[4]} handleClick={() => placePlayer(4)} SwitchRole={switchRolePlayer} value={roleValue[4]} cardIndex={4}/>
                    </div>
                </div>
                <div className="bg-[#1C1C22] w-[350px] h-[750px] p-6">
                    <Stats players={team} playerRoleIdx={roleValue}  analysesRoles={analysesRoles()} />
                </div>  
            </div>
            </div> 
        </>
    )}