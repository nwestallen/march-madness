import React, { useContext } from "react";
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
import { chooseWinner } from "../util/calc";

type Team = { [key: string]: any; name?: string };

const mapBracket = (teamInfo: TeamStats[], dest: IRoundProps[]): IRoundProps[] => {
  let updateTeam = (t: Team): Team => {
    const tm = teamInfo.find((x) => x.team_slot === t.slot);
    return { ...t, name: tm?.team_name, slot: t.slot, rating: tm?.team_rating };
  };
  let updateTeams = (ts: Team[]): Team[] => ts.map((t) => updateTeam(t));
  let updateSeed = (s: ISeedProps): ISeedProps => ({...s,teams: updateTeams(s.teams),});
  let updateSeeds = (ss: ISeedProps[]): ISeedProps[] =>ss.map((s) => updateSeed(s));
  let updateRound = (r: IRoundProps): IRoundProps => ({...r,seeds: updateSeeds(r.seeds),});
  let updateRounds = (rs: IRoundProps[]): IRoundProps[] =>rs.map((r) => updateRound(r));
  return updateRounds(dest);
};

const mapFinal = (teamInfo: TeamStats[], dest: ISeedProps): ISeedProps => {
  const team1 = teamInfo.find((t) => t.team_slot === dest.teams[0].slot);
  const team2 = teamInfo.find((t) => t.team_slot === dest.teams[1].slot);
  const result = {
    ...dest,
    teams: [
      { ...team1, name: team1?.team_name, slot: dest.teams[0].slot },
      { ...team2, name: team2?.team_name, slot: dest.teams[1].slot },
    ],
  };
  return result;
};

const simulateRound = (teamStats: TeamStats[]): TeamStats[] => {
  const newTeams: TeamStats[] = [];
  teamStats.forEach((value: TeamStats, index: number) => {
    if (index % 2 === 0) {
      newTeams.push(chooseWinner(teamStats.slice(index, index + 2)));
    }
  });
  return newTeams;
};

type FullBracketProps = {};

const FullBracket = (props: FullBracketProps) => {
  const { teamData, setTeamData } = useContext(DataContext);
  const champion =
    teamData.find((team) => team.team_slot === 63)?.team_name || "63";

  const handleClick = () => {
    setTeamData((t: TeamStats[]) => [...t, ...simulateRound(t)]);
    setTeamData((t: TeamStats[]) => [...t, ...simulateRound(t)]);
    setTeamData((t: TeamStats[]) => [...t, ...simulateRound(t)]);
    setTeamData((t: TeamStats[]) => [...t, ...simulateRound(t)]);
    setTeamData((t: TeamStats[]) => [...t, ...simulateRound(t)]);
    setTeamData((t: TeamStats[]) => [...t, ...simulateRound(t)]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <RegionBracket
          key="South"
          roundProps={mapBracket(teamData, initSouth)}
        />
        <RegionBracket
          key="Midwest"
          rtl
          roundProps={mapBracket(teamData, initMidwest)}
        />
      </div>
      <div className="flex flex-col items-center border-blue-500 w-1/2">
        <button
          className="py-1 px-2 text-white bg-red-500 rounded hover:bg-red-700"
          onClick={handleClick}
        >
          Simulate Tournament
        </button>
        <div className="py-2" />
        <div className="flex border-red-500 w-1/2">
          <div className="w-1/2 flex">
            <CustomSeed
              seed={mapFinal(teamData, leftFourInit)}
              roundIndex={1}
              seedIndex={1}
              breakpoint={100}
            />
          </div>
          <div className="w-1/2 flex-inline">
            <CustomSeed
              seed={mapFinal(teamData, rightFourInit)}
              roundIndex={1}
              seedIndex={1}
              breakpoint={100}
            />
          </div>
        </div>
        <div className="flex border-green-500 w-1/4">
          <CustomSeed
            seed={mapFinal(teamData, finalInit)}
            roundIndex={1}
            seedIndex={1}
            breakpoint={100}
          />
        </div>
        <div className="py-2" />
        <div className="flex flex-col items-center text-white bg-slate-800 px-8 rounded">
          <h2>Champion</h2>
          <h3 className="text-sm">{champion}</h3>
        </div>
      </div>
      <div className="flex">
        <RegionBracket key="East" roundProps={mapBracket(teamData, initEast)} />
        <RegionBracket
          key="West"
          rtl
          roundProps={mapBracket(teamData, initWest)}
        />
      </div>
    </div>
  );
};

export default FullBracket;
