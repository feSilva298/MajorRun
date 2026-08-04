import { Button } from "@/components/ui/button";
import {RotateCcw} from "lucide-react"
import { Team } from "@/lib/types/team";
import { getRandomTeams } from "@/lib/teams";

type Props = {
    removeTeam: Team[]
    setDraftedTeams: React.Dispatch<React.SetStateAction<Team[]>>
    setCountReroll: React.Dispatch<React.SetStateAction<number>>
}

export default function RerollTeams({setDraftedTeams, setCountReroll, removeTeam}: Props){

    const count = () => {
        setCountReroll(c => c + 1)
    }

    function MultiFunctions(){
        count()
        setDraftedTeams(getRandomTeams(removeTeam))
    }

    return(
        <>
        <div className="flex justify-center">
            <Button onClick={MultiFunctions} className="bg-[#1c1c22] hover:bg-[#0b0b0f]"><span><RotateCcw className=" text-[#ededed]"/></span><p className="text-[#ededed] text-xl">Trocar Times</p></Button>
        </div>
        </>
    )
}