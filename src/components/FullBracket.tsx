import React, { useContext } from "react";
import { IRoundProps, ISeedProps } from "react-brackets";
import CustomSeed from "./CustomSeed";
import RegionBracket from "./RegionBracket";
import { finalInit, initEast, initMidwest, initSouth, initWest, leftFourInit, rightFourInit } from "../constants/mockData";
import { TeamStats } from "../constants/types";
import { DataContext } from "./Tournament";

type Team = { [key: string]: any; name?: string };

const mapBracket = (teamInfo: TeamStats[], dest: IRoundProps[]): IRoundProps[] => {
  let updateTeam = (t: Team): Team => { 
    const tm = teamInfo.find(x => x.team_slot === t.slot)
    return {...t, name: tm?.team_name, slot: t.slot}
  }
  let updateTeams = (ts: Team[]): Team[] => ts.map(t => updateTeam(t))
  let updateSeed = (s: ISeedProps): ISeedProps => ({...s, teams: updateTeams(s.teams)})
  let updateSeeds =(ss: ISeedProps[]): ISeedProps[] => ss.map(s => updateSeed(s))
  let updateRound = (r: IRoundProps): IRoundProps => ({...r, seeds: updateSeeds(r.seeds)})
  let updateRounds = (rs: IRoundProps[]): IRoundProps[] => rs.map(r => updateRound(r))
  return updateRounds(dest)
}

const mapFinal = (teamInfo: TeamStats[], dest: ISeedProps) : ISeedProps => {
  const team1 = teamInfo.find(t => t.team_slot === dest.teams[0].slot)
  const team2 = teamInfo.find(t => t.team_slot === dest.teams[1].slot)
  const result = {...dest, teams: [
    { ...team1, name: team1?.team_name, slot: dest.teams[0].slot },
    { ...team2, name: team2?.team_name, slot: dest.teams[1].slot },
  ]}
  console.log(result)
  return result
}

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

type FullBracketProps = {
};

const FullBracket = (props: FullBracketProps) => {

  const { teamData, setTeamData } = useContext(DataContext)

  const handleClick = () => {
    console.log('clicked sim round')
    const newTeams: TeamStats[] = []
    teamData.forEach((value: TeamStats, index: number) => {
      if (index % 2 === 0) {
      console.log(teamData.slice(index, index + 2))
      newTeams.push(chooseWinner(teamData.slice(index, index+2)))
    }
    }
    )
    setTeamData([...teamData, ...newTeams])
  }

  return (
    <div>
      <button onClick={handleClick}>Sim Round</button>
      <div className="flex">
        <RegionBracket key='South' roundProps={mapBracket(teamData, initSouth)} />
        <RegionBracket key= 'Midwest' rtl roundProps={mapBracket(teamData, initMidwest)} />
      </div>
      <div className="flex">
        <h4>Final Four</h4>
        <div className="w-1/6 border flex-inline">
          <CustomSeed
            seed={mapFinal(teamData, leftFourInit)}
            roundIndex={1}
            seedIndex={1}
            breakpoint={100}
          />
        </div>
        <div className="w-1/6 border flex-inline">
          <CustomSeed
            seed={mapFinal(teamData, rightFourInit)}
            roundIndex={1}
            seedIndex={1}
            breakpoint={100}
          />
        </div>
      </div>
      <div className="flex">
        <h4>Championship</h4>
        <CustomSeed
          seed={mapFinal(teamData, finalInit)}
          roundIndex={1}
          seedIndex={1}
          breakpoint={100}
          />
      </div>
      <div className="flex">
        <RegionBracket key='East' roundProps={mapBracket(teamData, initEast)} />
        <RegionBracket key='West' rtl roundProps={mapBracket(teamData, initWest)} />
      </div>
    </div>
  );
};

export default FullBracket;
