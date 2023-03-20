import { Seed, SeedItem, SeedTeam, IRenderSeedProps } from "react-brackets";
import React, { useContext, useState } from "react";
import { CompContext, DataContext } from "./Tournament";
import { bottomTeam, chooseWinner, funcMap, prob, topTeam } from "../util/calc";

const CustomSeed = ({
  seed,
  breakpoint,
  roundIndex,
  seedIndex,
}: IRenderSeedProps) => {
  const { teamData, setTeamData } = useContext(DataContext);
  const { funcSelection } = useContext(CompContext)
  const [ probs, setProbs ] = useState<string[]>(['',''])

  const handleClick = () => {
    setTeamData([
      ...teamData,
      chooseWinner([
        teamData.find((t) => t.team_slot === seed.teams[0].slot)!,
        teamData.find((t) => t.team_slot === seed.teams[1].slot)!,
      ], funcMap.get(funcSelection)!),
    ]);
  };

  const handleBottomClick = () => {
    setTeamData([
      ...teamData,
      chooseWinner([
        teamData.find((t) => t.team_slot === seed.teams[0].slot)!,
        teamData.find((t) => t.team_slot === seed.teams[1].slot)!,
      ], bottomTeam),
    ]);
  };
  
  const handleTopClick = () => {
    setTeamData([
      ...teamData,
      chooseWinner([
        teamData.find((t) => t.team_slot === seed.teams[0].slot)!,
        teamData.find((t) => t.team_slot === seed.teams[1].slot)!,
      ], topTeam),
    ]);
  };

  const handleEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const p1 = Math.round((prob(seed.teams[0].rating, seed.teams[1].rating) + Number.EPSILON) * 100)
    setProbs([`(${p1}%)`, `(${100-p1}%)`])
  };

  const handleLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    setProbs(['',''])
  }

  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div
          className="bg-slate-700 hover:bg-slate-900"
          onMouseEnter={(e) => handleEnter(e)}
          onMouseLeave={(e) => handleLeave(e)}
          onClick={(e) => console.log("clicked div")}
        >
          <SeedTeam onClick={handleTopClick} className="hover:text-slate-200">
            {seed.teams[0]?.name || seed.teams[0]?.slot || "TBD"} {seed.teams[0]?.seed} {probs[0]}
          </SeedTeam>
          <SeedTeam onClick={handleBottomClick} className="hover:text-slate-200">
            {seed.teams[1]?.name || seed.teams[1]?.slot || "TBD"} {seed.teams[1]?.seed} {probs[1]}
          </SeedTeam>
        </div>
      </SeedItem>
      <button
        className="my-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded no-underline"
        onClick={handleClick}
      >
        pick
      </button>
    </Seed>
  );
};

export default CustomSeed;
