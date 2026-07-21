import { Button } from "@/components/ui/button";
import {RotateCcw} from "lucide-react"
import { Team } from "@/lib/types/team";
import { getRandomTeams } from "@/lib/teams";

type Props = {
    setDraftedTeams: React.Dispatch<React.SetStateAction<Team[]>>
}

export default function RerollTeams({setDraftedTeams}: Props){

    return(
        <>
        <div className="flex justify-center">
            <Button onClick={() => setDraftedTeams(getRandomTeams)} className="bg-[#1c1c22] hover:bg-[#0b0b0f]"><span><RotateCcw className=" text-[#ededed]"/></span><p className="text-[#ededed] text-xl">Trocar Times</p></Button>
        </div>
        </>
    )
}