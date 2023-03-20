import { TeamStats } from "../constants/types";

export const prob = (r1: number, r2: number) => 1 / (1 + 10 ** ((-(r1 - r2) * 30.464) / 400))

export const simulate = (teams: TeamStats[]): TeamStats => {
  const p1 = prob(teams[0].team_rating, teams[1].team_rating)
  const winner = Math.random() < p1 ? teams[0] : teams[1];
  return winner
};

export const topTeam = (teams: TeamStats[]): TeamStats => teams[0]

export const bottomTeam = (teams: TeamStats[]): TeamStats => teams[1]

export const favorite = (teams: TeamStats[]): TeamStats => {
    const p1 = prob(teams[0].team_rating, teams[1].team_rating)
    return p1 > 0.5 ? teams[0] : teams[1]
}

export const chooseWinner = (teams: TeamStats[], comp: (t: TeamStats[]) => TeamStats): TeamStats => {
    const winner = comp(teams)
  return {
    team_id: winner.team_id,
    team_name: winner.team_name,
    team_rating: winner.team_rating,
    team_region: winner.team_region,
    team_slot: (teams[0].team_slot + teams[1].team_slot) / 2,
  };
}