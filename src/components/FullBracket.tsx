import React, { useEffect, useState } from "react";
import { IRenderSeedProps, IRoundProps, ISeedProps } from "react-brackets";
import CustomSeed from "./CustomSeed";
import RegionBracket from "./RegionBracket";
import { emptyRegionProps, mockTeams } from "../constants/mockData";
import { TeamStats } from "../constants/types";

const four: IRenderSeedProps = {
  seed: { id: 1, teams: [] },
  roundIndex: 1,
  seedIndex: 1,
  breakpoint: 100,
};

type team = { [key: string]: any; name?: string };

const teams = mockTeams.filter((team) => team.team_slot % 2 === 0);

const mapRound = (roundTeams: TeamStats[], round: string) => {
  let teamPairs = roundTeams
    .map((team) => ({ name: team.team_name }))
    .reduce((result: any[], val, ind, array: any[]) => {
      if (ind % 2 === 0) result.push(array.slice(ind, ind + 2));
      return result;
    }, []);
  return {
    title: round,
    seeds: teamPairs.map((pair, ind) => ({ id: ind, teams: pair })),
  };
};

const mapTourney = (teamInfo: TeamStats[]) => {
  
}

const chooseFirst = (match: team[]): team => match[0];

type FullBracketProps = {};

const FullBracket = (props: FullBracketProps) => {
  const [tourney, setTourney] = useState<TeamStats[]>(teams);

  const [southProps, setSouthProps] = useState<IRoundProps[]>(emptyRegionProps);
  const [eastProps, setEastProps] = useState<IRoundProps[]>(emptyRegionProps);
  const [midwestProps, setMidwestProps] =
    useState<IRoundProps[]>(emptyRegionProps);
  const [westProps, setWestProps] = useState<IRoundProps[]>(emptyRegionProps);
  const [lsemiProps, setLsemiProps] = useState<ISeedProps>(four.seed);
  const [rsemiProps, setRsemiProps] = useState<ISeedProps>(four.seed);
  const [finalProps, setFinalProps] = useState<ISeedProps>(four.seed);

  const chooseWinners = (
    roundProps: IRoundProps[],
    roundTitle: string,
    nextRoundTitle: string,
    comp: (arg: team[]) => team
  ): IRoundProps => {
    let currentSeeds = roundProps.find(
      (round) => round.title === roundTitle
    )?.seeds;
    let newSeeds = currentSeeds?.reduce(
      (result: ISeedProps[], val, ind, array: ISeedProps[]) => {
        if (ind % 2 === 0)
          result.push(getWinners(array[ind], array[ind + 1], comp));
        return result;
      },
      []
    );
    let nextRound: IRoundProps = {
      title: nextRoundTitle,
      seeds: newSeeds ? newSeeds : [],
    };
    return nextRound;
  };

  const getWinners = (
    firstMatch: ISeedProps,
    secondMatch: ISeedProps,
    comp: (arg: team[]) => team
  ): ISeedProps => {
    return {
      id: 5,
      teams: [comp(firstMatch.teams), comp(secondMatch.teams)],
    };
  };

  const simFinal = () => {
    console.log(() => southProps.find((round) => round.title === "Elite 8"));
    console.log(
      getWinners(southProps[3].seeds[0], midwestProps[3].seeds[0], chooseFirst)
    );
    setLsemiProps(
      getWinners(southProps[3].seeds[0], midwestProps[3].seeds[0], chooseFirst)
    );
  };

  const simulateRound = (firstRound: string, secondRound: string): void => {
    setSouthProps((s) => [
      ...s.map((round) =>
        round.title === secondRound
          ? chooseWinners(s, firstRound, secondRound, chooseFirst)
          : round
      ),
    ]);
    setMidwestProps((m) => [
      ...m.map((round) =>
        round.title === secondRound
          ? chooseWinners(m, firstRound, secondRound, chooseFirst)
          : round
      ),
    ]);
    setEastProps((e) => [
      ...e.map((round) =>
        round.title === secondRound
          ? chooseWinners(e, firstRound, secondRound, chooseFirst)
          : round
      ),
    ]);
    setWestProps((w) => [
      ...w.map((round) =>
        round.title === secondRound
          ? chooseWinners(w, firstRound, secondRound, chooseFirst)
          : round
      ),
    ]);
  };

  const simulate = () => {
    simulateRound("Round 1", "Round 2");
    simulateRound("Round 2", "Sweet 16");
    simulateRound("Sweet 16", "Elite 8");
    simFinal();
  };

  useEffect(() => {
    let south = mapRound(
      teams.filter((team) => team.team_region === "South"),
      "Round 1"
    );
    setSouthProps([
      ...emptyRegionProps.map((round) =>
        round.title === "Round 1" ? south : round
      ),
    ]);
    let east = mapRound(
      teams.filter((team) => team.team_region === "East"),
      "Round 1"
    );
    setEastProps([
      ...emptyRegionProps.map((round) =>
        round.title === "Round 1" ? east : round
      ),
    ]);
    let midwest = mapRound(
      teams.filter((team) => team.team_region === "Midwest"),
      "Round 1"
    );
    setMidwestProps([
      ...emptyRegionProps.map((round) =>
        round.title === "Round 1" ? midwest : round
      ),
    ]);
    let west = mapRound(
      teams.filter((team) => team.team_region === "West"),
      "Round 1"
    );
    setWestProps([
      ...emptyRegionProps.map((round) =>
        round.title === "Round 1" ? west : round
      ),
    ]);
  }, []);

  return (
    <div>
      <button onClick={simulate}>whole</button>
      <div className="flex">
        <RegionBracket roundProps={southProps} />
        <RegionBracket rtl roundProps={midwestProps} />
      </div>
      <div className="flex">
        <h4>Final Four</h4>
        <div className="w-1/6 border flex-inline">
          <CustomSeed
            seed={lsemiProps}
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
        <RegionBracket roundProps={eastProps} />
        <RegionBracket rtl roundProps={westProps} />
      </div>
    </div>
  );
};

export default FullBracket;
