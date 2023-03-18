import React, { useEffect, useState } from "react";
import { IRenderSeedProps, IRoundProps, ISeedProps } from "react-brackets";
import CustomSeed from "./CustomSeed";
import RegionBracket from "./RegionBracket";
import { initEast, initMidwest, initSouth, initWest, mockTeams } from "../constants/mockData";
import { TeamStats } from "../constants/types";

const four: IRenderSeedProps = {
  seed: { id: 1, teams: [] },
  roundIndex: 1,
  seedIndex: 1,
  breakpoint: 100,
};

type team = { [key: string]: any; name?: string };

const mapBrack = (teamInfo: TeamStats[], dest: IRoundProps[]): IRoundProps[] => {
  let updateTeam = (t: team): team => ({...t, name: teamInfo.find(x => x.team_slot === t.slot)?.team_name})
  let updateTeams = (ts: team[]): team[] => ts.map(t => updateTeam(t))
  let updateSeed = (s: ISeedProps): ISeedProps => ({...s, teams: updateTeams(s.teams)})
  let updateSeeds =(ss: ISeedProps[]): ISeedProps[] => ss.map(s => updateSeed(s))
  let updateRound = (r: IRoundProps): IRoundProps => ({...r, seeds: updateSeeds(r.seeds)})
  let updateRounds = (rs: IRoundProps[]): IRoundProps[] => rs.map(r => updateRound(r))
  return updateRounds(dest)
}

const chooseFirst = (match: team[]): team => match[0];

type FullBracketProps = {};

const FullBracket = (props: FullBracketProps) => {

  useEffect(() => {
  }, []);

  return (
    <div>
      <div className="flex">
        <RegionBracket key='South' roundProps={mapBrack(mockTeams, initSouth)} />
        <RegionBracket key= 'Midwest' rtl roundProps={mapBrack(mockTeams, initMidwest)} />
      </div>
      <div className="flex">
        <h4>Final Four</h4>
        <div className="w-1/6 border flex-inline">
          <CustomSeed
            seed={four.seed}
            roundIndex={four.roundIndex}
            seedIndex={four.seedIndex}
            breakpoint={four.breakpoint}
          />
        </div>
        <div className="w-1/6 border flex-inline">
          <CustomSeed
            seed={four.seed}
            roundIndex={four.roundIndex}
            seedIndex={four.seedIndex}
            breakpoint={four.breakpoint}
          />
        </div>
      </div>
      <div className="flex">
        <RegionBracket key='East' roundProps={mapBrack(mockTeams, initEast)} />
        <RegionBracket key='West' rtl roundProps={mapBrack(mockTeams, initWest)} />
      </div>
    </div>
  );
};

export default FullBracket;
