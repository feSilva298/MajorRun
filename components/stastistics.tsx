import { Player } from "@/lib/types/team"

type Props = {
    players: (Player | null)[]
    playerRoleIdx: number[]
    analysesRoles?: (Player | null)[]
}

export default function Stats({ players, playerRoleIdx, analysesRoles}: Props){

    function averageOverallTeam(){

        const OVL_Players = players.map((item) => item?.overall ?? 0)
       
        if(OVL_Players.length === 0) return 0
        const sumPlayers = OVL_Players.reduce((acc, num) => acc + num, 0);

        const average = sumPlayers / 5
        const FinalAverage = average - ((analysesRoles?.length ?? 0) * 3)

        return Number(FinalAverage.toFixed(1))
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
                <div>
                    <p className="text-[#ededed] font-semibold">Overall: <span className="text-[#c8a24a] text-xl">{averageOverallTeam()}</span></p>
                    {analysesRoles?.length ? <p className="text-[#a12b2b]">{analysesRoles?.length} jogadores com a mesma posição!</p> : ""}
                </div>
                <div className="flex flex-col gap-2">

   {players.map((item, index) => {
    if (!item) return null;

    const cardIndex = players.findIndex(
        card => card?.idPlayer === item.idPlayer
    );

    const role = item.rolesAllowed[playerRoleIdx[cardIndex]];

    return (
        <div
            key={item.idPlayer}
            className="flex justify-between"
        >
            <p className="text-[#ededed]">
                {index + 1}. {item.name}
            </p>

            <p className="text-[#ededed] flex gap-2">
                {role}
                <span>{item.overall}</span>
            </p>
        </div>
    );
})}

</div>
            </div>
        </div>
        </>
    )
}