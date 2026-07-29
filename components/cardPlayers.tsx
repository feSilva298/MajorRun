"use client"    

import { Player } from "@/lib/types/team"
import { ArrowLeftRight } from "lucide-react";

type Props = {
    player?: Player | null
    handleClick?: () => boolean
    SwitchRole?: (index:number) => void
    value: number
    cardIndex: number
}


export default function CardPlayers({player, handleClick, SwitchRole, value, cardIndex}: Props){
 

    if(player){
        return(
            <><div className=" flex flex-col justify-around w-[440px] h-[200px] bg-[#1C1C22] border-[#0B0B0F] border">
            <div className="flex flex-col items-start p-6">
                <p className="text-4xl font-bold text-[#EDEDED]">{player?.name}</p>
                <p className=" text-xl text-[#EDEDED]">{player?.teamYear}</p>
            </div>

            {player?.rolesAllowed.length === 1 ? <div className="flex justify-end p-6 items-baseline space-x-4">
                    <p className="text-[#EDEDED] text-xl">{player?.rolesAllowed}</p>
                <p className="font-bold text-4xl text-[#EDEDED]">{player?.overall}</p>
            </div> : <div className="flex justify-end p-6 items-baseline space-x-4">
                <div className="flex gap-2">
                    <button onClick={() => SwitchRole?.(cardIndex)}>
                        <ArrowLeftRight className="w-5 h-5 text-[#ededed]"/>
                    </button>
                    <p className="text-[#EDEDED] text-xl">{player?.rolesAllowed[value]}</p>
                </div>
                <p className="font-bold text-4xl text-[#EDEDED]">{player?.overall}</p>
            </div>} 
            </div></>
        )
    }
        return(
            <button onClick={handleClick}>
                <div className=" flex flex-col justify-center items-center w-[440px] h-[200px] bg-[#1C1C22] border-[#0B0B0F] border">
                    <div className="flex flex-col p-6">
                        <p className="text-3xl text-[#EDEDED]">+</p>
                    </div>
                </div> 
            </button>
        )
    }