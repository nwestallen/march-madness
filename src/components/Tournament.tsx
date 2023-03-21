import React, { createContext,  useState } from "react";
import { TeamStats } from "../constants/types";
import FullBracket from "./FullBracket";

type TournamentProps = {};

type DataContextType = {
    teamData: TeamStats[];
    setTeamData: React.Dispatch<React.SetStateAction<TeamStats[]>>
}

const defaultDataContext: DataContextType = {
    teamData: [],
    setTeamData: (teamData) => {}
}

type CompContextType = {
  funcSelection: string;
  setFuncSelection: React.Dispatch<React.SetStateAction<string>>
}

const defaultCompContext: CompContextType = {
  funcSelection: 'simulate',
  setFuncSelection:(funcSelection) => {}
}

export const DataContext = createContext<DataContextType>(defaultDataContext)
export const CompContext = createContext<CompContextType>(defaultCompContext)

const Tournament = (props: TournamentProps) => {
  const [teamData, setTeamData] = useState<TeamStats[]>(defaultDataContext.teamData)
  const [funcSelection, setFuncSelection] = useState<string>(defaultCompContext.funcSelection)
  return (
    <DataContext.Provider value={{teamData, setTeamData}}>
      <CompContext.Provider value={{funcSelection, setFuncSelection}}>
        <FullBracket />
      </CompContext.Provider>
    </DataContext.Provider>
  );
};

export default Tournament;
