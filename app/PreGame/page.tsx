"use client"

import CardPlayers from "@/components/cardplayers"
import StarPlayer from "@/components/starplayer"
import Link from "next/link"

export default function PreGame(){
    return(
        <>
            <div className="flex flex-col lg:flex-row bg-[#0B0B0F] justify-center gap-6 items-center w-full min-h-screen p-6 lg:p-0">
                <div className="flex flex-col bg-[#1C1C22] w-full max-w-[600px] lg:w-[350px] lg:max-w-none lg:h-[750px] p-6">
                    <p className="text-[#EDEDED] text-base lg:text-xl text-justify leading-7 lg:leading-8">Antes de começar, monte seu time no draft escolhendo jogadores históricos de diferentes lineups do 
                        Counter-Strike. Cada decisão influencia a força, as funções e a sinergia da equipe.
                         Depois, acompanhe uma simulação completa do Major e descubra se sua escalação é capaz de conquistar o troféu.</p>
                    <div className="flex flex-col justify-end items-center mt-8 lg:mt-0 lg:h-full">
                        <Link href="/Draft">
                            <button className="text-[#EDEDED] hover:bg-[#c8a24a] transition-all duration-200 border-[#C8A24A] border text-lg lg:text-2xl p-3 lg:p-4 font-bold">Começar Campanha</button>
                        </Link>
                    </div>
                </div>
                <div className="bg-[#1C1C22] w-full max-w-[600px] lg:w-[1000px] lg:max-w-none lg:h-[750px] flex flex-col items-center p-6 gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <div className="sm:col-span-2">
                            <StarPlayer/>
                        </div>
                        <CardPlayers />
                        <CardPlayers/>
                        <CardPlayers/>
                        <CardPlayers/>
                    </div>
                </div>
                <div className="hidden lg:block bg-[#1C1C22] w-[350px] h-[750px] p-6">
                    
                </div>  
            </div> 
        </>
    )
}