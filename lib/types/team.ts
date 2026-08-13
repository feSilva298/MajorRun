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