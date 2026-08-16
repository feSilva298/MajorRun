import { Team, Player } from "./types/team"
import json from "@/data/teams_with_ids.json"

export function getRandomTeams(teams: Team[]) {
    const index1 = Math.floor(Math.random() * teams.length);

    let index2 = Math.floor(Math.random() * teams.length);

    while(index1 === index2){
        index2 = Math.floor(Math.random() * teams.length);
    }

    return [teams[index1], teams[index2]];
}


//this function generates 16 teams of tournament
export function randomTeamsTournament(){
    const teams:number[] = [];


    while (teams.length < 16) {
        const numberTeams = Math.floor(Math.random() * json.length);

        if (!teams.includes(numberTeams)) {
            teams.push(numberTeams);
        }

}
    const teamsTournament = teams.map(index => json[index]);
    return teamsTournament;
}


//this function generates 5 teams possible to play against
export function drawTeams(selectedTeams: Team[]){
    const teams:number[] = [];

    while (teams.length < 5) {
        const drawTeams = Math.floor(Math.random() * selectedTeams.length)

        if (!teams.includes(drawTeams)) {
            teams.push(drawTeams);
        }

}
    const teamsTournament = teams.map(index => selectedTeams[index]);
    
    return teamsTournament;
}


export function drawMaps(){
    const maps = ["Mirage", "Inferno", "Dust2", "Ancient","Overpass", "Cache", "Anubis", "Nuke", "Train", "Vertigo", "Cobblestone"];
    const drawMaps = Math.floor(Math.random() * maps.length);

    return maps[drawMaps];
    
}

//enemys approaching
export function resultTeamA(team: Team[]): number[]{
    const OVLdrawTeams = team.map(teams => teams.overall);
    const strengthA = OVLdrawTeams.map((value) => Number(Math.exp(value/10).toFixed(2)));

    return strengthA;
}


//dream team
export function resultTeamB(team: (Player | null)[]){
    const OVLteamB = team.map(player => player?.overall ?? 0);
    const sumPlayers = OVLteamB.reduce((acc, num) => acc + num, 0);
    const strengthB = Math.exp(sumPlayers/10);

    return strengthB;
}

export function resultFinal(teamA: number[], teamB: number){
    const chanceA = teamA.map(valueA => Number((valueA/(valueA + teamB)).toFixed(2)))
    const chanceB = teamA.map(valueA => Number((teamB/(valueA + teamB)).toFixed(2)))

    const difference = chanceA.map((valueA, index) => Math.abs(valueA - chanceB[index]))
       
    const resultFinal = difference.map(value =>{
        if(value <= 0.10){
            
        }
    })
}


