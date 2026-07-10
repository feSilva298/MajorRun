import {Separator} from "@/components/ui/separator"
import Resume from "@/components/resume"
export default function Simulation(){
    return(
        <>
        
        <div className="flex bg-[#0b0b0f] w-full h-full p-8 justify-center">
            <p className="text-[#c8a24a] text-7xl font-bebas">A Campanha</p>    
        </div>

        <div className="flex justify-center bg-[#0b0b0f] h-full w-full">
        <div className="flex flex-col bg-[#1c1c22] w-[920px] h-full items-center gap-12 p-2">

            <div className="w-[910px] h-[300px] bg-[#0b0b0f]">
                <div className="flex bg-[#1c1c22] w-[910px] h-[100px] p-2 gap-4 border border-[#0b0b0f]">
                    <div className="flex flex-col">
                        <p className="text-[#ededed] font-bold text-xl">Stage 3</p>
                        <p className="text-[#ededed] text-xs">0-0</p>
                    </div>
                    <Separator orientation="vertical" className="bg-[#0b0b0f]"/>
                    <div className="flex min-w-3xl justify-center xl:gap-109">
                        <div className="flex gap-2">
                            <p className="text-xs text-[#ededed] font-light">vs</p>
                            <p className="text-4xl text-[#ededed] font-bold">NAVI 2016</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-xs text-[#ededed] font-light">bo1</p>
                            <p className="text-[#5CB85C] font-bold text-3xl">13 - 11</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center bg-[#1c1c22] w-[910px] h-[195px] p-2 gap-4 border border-[#0b0b0f]">
                    <div className="flex bg-[#1c1c22] w-[820px] h-[180px] p-4 gap-4 border border-[#0b0b0f]">
                        <p className="text-[#ededed] font-bold">Mirage</p>
                        <p className="text-[#5cb85c] font-bold">13 - 11</p>
                        <Separator orientation="vertical" className="bg-[#0b0b0f] h-6"/>
                        <p className="text-[#ededed]">4-8</p>
                        <p className="text-[#ededed]">9-3</p>
                    </div>
                </div>
                </div>


                <div className="w-[910px] h-[300px] bg-[#0b0b0f]">
                <div className="flex bg-[#1c1c22] w-[910px] h-[100px] p-2 gap-4 border border-[#0b0b0f]">
                    <div className="flex flex-col">
                        <p className="text-[#ededed] font-bold text-xl">Stage 3</p>
                        <p className="text-[#ededed] text-xs">0-0</p>
                    </div>
                    <Separator orientation="vertical" className="bg-[#0b0b0f]"/>
                    <div className="flex min-w-3xl justify-center xl:gap-109">
                        <div className="flex gap-2">
                            <p className="text-xs text-[#ededed] font-light">vs</p>
                            <p className="text-4xl text-[#ededed] font-bold">NAVI 2016</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-xs text-[#ededed] font-light">bo1</p>
                            <p className="text-[#5CB85C] font-bold text-3xl">13 - 11</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center bg-[#1c1c22] w-[910px] h-[195px] p-2 gap-4 border border-[#0b0b0f]">
                    <div className="flex bg-[#1c1c22] w-[820px] h-[180px] p-4 gap-4 border border-[#0b0b0f]">
                        <p className="text-[#ededed] font-bold">Mirage</p>
                        <p className="text-[#5cb85c] font-bold">13 - 11</p>
                        <Separator orientation="vertical" className="bg-[#0b0b0f] h-6"/>
                        <p className="text-[#ededed]">4-8</p>
                        <p className="text-[#ededed]">9-3</p>
                    </div>
                </div>
            </div>

            <Resume/>
            </div>  
            </div>
        </>
    )
}