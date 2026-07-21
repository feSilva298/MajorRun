"use client"    

import { Player, Team } from "@/lib/types/team"
import { getRandomTeams } from "@/lib/teams"


type Props = {
    player: Player | null;
    onclick: () => boolean
}

export default function CardPlayers({player, onclick}: Props){
    const sentPlayer = player

    if(sentPlayer){
        return(
            <><div className=" flex flex-col justify-around w-[440px] h-[200px] bg-[#1C1C22] border-[#0B0B0F] border">
            <div className="flex flex-col items-start p-6">
                <p className="text-4xl font-bold text-[#EDEDED]">{sentPlayer?.name}</p>
                <p className=" text-xl text-[#EDEDED]">{sentPlayer?.teamYear}</p>
            </div>
            <div className="flex justify-end p-6 items-baseline space-x-4">
                <p className="text-[#EDEDED] text-xl">{sentPlayer?.defaultRole}</p>
                <p className="font-bold text-4xl text-[#EDEDED]">{sentPlayer?.overall}</p>
            </div>
        </div></>
        )
    }
        return(
            <button onClick={onclick}>
                <div className=" flex flex-col justify-center items-center w-[440px] h-[200px] bg-[#1C1C22] border-[#0B0B0F] border">
                    <div className="flex flex-col p-6">
                        <p className="text-3xl text-[#EDEDED]">+</p>
                    </div>
                </div> 
            </button>
        )
    }