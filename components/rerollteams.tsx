import { Button } from "@/components/ui/button";
import {RotateCcw} from "lucide-react"


export default function RerollTeams(){
    return(
        <>
        <div className="flex justify-center">
            <Button className="bg-[#1c1c22] hover:bg-[#0b0b0f]"><span><RotateCcw className=" text-[#ededed]"/></span><p className="text-[#ededed] text-xl">Trocar Times</p></Button>
        </div>
        </>
    )
}