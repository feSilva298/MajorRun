"use client"    

import { Player } from "@/lib/types/team"
import { useState } from "react"


type Props = {
    player: Player | null;
    handleClick: () => boolean
}

export default function CardPlayers({player, handleClick}: Props){
    const [value, setValue] = useState(0)
    const [active, setActive] = useState(false)
    const sentPlayer = player

    function SwitchRole(index:number) {
        if(sentPlayer?.rolesAllowed.length === 1) return;

        if(active){
            setValue(value - 1)
        }
        else{
            setValue(value + 1)
        }

        setActive(!active)

        return sentPlayer?.rolesAllowed[index]
    }

    if(sentPlayer){
        return(
            <><div className=" flex flex-col justify-around w-[440px] h-[200px] bg-[#1C1C22] border-[#0B0B0F] border">
            <div className="flex flex-col items-start p-6">
                <p className="text-4xl font-bold text-[#EDEDED]">{sentPlayer?.name}</p>
                <p className=" text-xl text-[#EDEDED]">{sentPlayer?.teamYear}</p>
            </div>
            <div className="flex justify-end p-6 items-baseline space-x-4">
                <button onClick={() => SwitchRole(value)}>
                    <p className="text-[#EDEDED] text-xl">{sentPlayer?.rolesAllowed[value]}</p>
                </button>
                <p className="font-bold text-4xl text-[#EDEDED]">{sentPlayer?.overall}</p>
            </div>
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