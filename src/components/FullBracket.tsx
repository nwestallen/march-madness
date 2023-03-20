import React, { useContext, useMemo } from "react";
import { IRoundProps, ISeedProps } from "react-brackets";
import CustomSeed from "./CustomSeed";
import RegionBracket from "./RegionBracket";
import {
  finalInit,
  initEast,
  initMidwest,
  initSouth,
  initWest,
  leftFourInit,
  rightFourInit,
} from "../constants/mockData";
import { TeamStats } from "../constants/types";
import { DataContext } from "./Tournament";
import { outcome, simulate } from "../util/calc";

type Team = { [key: string]: any; name?: string };

const mapBracket = (teamInfo: TeamStats[], dest: IRoundProps[]): IRoundProps[] => {
  console.log('mapBracket')
  let updateTeam = (t: Team): Team => {
    const tm = teamInfo.find((x) => x.team_slot === t.slot);
    return { ...t, name: tm?.team_name, slot: t.slot, rating: tm?.team_rating, seed: tm?.team_seed };
  };
  let updateTeams = (ts: Team[]): Team[] => ts.map((t) => updateTeam(t));
  let updateSeed = (s: ISeedProps): ISeedProps => ({...s,teams: updateTeams(s.teams),});
  let updateSeeds = (ss: ISeedProps[]): ISeedProps[] =>ss.map((s) => updateSeed(s));
  let updateRound = (r: IRoundProps): IRoundProps => ({...r,seeds: updateSeeds(r.seeds),});
  let updateRounds = (rs: IRoundProps[]): IRoundProps[] =>rs.map((r) => updateRound(r));
  return updateRounds(dest);
};

const mapFinal = (teamInfo: TeamStats[], dest: ISeedProps): ISeedProps => {
  console.log('mapFinal')
  const team1 = teamInfo.find((t) => t.team_slot === dest.teams[0].slot);
  const team2 = teamInfo.find((t) => t.team_slot === dest.teams[1].slot);
  const result = {
    ...dest,
    teams: [
      { ...team1, name: team1?.team_name, slot: dest.teams[0].slot, rating: team1?.team_rating, seed: team1?.team_seed },
      { ...team2, name: team2?.team_name, slot: dest.teams[1].slot, rating: team2?.team_rating, seed: team2?.team_seed},
    ],
  };
  return result;
};

type FullBracketProps = {};

const FullBracket = (props: FullBracketProps) => {
  const { teamData, setTeamData } = useContext(DataContext);
  const champion = useMemo(() => teamData.find((team) => team.team_slot === 63)?.team_name || "63", [teamData])
  const southRegion = useMemo(() => mapBracket(teamData, initSouth), [teamData])
  const eastRegion = useMemo(() => mapBracket(teamData, initEast), [teamData])
  const westRegion = useMemo(() => mapBracket(teamData, initWest), [teamData])
  const midwestRegion = useMemo(() => mapBracket(teamData, initMidwest), [teamData])
  const leftSemi = useMemo(() => mapFinal(teamData, leftFourInit), [teamData])
  const rightSemi = useMemo(() => mapFinal(teamData, rightFourInit), [teamData])
  const finals = useMemo(() => mapFinal(teamData, finalInit), [teamData])

  const handleClick = () => {
    setTeamData(
      outcome(teamData, 63, 32,simulate)
    )
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <RegionBracket
          key="South"
          roundProps={southRegion}
        />
        <RegionBracket
          key="Midwest"
          rtl
          roundProps={midwestRegion}
        />
      </div>
      <div className="flex flex-col items-center border-blue-500 w-1/2">
        <button
          className="py-1 px-2 text-white bg-red-500 rounded hover:bg-red-700"
          onClick={handleClick}
        >
          Simulate Tournament
        </button>
        <div className="my-2 flex border-red-500 w-1/2">
          <div className="w-1/2 flex">
            <CustomSeed
              seed={leftSemi}
              roundIndex={1}
              seedIndex={1}
              breakpoint={100}
            />
          </div>
          <div className="w-1/2 flex-inline">
            <CustomSeed
              seed={rightSemi}
              roundIndex={1}
              seedIndex={1}
              breakpoint={100}
            />
          </div>
        </div>
        <div className="flex border-green-500 w-1/4">
          <CustomSeed
            seed={finals}
            roundIndex={1}
            seedIndex={1}
            breakpoint={100}
          />
        </div>
        <div className="my-2 flex flex-col items-center text-white bg-slate-700 px-8 rounded">
          <h2>Champion</h2>
          <h3 className="text-sm">{champion}</h3>
        </div>
      </div>
      <div className="flex">
        <RegionBracket key="East" roundProps={eastRegion} />
        <RegionBracket
          key="West"
          rtl
          roundProps={westRegion}
        />
      </div>
    </div>
  );
};

export default FullBracket;
