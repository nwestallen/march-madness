import { Seed, SeedItem, SeedTeam, IRenderSeedProps } from "react-brackets";
import React, { useContext } from "react";
import { TeamStats } from "../constants/types";
import { DataContext } from "./Tournament";


const chooseWinner = (teams: TeamStats[]): TeamStats => {
  let winner = teams[0]
  return { 
    team_id: winner.team_id,
    team_name: winner.team_name,
    team_rating: winner.team_rating,
    team_region: winner.team_region,
    team_slot: (teams[0].team_slot + teams[1].team_slot) / 2
  }
}

const CustomSeed = ({
  seed,
  breakpoint,
  roundIndex,
  seedIndex,
}: IRenderSeedProps) => {

  const { teamData, setTeamData } = useContext(DataContext)

  const handleClick = () => {
    console.log('match click')
    setTeamData([...teamData, chooseWinner(
      [
        teamData.find(t => t.team_slot === seed.teams[0].slot)!,
        teamData.find(t => t.team_slot === seed.teams[1].slot)!
      ]
      )])
  }

  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div>
          <SeedTeam style={{ color: "white" }}>
            {seed.teams[0]?.name || seed.teams[0]?.slot || "TBD"}
          </SeedTeam>
          <SeedTeam style={{ color: "white" }}>
            {seed.teams[1]?.name || seed.teams[1]?.slot || "TBD"}
          </SeedTeam>
        </div>
      </SeedItem>
      <button onClick={handleClick}>Test</button>
    </Seed>
  );
};

export default CustomSeed;
