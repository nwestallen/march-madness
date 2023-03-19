import React, { createContext, useState } from "react";
import { mockTeams } from "../constants/mockData";
import { TeamStats } from "../constants/types";
import FullBracket from "./FullBracket";

type Props = {};

const defaultDataContext = {
    teamData: mockTeams,
    setTeamData: (teamData: TeamStats[]) => {}
}

export const DataContext = createContext(defaultDataContext)

const Tournament = (props: Props) => {
  const [teamData, setTeamData] = useState<TeamStats[]>(mockTeams)
  return (
    <DataContext.Provider value={{teamData, setTeamData}}>
      <FullBracket />
    </DataContext.Provider>
  );
};

export default Tournament;
