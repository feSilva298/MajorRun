import CardPlayers from "@/components/cardPlayers"
import StarPlayer from "@/components/starplayer"
import Stats from "@/components/stastistics"
import SelectPlayers from "@/components/selectplayers"
import RerollTeams from "@/components/rerollteams"
import Link from "next/link"

export default function Draft(){

    const rodadas:number = 6

    if (rodadas == 6) {
        return(
            <>
            <div className="flex flex-col bg-[#0B0B0F] justify-center gap-6 w-screen h-screen">
                <div className="flex justify-center gap-330">
                    <p className="text-[#ededed] font-bold font-bebas text-6xl">Draft</p>
                    <p className="text-[#ededed] font-bold font-bebas text-6xl">Rodada 1/5</p>
                </div>
                <div className="flex justify-center gap-6">
                
                    <div className="flex bg-[#1C1C22] w-[350px] h-[750px] p-6 justify-center">
                        <Link href="/Simulation" className="h-fit hover:bg-[#c8a24a] transition-all duration-200">
                            <button className="w-[300px] text-[#ededed] text-4xl font-bold border-[#c8a24a] border-2 p-6">Começar</button>
                        </Link>
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
                    <Stats/>
                </div>  
            </div>
            </div>    
            </>
        )
    }
    return(
        <>
        
            <div className="flex flex-col bg-[#0B0B0F] justify-center gap-6 w-screen h-screen">
                <div className="flex justify-center gap-330">
                    <p className="text-[#ededed] font-bold font-bebas text-6xl">Draft</p>
                    <p className="text-[#ededed] font-bold font-bebas text-6xl">Rodada 1/5</p>
                </div>
                <div className="flex justify-center gap-6">
                <div className=" flex flex-col bg-[#1C1C22] w-[350px] h-[750px] p-6">
                   <SelectPlayers/>
                   <RerollTeams/>
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
                    <Stats/>
                </div>  
            </div>
            </div> 
        </>
    )}