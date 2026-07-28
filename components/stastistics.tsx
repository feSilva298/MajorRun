import { Player } from "@/lib/types/team"

type Props = {
    players: (Player | null)[]
    starPlayerIdx: number
    playerRoleIdx: number[]
    starPlayer: Player | null
    team: (Player | null)[]
}

export default function Stats({ players, starPlayerIdx, starPlayer, playerRoleIdx, team}: Props){

    

    function averageOverallTeam(){

        const OVL_Players = team.map((item) => item?.overall)
       
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

   {team.map((item, index) => {
    if (!item) return null;

    const isStarPlayer = starPlayer?.idPlayer === item.idPlayer;

    const cardIndex = players.findIndex(
        card => card?.idPlayer === item.idPlayer
    );

    const role = isStarPlayer
        ? item.rolesAllowed[starPlayerIdx]
        : item.rolesAllowed[playerRoleIdx[cardIndex]];

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