import { TeamStats } from "../constants/types";

export const prob = (r1: number, r2: number) => 1 / (1 + 10 ** ((-(r1 - r2) * 30.464) / 400))

export const chooseWinner = (teams: TeamStats[]): TeamStats => {
  let p1 = prob(teams[0].team_rating, teams[1].team_rating)
  let winner = Math.random() < p1 ? teams[0] : teams[1];
  return {
    team_id: winner.team_id,
    team_name: winner.team_name,
    team_rating: winner.team_rating,
    team_region: winner.team_region,
    team_slot: (teams[0].team_slot + teams[1].team_slot) / 2,
  };
};