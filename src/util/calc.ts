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

export const topSeed = (teams: TeamStats[]): TeamStats => teams[0].team_seed <= teams[1].team_seed ? teams[0] : teams[1]

export const chooseWinner = (teams: TeamStats[], comp: (t: TeamStats[]) => TeamStats): TeamStats => {
    const winner = comp(teams)
  return {
    team_id: winner.team_id,
    team_name: winner.team_name,
    team_rating: winner.team_rating,
    team_region: winner.team_region,
    team_slot: (teams[0].team_slot + teams[1].team_slot) / 2,
    team_seed: winner.team_seed,
  };
}

export const outcome = (data: TeamStats[], slot: number, dist: number, comp: (t: TeamStats[]) => TeamStats): TeamStats[] => {
  const row = data.find(d => d.team_slot === slot)
  if(row !== undefined) {
    return data
  }
  else{
    const o1 = outcome(data, slot - dist, dist / 2, comp)
    const o2 =  outcome(data, slot + dist, dist /2, comp)
    const winner = chooseWinner([o1.find(d => d.team_slot === slot - dist)!, o2.find(d => d.team_slot === slot + dist)!], comp)
    return [...data, ...o1, ...o2, winner]
  }
}

export const funcMap = new Map([
  [ 'simulate', simulate ],
  [ 'favorite', favorite ],
  [ 'topSeed', topSeed ]
  ])