import CardSimulation from "@/components/cardsimulation"
import Resume from "@/components/resume"


export default function Simulation(){
    return(
        <>
        
        <div className="flex bg-[#0b0b0f] w-full h-full p-8 justify-center">
            <p className="text-[#c8a24a] text-7xl font-bebas">A Campanha</p>    
        </div>

        <div className="flex justify-center bg-[#0b0b0f] h-full w-full">
        <div className="flex flex-col bg-[#1c1c22] w-[920px] h-full items-center gap-12 p-2">
            <CardSimulation/>
            <Resume/>
            </div>  
            </div>
        </>
    )
}