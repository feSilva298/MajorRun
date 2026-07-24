import { Player } from "@/lib/types/team"

type Props = {
    overallStarPlayer: Player | null
    overallPlayers: (Player | null)[]
}

export default function Stats({overallStarPlayer, overallPlayers}: Props){

    function averageOverallTeam(){

        const OVL_StarPlayer = overallStarPlayer?.overall
        const OVL_Players = overallPlayers.map((item) => item?.overall)
       

        if(OVL_Players.length === 0) return
        const sumPlayers = OVL_Players.reduce((acc, num) => (acc ?? 0) + (num ?? 0), 0);
        

        if(!OVL_StarPlayer) return
        if(!sumPlayers) return

        const average = (OVL_StarPlayer + sumPlayers) / 5
        
        return average
    }
        
    return(
        <>
        <div className="flex flex-col justify-center gap-10">
            <p className="font-bold text-4xl text-[#ededed]">Análise do Time</p>

            <div className="flex flex-col border-[#C8A24A] border-2 gap-4 p-4">
                <p className="text-xl font-bold text-[#ededed]">Star Player</p> 
                <p className="text-[#ededed] text-lg">Bonus:</p>
            </div>

            <div className="flex flex-col gap-12">
                <p className="text-[#ededed] font-semibold">Overall: <span className="text-[#c8a24a] text-xl">{averageOverallTeam()}</span></p>
                <p className="text-[#ededed] font-semibold">Sei la</p>
            </div>
        </div>
        </>
    )
}