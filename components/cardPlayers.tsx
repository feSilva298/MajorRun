import { Player } from "@/.next/types/team"

type cardState = {
    player?: Player;
}

export default function CardPlayers({player}: cardState){
    const Item = false;

    if(!Item){
        return(
            <>
            <div className=" flex flex-col justify-center items-center w-[440px] h-[200px] bg-[#1C1C22] border-[#0B0B0F] border">
                <div className="flex flex-col p-6">
                    <p className="text-3xl text-[#EDEDED]">+</p>
                </div>
            </div>
            </>
        )
    }

    return(
        <>
        <div className=" flex flex-col justify-around w-[440px] h-[200px] bg-[#1C1C22] border-[#0B0B0F] border">
            <div className="flex flex-col p-6">
                <p className="text-4xl font-bold text-[#EDEDED]">{player?.name}FalleN</p>
                <p className=" text-xl text-[#EDEDED]">{player?.year}2016</p>
            </div>
            <div className="flex justify-end p-6 items-baseline space-x-4">
                <p className="text-[#EDEDED] text-xl">{player?.defaultRole}IGL</p>
                <p className="font-bold text-4xl text-[#EDEDED]">{player?.overall}99</p>
            </div>
        </div>
        </>
    )
}