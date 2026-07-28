import { Player } from "@/lib/types/team"

type Props = {
    players: (Player | null)[]
    index: number
}

export default function Stats({ players, index}: Props){

    function averageOverallTeam(){

        const OVL_Players = players.map((item) => item?.overall)
       
        if(OVL_Players.length === 0) return
        const sumPlayers = OVL_Players.reduce((acc, num) => (acc ?? 0) + (num ?? 0), 0);

        if(!sumPlayers) return

        const average = sumPlayers / 5
        
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
                <div className="flex flex-col gap-2">
                    {players[0]?.name ? <div className="flex justify-between ">
                        <p className="text-[#ededed]">1. {players[0]?.name}</p><p className="text-[#ededed] flex gap-2">{players[0]?.rolesAllowed[index]}<span>{players[0]?.overall}</span></p>
                    </div> : "" }
                    
                     {players[1]?.name ? <div className="flex justify-between">
                        <p className="text-[#ededed]">2. {players[1]?.name}</p><p className="text-[#ededed] flex gap-2">{players[1]?.defaultRole}<span>{players[1]?.overall}</span></p>
                    </div> : "" }
                     {players[2]?.name ? <div className="flex justify-between">
                        <p className="text-[#ededed]">3. {players[0]?.name}</p><p className="text-[#ededed] flex gap-2">{players[2]?.defaultRole}<span>{players[2]?.overall}</span></p>
                    </div> : "" }
                     {players[3]?.name ? <div className="flex justify-between">
                        <p className="text-[#ededed]">4. {players[3]?.name}</p><p className="text-[#ededed] flex gap-2">{players[3]?.defaultRole}<span>{players[3]?.overall}</span></p>
                    </div> : "" }
                     {players[4]?.name ? <div className="flex justify-between">
                        <p className="text-[#ededed]">5. {players[4]?.name}</p><p className="text-[#ededed] flex gap-2">{players[4]?.defaultRole}<span>{players[4]?.overall}</span></p>
                    </div> : "" }
                    
                </div>
            </div>
        </div>
        </>
    )
}