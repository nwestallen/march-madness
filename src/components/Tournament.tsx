import React, { createContext,  useState } from "react";
import { mockTeams } from "../constants/mockData";
import { TeamStats } from "../constants/types";
import FullBracket from "./FullBracket";

type Props = {};

type DataContextType = {
    teamData: TeamStats[];
    setTeamData: React.Dispatch<React.SetStateAction<TeamStats[]>>
}

const defaultDataContext: DataContextType = {
    teamData: mockTeams,
    setTeamData: (teamData) => {}
}

export const DataContext = createContext(defaultDataContext)

const Tournament = (props: Props) => {
  const [teamData, setTeamData] = useState<TeamStats[]>(defaultDataContext.teamData)
  return (
    <DataContext.Provider value={{teamData, setTeamData}}>
      <FullBracket />
    </DataContext.Provider>
  );
};

export default Tournament;
