"use client"

import CardPlayers from "@/components/cardplayers"
import StarPlayer from "@/components/starplayer"
import Stats from "@/components/stastistics"
import SelectPlayers from "@/components/selectplayers"
import RerollTeams from "@/components/rerollteams"
import Link from "next/link"
import { getRandomTeams } from "@/lib/configs"
import { Player, Team } from "@/lib/types/team"
import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import json from "@/data/teams_with_ids.json"
import { useSimulationStore } from "@/lib/store"

export default function Draft(){

const [draftedTeams, setDraftedTeams] = useState<Team[]>([]);
const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
const [rounds, setRounds] = useState(1);
const [team, setTeam] = useState<(Player | null)[]>([null]);
const [countReroll, setCountReroll] = useState(0);
const [removeTeam, setRemoveTeam] = useState<Team[]>(json);
const [roleValue, setRoleValue] = useState([0,0,0,0,0]);
const setDreamTeam = useSimulationStore(state => state.setDreamTeam)

const cardsSectionRef = useRef<HTMLDivElement>(null)

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

useEffect(() => { 
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraftedTeams(getRandomTeams(removeTeam));
}, [removeTeam]);

/*
 * Quando um jogador é selecionado (fora do modo "rounds === 6",
 * que já não tem seleção), rola a tela até os cards, focando
 * neles sem precisar de scroll manual — principal utilidade no mobile.
 */
useEffect(() => {
    if (selectedPlayer) {
        cardsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
}, [selectedPlayer])

if (draftedTeams.length === 0) {
    return (
        <div className="flex items-center justify-center h-screen bg-[#0B0B0F] text-[#ededed]">
            Carregando...
        </div>
    );
}

/*
 * Classe aplicada em cada wrapper de card: quando há um jogador
 * selecionado, os slots vazios sobem de camada (acima do overlay)
 * e ganham destaque; os preenchidos ficam por baixo, escurecidos
 * junto com o resto da tela.
 */
const slotClass = (filled: boolean) =>
    selectedPlayer && !filled
        ? "relative z-50 ring-2 ring-[#c8a24a] rounded-sm scale-[1.03] transition-all duration-200"
        : "transition-all duration-200"

    if (rounds == 6) {
        return(
            <>
            <div className="flex flex-col bg-[#0B0B0F] items-center gap-6 w-full min-h-screen p-6 lg:p-0 lg:justify-center">
                <div className="flex justify-between w-full max-w-[600px] lg:max-w-[1700px]">
                    <p className="text-[#ededed] font-bold font-bebas text-3xl sm:text-4xl lg:text-6xl">Draft</p>
                    <p className="text-[#ededed] font-bold font-bebas text-3xl sm:text-4xl lg:text-6xl">Rodada 5/5</p>
                </div>
                <div className="flex flex-col lg:flex-row justify-center gap-6 w-full items-center">
                
                    <div className="flex bg-[#1C1C22] w-full max-w-[600px] lg:w-[350px] lg:max-w-none lg:h-[750px] p-6 justify-center items-center lg:items-start">
                        <Link href="/Simulation" onClick={() => {setDreamTeam(team); sessionStorage.setItem("cameFromDraft", "true")}} className="w-full max-w-[300px] hover:bg-[#c8a24a] transition-all duration-200">
                            <button className="w-full text-[#ededed] text-2xl sm:text-3xl lg:text-4xl font-bold border-[#c8a24a] border-2 p-4 lg:p-6">Começar</button>
                        </Link>
                    </div>
                
                <div className="bg-[#1C1C22] w-full max-w-[600px] lg:w-[1000px] lg:max-w-none lg:h-[750px] flex flex-col items-center p-6 gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <div className="sm:col-span-2">
                            <StarPlayer starPlayer={team[0]} handleClick={() => placeStarPlayer()} SwitchRole={switchRolePlayer} value={roleValue[0]} cardIndex={0} />
                        </div>
                        <CardPlayers player={team[1]} handleClick={() => placePlayer(1)} SwitchRole={switchRolePlayer} value={roleValue[1]} cardIndex={1} />
                        <CardPlayers player={team[2]} handleClick={() => placePlayer(2)} SwitchRole={switchRolePlayer} value={roleValue[2]} cardIndex={2}/>
                        <CardPlayers player={team[3]} handleClick={() => placePlayer(3)} SwitchRole={switchRolePlayer} value={roleValue[3]} cardIndex={3}/>
                        <CardPlayers player={team[4]} handleClick={() => placePlayer(4)} SwitchRole={switchRolePlayer} value={roleValue[4]} cardIndex={4}/>
                    </div>
                </div>
                <div className="bg-[#1C1C22] w-full max-w-[600px] lg:w-[350px] lg:max-w-none lg:h-[750px] p-6">
                    <Stats players={team} playerRoleIdx={roleValue} analysesRoles={analysesRoles()} />
                </div>  
            </div>
            </div>    
            </>
        )
    }
    return(
        <>
            <AnimatePresence>
                {selectedPlayer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 bg-black/60 z-40"
                        onClick={() => setSelectedPlayer(null)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {selectedPlayer && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1c1c22] border border-[#c8a24a] px-4 py-2 rounded-full max-w-[90vw]"
                    >
                        <p className="text-[#ededed] text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                            Escolha um espaço vazio para <span className="text-[#c8a24a] font-bold">{selectedPlayer.name}</span>
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col bg-[#0B0B0F] items-center gap-6 w-full min-h-screen p-6 lg:p-0 lg:justify-center">
                <div className="flex justify-between w-full max-w-[600px] lg:max-w-[1700px]">
                    <p className="text-[#ededed] font-bold font-bebas text-3xl sm:text-4xl lg:text-6xl">Draft</p>
                    <p className="text-[#ededed] font-bold font-bebas text-3xl sm:text-4xl lg:text-6xl">Rodada {rounds}/5</p>
                </div>
                <div className="flex flex-col lg:flex-row justify-center gap-6 w-full items-center lg:items-start">
                <div className="flex flex-col bg-[#1C1C22] w-full max-w-[600px] lg:w-[350px] lg:max-w-none lg:h-[750px] p-6 gap-4">
                   <SelectPlayers  selectedTeams={draftedTeams} onSelectPlayer={setSelectedPlayer} />
                   {countReroll >= 3 ? "" : <RerollTeams removeTeam={removeTeam} setDraftedTeams={setDraftedTeams} setCountReroll={setCountReroll}  /> }
                   
                </div>
                <div ref={cardsSectionRef} className="bg-[#1C1C22] w-full max-w-[600px] lg:w-[1000px] lg:max-w-none lg:h-[750px] flex flex-col items-center p-6 gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <div className={`sm:col-span-2 ${slotClass(!!team[0])}`}>
                            <StarPlayer starPlayer={team[0]} handleClick={() => placeStarPlayer()} SwitchRole={switchRolePlayer} value={roleValue[0]} cardIndex={0}/>
                        </div>
                        <div className={slotClass(!!team[1])}>
                            <CardPlayers player={team[1]} handleClick={() => placePlayer(1)} SwitchRole={switchRolePlayer} value={roleValue[1]} cardIndex={1} />
                        </div>
                        <div className={slotClass(!!team[2])}>
                            <CardPlayers player={team[2]} handleClick={() => placePlayer(2)} SwitchRole={switchRolePlayer} value={roleValue[2]} cardIndex={2}/>
                        </div>
                        <div className={slotClass(!!team[3])}>
                            <CardPlayers player={team[3]} handleClick={() => placePlayer(3)} SwitchRole={switchRolePlayer} value={roleValue[3]} cardIndex={3}/>
                        </div>
                        <div className={slotClass(!!team[4])}>
                            <CardPlayers player={team[4]} handleClick={() => placePlayer(4)} SwitchRole={switchRolePlayer} value={roleValue[4]} cardIndex={4}/>
                        </div>
                    </div>
                </div>
                <div className="bg-[#1C1C22] w-full max-w-[600px] lg:w-[350px] lg:max-w-none lg:h-[750px] p-6">
                    <Stats players={team} playerRoleIdx={roleValue}  analysesRoles={analysesRoles()} />
                </div>  
            </div>
            </div> 
        </>
    )}