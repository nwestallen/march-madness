import React, { useContext, useEffect } from "react";
import { IRenderSeedProps, IRoundProps, ISeedProps } from "react-brackets";
import CustomSeed from "./CustomSeed";
import RegionBracket from "./RegionBracket";
import { initEast, initMidwest, initSouth, initWest } from "../constants/mockData";
import { TeamStats } from "../constants/types";
import { DataContext } from "./Tournament";

const four: IRenderSeedProps = {
  seed: { id: 1, teams: [] },
  roundIndex: 1,
  seedIndex: 1,
  breakpoint: 100,
};

type Team = { [key: string]: any; name?: string };

const mapBracket = (teamInfo: TeamStats[], dest: IRoundProps[]): IRoundProps[] => {
  let updateTeam = (t: Team): Team => ({...t, name: teamInfo.find(x => x.team_slot === t.slot)?.team_name})
  let updateTeams = (ts: Team[]): Team[] => ts.map(t => updateTeam(t))
  let updateSeed = (s: ISeedProps): ISeedProps => ({...s, teams: updateTeams(s.teams)})
  let updateSeeds =(ss: ISeedProps[]): ISeedProps[] => ss.map(s => updateSeed(s))
  let updateRound = (r: IRoundProps): IRoundProps => ({...r, seeds: updateSeeds(r.seeds)})
  let updateRounds = (rs: IRoundProps[]): IRoundProps[] => rs.map(r => updateRound(r))
  return updateRounds(dest)
}

type FullBracketProps = {
};

const FullBracket = (props: FullBracketProps) => {

  const { teamData, setTeamData } = useContext(DataContext)

  const handleClick = () => {
    console.log('clicked Add Team')
    setTeamData([...teamData, {team_name: 'Alabama', team_slot: 7, team_id: 333, team_region: 'South', team_rating: 100 }])
  }

  useEffect(() => {
  }, []);

  return (
    <div>
      <button onClick={handleClick}>Add Team</button>
      <div className="flex">
        <RegionBracket key='South' roundProps={mapBracket(teamData, initSouth)} />
        <RegionBracket key= 'Midwest' rtl roundProps={mapBracket(teamData, initMidwest)} />
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
        <RegionBracket key='East' roundProps={mapBracket(teamData, initEast)} />
        <RegionBracket key='West' rtl roundProps={mapBracket(teamData, initWest)} />
      </div>
    </div>
  );
};

export default FullBracket;
