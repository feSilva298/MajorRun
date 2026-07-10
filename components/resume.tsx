import { Separator } from "./ui/separator"
import Link from "next/link"

export default function Resume(){
    const win = true

    if(!win){
        return(
            <>
            <div className="bg-[#1c1c22] flex flex-col justify-center w-[910px] h-[500px] p-6 border border-[#0b0b0f]">

            <div className="flex justify-center">
                <p className="text-[122px] text-[#c8a24a] font-bold font-bebas">Campanha encerrada</p> 
            </div>
            <Separator orientation="horizontal" className="bg-[#0b0b0f] w-full" />   
            <div className="flex flex-col p-6 gap-12">
            
                <div className="flex flex-col">
                    <p className="text-[#ededed] font-bold">Resumo da Campanha:</p>
                    <div className="flex gap-10">
                        <div className="flex flex-col">
                            <p className="text-[#ededed] font-semibold text-2xl">5</p>
                            <p className="text-[#c8a24a]">vitorias</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[#ededed] font-semibold text-2xl">1</p>
                            <p className="text-[#c8a24a]">derrotas</p>
                        </div>
                        <div>
                            <p className="text-[#ededed] font-semibold text-2xl">1</p>
                            <p className="text-[#c8a24a]">MVPs</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-fit">
                <div className="flex flex-col">
                    <div>
                        <p className="text-[#c8a24a] font-bold text-3xl">Star Player</p>
                    </div>
                    <div className="flex gap-8 px-2 py-1">
                        <div className="flex flex-col">
                            <div className="flex gap-2">
                                <p className="text-[#ededed] font-bold text-xl">FalleN</p>
                                <p className="text-[#ededed] text-xl">The Professor</p>
                            </div>
                            <div>
                                <p className="text-[#ededed] text-sm font-extralight">2016</p>
                            </div>
                        </div>
                       <div className="flex gap-6">
                            <div>
                                <p className="text-[#ededed] font-semibold text-2xl">0</p>
                                <p className="text-[#c8a24a]">MVPs</p>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex gap-1">
                                    <p className="text-[#ededed] text-xs font-light">vs</p>
                                    <p className="text-[#ededed] text-2xl font-bold" >NAVI 2016</p>
                                </div>
                                <div className="flex justify-end ml-15">
                                    <p className="text-[#c8a24a]">Melhor Partida</p>
                                </div>
                            </div>
                        
                       </div>
                    </div>
                </div>
                
                </div>
            </div>

        </div>

        <div className="w-full flex justify-center">
            <Link href="/PreGame">
                <button className="border-[#c8a24a] border p-2 hover:bg-[#c8a24a] transition-all duration-200"><p className="text-[#ededed] text-2xl font-bold">Começar nova campanha</p></button>
            </Link>
        </div>
            </>
        )
    }


    return(
        <>
        <div className="bg-[#1c1c22] flex flex-col justify-center w-[910px] h-[500px] p-6 border border-[#0b0b0f]">

            <div className="flex justify-center">
                <p className="text-[143px] text-[#c8a24a] font-bold font-bebas">Campeão do Major</p> 
            </div>
            <Separator orientation="horizontal" className="bg-[#0b0b0f] w-full" />   
            <div className="flex flex-col p-6 gap-12">
            
                <div className="flex flex-col">
                    <p className="text-[#ededed] font-bold">Resumo da Campanha:</p>
                    <div className="flex gap-10">
                        <div className="flex flex-col">
                            <p className="text-[#ededed] font-semibold text-2xl">6</p>
                            <p className="text-[#c8a24a]">vitorias</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[#ededed] font-semibold text-2xl">0</p>
                            <p className="text-[#c8a24a]">derrotas</p>
                        </div>
                        <div>
                            <p className="text-[#ededed] font-semibold text-2xl">3</p>
                            <p className="text-[#c8a24a]">MVPs</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-fit">
                <div className="flex flex-col">
                    <div>
                        <p className="text-[#c8a24a] font-bold text-3xl">Star Player</p>
                    </div>
                    <div className="flex gap-8 px-2 py-1">
                        <div className="flex flex-col">
                            <div className="flex gap-2">
                                <p className="text-[#ededed] font-bold text-xl">FalleN</p>
                                <p className="text-[#ededed] text-xl">The Professor</p>
                            </div>
                            <div>
                                <p className="text-[#ededed] text-sm font-extralight">2016</p>
                            </div>
                        </div>
                       <div className="flex gap-6">
                            <div>
                                <p className="text-[#ededed] font-semibold text-2xl">3</p>
                                <p className="text-[#c8a24a]">MVPs</p>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex gap-1">
                                    <p className="text-[#ededed] text-xs font-light">vs</p>
                                    <p className="text-[#ededed] text-2xl font-bold" >NAVI 2016</p>
                                </div>
                                <div className="flex justify-end ml-15">
                                    <p className="text-[#c8a24a]">Melhor Partida</p>
                                </div>
                            </div>
                        
                       </div>
                    </div>
                </div>
                
                </div>
            </div>

        </div>

        <div className="w-full flex justify-center">
            <Link href="/PreGame">
                <button className="border-[#c8a24a] border p-2 hover:bg-[#c8a24a] transition-all duration-200"><p className="text-[#ededed] text-2xl font-bold">Começar nova campanha</p></button>
            </Link>
        </div>
        </>
    )
}