"use client "

import CardPlayers from "@/components/cardPlayers"
import StarPlayer from "@/components/starplayer"
import Link from "next/link"

export default function PreJogo(){
    return(
        <>
            <div className="flex bg-[#0B0B0F] justify-center gap-6 items-center w-screen h-screen">
                <div className=" flex flex-col bg-[#1C1C22] w-[350px] h-[750px] p-6">
                    <p className="text-[#EDEDED] text-xl text-justify leading-8">Antes de começar, monte seu time no draft escolhendo jogadores históricos de diferentes lineups do 
                        Counter-Strike. Cada decisão influencia a força, as funções e a sinergia da equipe.
                         Depois, acompanhe uma simulação completa do Major e descubra se sua escalação é capaz de conquistar o troféu.</p>
                    <div className="flex flex-col justify-end items-center h-full">
                        <Link href="/Draft">
                            <button className="text-[#EDEDED] hover:bg-[#c8a24a] transition-all duration-200 border-[#C8A24A] border text-2xl p-4 font-bold">Começar Campanha</button>
                        </Link>
                    </div>
                </div>
                <div className="bg-[#1C1C22] w-[1000px] h-[750px] flex flex-col justify-center items-center p-6 gap-6">
                    <div>
                        <StarPlayer/>
                    </div>
                    <div className="flex gap-6">
                        <CardPlayers />
                        <CardPlayers/>
                    </div>
                    <div className="flex gap-6">
                        <CardPlayers/>
                        <CardPlayers/>
                    </div>
                </div>
                <div className="bg-[#1C1C22] w-[350px] h-[750px] p-6">
                    
                </div>  
            </div> 
        </>
    )
}