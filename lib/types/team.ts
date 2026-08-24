export type Role =
  | "AWP"
  | "IGL"
  | "Entry"
  | "Rifler"
  | "Support";

export interface Player {
  name: string;
  overall: number;
  defaultRole: string;
  rolesAllowed: string[];
  idPlayer: string;
  description?: string;
  teamYear: number;
}

export interface Team {
  team: string;
  year: number;
  players: Player[];
  idTeam: string;
  overall: number;
}

export type CampaignMatch = {
    scoreA: number
    scoreB: number
    won: boolean
    winsBefore: number
    lossesBefore: number
    winsAfter: number
    lossesAfter: number
}

export type CampaignResult = {
    matches: CampaignMatch[]
    wins: number
    losses: number
    status: "qualified" | "eliminated"
}

export type PlayoffMatch = {
    scoreA: number
    scoreB: number
    won: boolean
}

export type PlayoffResult = {
    quarterFinal: PlayoffMatch | null
    semiFinal: PlayoffMatch | null
    final: PlayoffMatch[] | null
    champion: boolean
}