import { Team } from "./types/team"
import json from "@/data/teams_with_ids.json"

export function getRandomTeams(teams: Team[]) {
    const index1 = Math.floor(Math.random() * teams.length)

    let index2 = Math.floor(Math.random() * teams.length)

    while(index1 === index2){
        index2 = Math.floor(Math.random() * teams.length)
    }

    return [teams[index1], teams[index2]]
}


//essa funcao aqui gera os 16 times que vao jogar o torneio
export function randomTeamsTournament(){
    const teams:number[] = []


    while (teams.length < 16) {
        const numberTeams = Math.floor(Math.random() * json.length);

        if (!teams.includes(numberTeams)) {
            teams.push(numberTeams);
        }

}
    const teamsTournament = teams.map(index => json[index])
    return teamsTournament
}


//essa funcao aqui gera os 5 times do torneio que vao jogar contra o jogador
export function drawTeams(selectedTeams: Team[]){
     const teams:number[] = []

    while (teams.length < 5) {
        const drawTeams = Math.floor(Math.random() * selectedTeams.length)

        if (!teams.includes(drawTeams)) {
            teams.push(drawTeams);
        }

}
    const teamsTournament = teams.map(index => selectedTeams[index])
    
    return teamsTournament
}

export function drawMaps(){
        const maps = ["Mirage", "Inferno", "Dust2", "Ancient","Overpass", "Cache", "Anubis", "Nuke", "Train", "Vertigo", "Cobblestone"]

        const drawMaps = Math.floor(Math.random() * maps.length)
        return maps[drawMaps]
    
}

export function resultDuel(teams: Team[]){
    const OVLdrawTeams = teams.map((teams) => teams.overall)

    
    return OVLdrawTeams
}

