"use client"

import { Player } from "@/lib/types/team";
import { ArrowLeftRight } from "lucide-react";

type Props = {
    starPlayer?: Player | null
    handleClick?: () => boolean
    SwitchRole?: (index: number) => void
    value?: number
    cardIndex?: number
}

export default function StarPlayer({starPlayer, handleClick, SwitchRole, cardIndex = 0, value = 0}: Props){

    if(starPlayer){
        return(
            <>
            <div className="flex bg-[#C8A24A] w-full rounded-tr-4xl">
                <p className="text-lg sm:text-xl font-bold px-4 py-0.5">Star Player</p>
            </div> 
         <div className="flex flex-col justify-center w-full min-h-[200px] bg-[#1C1C22] border-[#C8A24A] border-2">

            <div className="flex flex-col items-start p-4 sm:p-6">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#EDEDED]">{starPlayer?.name}<span className="text-base sm:text-lg md:text-xl font-normal ml-2">{starPlayer?.description}</span></p>                
                <p className="text-base sm:text-lg md:text-xl text-[#EDEDED]">{starPlayer?.teamYear}</p>
            </div>
            
            {starPlayer.rolesAllowed.length === 1 ? <div className="flex justify-end p-4 sm:p-6 items-baseline space-x-4">
                    <p className="text-[#EDEDED] text-base sm:text-lg md:text-xl">{starPlayer?.rolesAllowed}</p>
                    <p className="font-bold text-2xl sm:text-3xl md:text-4xl text-[#EDEDED]">{starPlayer?.overall}</p>
                </div> : <div className="flex justify-end p-4 sm:p-6 items-baseline space-x-4">
                <div className="flex gap-2">
                    <button onClick={() => SwitchRole?.(cardIndex)}>
                        <ArrowLeftRight className="w-5 h-5 text-[#ededed]"/>
                    </button>
                    <p className="text-[#EDEDED] text-base sm:text-lg md:text-xl">{starPlayer?.rolesAllowed[value]}</p>
                </div>
                    <p className="font-bold text-2xl sm:text-3xl md:text-4xl text-[#EDEDED]">{starPlayer?.overall}</p>
                </div> }
            
                
            </div>
        </>
        )
    }
        return(
            <button onClick={handleClick} className="w-full">
                <div className="flex bg-[#C8A24A] w-full rounded-tr-4xl">
                    <p className="text-lg sm:text-xl font-bold px-4 py-0.5">Star Player</p>
                </div> 
                <div className="flex flex-col justify-center items-center w-full min-h-[200px] bg-[#1C1C22] border-[#C8A24A] border-2">
                    <div className="flex flex-col p-6">
                        <p className="text-2xl sm:text-3xl text-[#EDEDED]">+<span className="text-xl font-normal ml-2"></span></p>                
                    </div>
                </div>
            </button>
        )
}