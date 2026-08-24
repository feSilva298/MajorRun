import { Team, Player, CampaignMatch, CampaignResult, PlayoffMatch, PlayoffResult } from "./types/team"
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


    //this function generates N teams(Team A) possible to play against
    export function drawTeams(selectedTeams: Team[], amount: number = 8){
        const teams:number[] = [];

        while (teams.length < amount) {
            const drawTeams = Math.floor(Math.random() * selectedTeams.length)

            if (!teams.includes(drawTeams)) {
                teams.push(drawTeams);
            }

    }
        const teamsTournament = teams.map(index => selectedTeams[index]);
        
        return teamsTournament;
    }

export function drawMaps() {
    const maps = [
        "Mirage",
        "Inferno",
        "Dust2",
        "Ancient",
        "Overpass",
        "Cache",
        "Anubis",
        "Nuke",
        "Train",
        "Vertigo",
        "Cobblestone"
    ]

    const selectedMaps: number[] = []

    while (selectedMaps.length < 10) {
        const drawMap = Math.floor(Math.random() * maps.length)

        if (!selectedMaps.includes(drawMap)) {
            selectedMaps.push(drawMap)
        }
    }

    return selectedMaps.map(index => maps[index])
}



//dream team
export function resultTeamB(team: (Player | null)[]){
    const OVLteamB = team.map(player => player?.overall ?? 0);
    const sumPlayers = OVLteamB.reduce((acc, num) => acc + num, 0);
    const average = sumPlayers / 5
    const strengthB = Math.exp(average/10);

    return strengthB;
}

export function starPlayerTeamB(player: (Player | null)[]){
    if(!player[0]) return

        const starPlayerOVL = player[0]?.overall

        const impactTeamB = 65 + (starPlayerOVL - 84) * 2

        return impactTeamB
}

//enemys approaching
export function resultTeamA(team: Team[]): number[]{
    const OVLdrawTeams = team.map(teams => teams.overall);
    const strengthA = OVLdrawTeams.map((value) => Number(Math.exp(value/10).toFixed(2)));

    return strengthA;
}

export function starPlayerTeamA(player: Team[]){
    if(!player) return

        const overall = player.map(OVL => OVL.overall)
        const starPlayerOVL = Math.max(...overall)

        const impactTeamA = 65 + (starPlayerOVL - 84) * 2

        return impactTeamA
}

function simulateMapScore(finalChanceA: number): { scoreA: number; scoreB: number } {
    let scoreA = 0
    let scoreB = 0
    let target = 13

    while (true) {
        if (scoreA === target || scoreB === target) {
            break // alguém bateu a meta, mapa decidido
        }

        if (scoreA === target - 1 && scoreB === target - 1) {
            target += 3 // empatou um a menos da meta -> OT, sobe o alvo
            continue
        }

        if (Math.random() < finalChanceA) {
            scoreA++
        } else {
            scoreB++
        }
    }

    return { scoreA, scoreB }
}

export function resultFinal(teamA: Team[], strengthA: number[], teamB: (Player | null)[], strengthB: number){
    const chanceA = strengthA.map(valueA => Number((valueA/(valueA + strengthB)).toFixed(2)))
    const chanceB = strengthA.map(valueA => Number((strengthB/(valueA + strengthB)).toFixed(2)))

    const difference = chanceA.map((valueA, index) => Math.abs(valueA - chanceB[index]))
       
    const resultFinal = difference.map((value, index) =>{

        let finalChanceA = chanceA[index]
        let finalChanceB = chanceB[index]

        // Partida acirrada
        if (value <= 0.10) {

            const impactA = starPlayerTeamA(teamA)
            const impactB = starPlayerTeamB(teamB)

            const activateA =
                Math.random() < ((impactA ?? 0) / 100)

            const activateB =
                Math.random() < ((impactB ?? 0) / 100)

            if (activateA && !activateB) {
                finalChanceA += 0.05
                finalChanceB -= 0.05
            }

            if (activateB && !activateA) {
                finalChanceA -= 0.05
                finalChanceB += 0.05
            }
        }

        const { scoreA, scoreB } = simulateMapScore(finalChanceA)

        return {
            scoreA,
            scoreB
        }
    })

    return resultFinal
}


export function resolveCampaign(allResults: { scoreA: number; scoreB: number }[]): CampaignResult {
    let wins = 0
    let losses = 0
    const matches: CampaignMatch[] = []

    for (const match of allResults) {
        const won = match.scoreB > match.scoreA

        const winsBefore = wins
        const lossesBefore = losses

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        won ? wins++ : losses++

        matches.push({ ...match, won, winsBefore, lossesBefore, winsAfter: wins, lossesAfter: losses })

        if (wins === 3 || losses === 3) break
    }

    return {
        matches,
        wins,
        losses,
        status: wins === 3 ? "qualified" : "eliminated",
    }
}


// ---------------- PLAYOFFS ----------------

export function resolvePlayoffs(
    quarterOpponent: Team,
    semiOpponent: Team,
    finalOpponent: Team,
    dreamTeam: (Player | null)[]
): PlayoffResult {
    const strengthB = resultTeamB(dreamTeam)

    // Quartas - Bo1
    const strengthQuarter = resultTeamA([quarterOpponent])
    const quarterRaw = resultFinal([quarterOpponent], strengthQuarter, dreamTeam, strengthB)[0]
    const quarterFinal: PlayoffMatch = { ...quarterRaw, won: quarterRaw.scoreB > quarterRaw.scoreA }

    if (!quarterFinal.won) {
        return { quarterFinal, semiFinal: null, final: null, champion: false }
    }

    // Semifinal - Bo1
    const strengthSemi = resultTeamA([semiOpponent])
    const semiRaw = resultFinal([semiOpponent], strengthSemi, dreamTeam, strengthB)[0]
    const semiFinal: PlayoffMatch = { ...semiRaw, won: semiRaw.scoreB > semiRaw.scoreA }

    if (!semiFinal.won) {
        return { quarterFinal, semiFinal, final: null, champion: false }
    }

    // Final - Bo3 (primeiro a 2 vitórias, para assim que decidir)
    const strengthFinalMaps = resultTeamA([finalOpponent, finalOpponent, finalOpponent])
    const finalMapsRaw = resultFinal([finalOpponent, finalOpponent, finalOpponent], strengthFinalMaps, dreamTeam, strengthB)

    const finalMaps: PlayoffMatch[] = []
    let winsB = 0
    let winsA = 0

    for (const map of finalMapsRaw) {
        const won = map.scoreB > map.scoreA
        finalMaps.push({ ...map, won })

        won ? winsB++ : winsA++

        if (winsB === 2 || winsA === 2) break
    }

    const champion = winsB === 2

    return { quarterFinal, semiFinal, final: finalMaps, champion }
}