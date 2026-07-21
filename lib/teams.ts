import teams from "@/data/teams_with_ids.json"

export function getRandomTeams() {
    const index1 = Math.floor(Math.random() * teams.length)

    let index2 = Math.floor(Math.random() * teams.length)

    while(index1 === index2){
        index2 = Math.floor(Math.random() * teams.length)
    }

    return [teams[index1], teams[index2]]
}