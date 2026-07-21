"use client"

import { getRandomTeams } from "@/lib/teams";
import { Player, Team } from "@/lib/types/team";

type Props = {
    starPlayer: Player | null;
    onclick: () => boolean
 
}

export default function StarPlayer({starPlayer, onclick}: Props){

    const StarPlayer = starPlayer

    if(starPlayer){
        return(
            <>
            <div className="flex bg-[#C8A24A] w-full rounded-tr-4xl">
                <p className="text-xl font-bold px-4 py-0.5">Star Player</p>
            </div> 
         <div className=" flex flex-col justify-center w-[904px] h-[200px] bg-[#1C1C22] border-[#C8A24A] border-2">

            <div className="flex flex-col items-start p-6">
                <p className="text-4xl font-bold text-[#EDEDED]">{StarPlayer?.name}<span className="text-xl font-normal ml-2">{StarPlayer?.description}</span></p>                
                <p className=" text-xl text-[#EDEDED]">{StarPlayer?.teamYear}</p>
            </div>
            
            <div className="flex justify-end p-6 items-baseline space-x-4">
                <p className="text-[#EDEDED] text-xl">IGL</p>
                <p className="font-bold text-4xl text-[#EDEDED]">{StarPlayer?.overall}</p>
            </div>
        </div>
        </>
        )
    }
        return(
            <button onClick={onclick}>
                <div className="flex bg-[#C8A24A] w-full rounded-tr-4xl">
                    <p className="text-xl font-bold px-4 py-0.5">Star Player</p>
                </div> 
                <div className=" flex flex-col justify-center items-center w-[904px] h-[200px] bg-[#1C1C22] border-[#C8A24A] border-2">
                    <div className="flex flex-col p-6">
                        <p className="text-3xl text-[#EDEDED]">+<span className="text-xl font-normal ml-2"></span></p>                
                    </div>
                </div>
            </button>
        )

        
        
    
}