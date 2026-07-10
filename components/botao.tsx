import teams from "@/data/teams_with_ids.json"
import { Team, Player } from "@/.next/types/team";
//type Props = {
  //  onclick: () => void
//}

export default function Botao(){

        const time = teams.verified_teams as Team[]
        const player = teams.verified_teams as Player[]
            
        
    return(
        <>
       <h1>{player[0].name}</h1>
       <h1>{time[0].team}</h1>
        </>
    )

}