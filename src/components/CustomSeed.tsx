import { Seed, SeedItem, SeedTeam, IRenderSeedProps } from "react-brackets";
import React, { useContext } from "react";
import { TeamStats } from "../constants/types";
import { DataContext } from "./Tournament";

const chooseWinner = (teams: TeamStats[]): TeamStats => {
  let p1 =
    1 /
    (1 +
      10 ** ((-(teams[0].team_rating - teams[1].team_rating) * 30.464) / 400));
  let winner = Math.random() < p1 ? teams[0] : teams[1];
  return {
    team_id: winner.team_id,
    team_name: winner.team_name,
    team_rating: winner.team_rating,
    team_region: winner.team_region,
    team_slot: (teams[0].team_slot + teams[1].team_slot) / 2,
  };
};

const CustomSeed = ({
  seed,
  breakpoint,
  roundIndex,
  seedIndex,
}: IRenderSeedProps) => {
  const { teamData, setTeamData } = useContext(DataContext);

  const handleClick = () => {
    console.log("match click");
    setTeamData([
      ...teamData,
      chooseWinner([
        teamData.find((t) => t.team_slot === seed.teams[0].slot)!,
        teamData.find((t) => t.team_slot === seed.teams[1].slot)!,
      ]),
    ]);
  };

  const handleHover = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    console.log("hovering, rating: " + seed.teams[0].rating);
  };

  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div
          className="bg-slate-800"
          onMouseOver={(e) => handleHover(e)}
          onClick={(e) => console.log("clicked div")}
        >
          <SeedTeam style={{ color: "white" }}>
            {seed.teams[0]?.name || seed.teams[0]?.slot || "TBD"}
          </SeedTeam>
          <SeedTeam style={{ color: "white" }}>
            {seed.teams[1]?.name || seed.teams[1]?.slot || "TBD"}
          </SeedTeam>
        </div>
      </SeedItem>
      <div className="py-1" />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded no-underline"
        onClick={handleClick}
      >
        pick
      </button>
    </Seed>
  );
};

export default CustomSeed;
