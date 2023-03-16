import React, { useEffect, useState } from 'react'
import { IRenderSeedProps, IRoundProps, ISeedProps } from 'react-brackets'
import CustomSeed from './CustomSeed'
import RegionBracket from './RegionBracket'
import { emptyRegionProps, mockTeams } from '../constants/mockData'

const four: IRenderSeedProps = {
  seed: {id: 1, teams: []},
  roundIndex: 1,
  seedIndex: 1,
  breakpoint: 100
}

const teams = mockTeams.filter(team => team.team_slot % 2 === 0)

const mapRound = (roundTeams: any[], round: string) => {
  let teamPairs = roundTeams.map(team => ({name: team.team_name})).reduce(
    (result: any[], val, ind, array: any[]) => {
      if(ind % 2 === 0)
      result.push(array.slice(ind, ind + 2));
      return result;
    }, [])
  return {
    title: round,
    seeds: teamPairs.map((pair, ind) => ({id: ind, teams: pair}))
  }
}

const chooseFirst = (match: any[]) => match[0]

type FullBracketProps = {}

const FullBracket = (props: FullBracketProps) => {

    const [ southProps, setSouthProps ] = useState<IRoundProps[]>(emptyRegionProps)
    const [ eastProps, setEastProps ] = useState<IRoundProps[]>(emptyRegionProps)
    const [ midwestProps, setMidwestProps ] = useState<IRoundProps[]>(emptyRegionProps)
    const [ westProps, setWestProps ] = useState<IRoundProps[]>(emptyRegionProps)

    const chooseWinners = (
        roundProps: IRoundProps[], 
        roundTitle: string, nextRoundTitle: string, comp: (arg: any[]) => any[]): IRoundProps => {
        let currentSeeds = roundProps.find(round => round.title === roundTitle)?.seeds
        let currentTeams = currentSeeds?.map(seed => seed.teams)
        let nextTeams = currentTeams?.map(match => comp(match))
        let nextSeeds = nextTeams?.reduce(
            (result: ISeedProps[], val, ind, array: any[]) => {
                if(ind % 2 === 0)
                result.push({id: ind/2 + 1, teams: array.slice(ind, ind + 2)})
                return result;
            }, []
        )
        let nextRound: IRoundProps = { title: nextRoundTitle, seeds: nextSeeds ? nextSeeds : []}
        return nextRound
    }

    const simulateRound1 = () => {
        console.log('simulating 1st round')
        setSouthProps(s => [...s.map(round => round.title === 'Round 2' ? chooseWinners(s, 'Round 1', 'Round 2', chooseFirst) : round)])
        setMidwestProps([...midwestProps.map(round => round.title === 'Round 2' ? chooseWinners(midwestProps, 'Round 1', 'Round 2', chooseFirst) : round)])
        setEastProps([...eastProps.map(round => round.title === 'Round 2' ? chooseWinners(eastProps, 'Round 1', 'Round 2', chooseFirst) : round)])
        setWestProps([...westProps.map(round => round.title === 'Round 2' ? chooseWinners(westProps, 'Round 1', 'Round 2', chooseFirst) : round)])
    }

    const simulateRound2 = () => {
        console.log('simulating 2nd round')
        setSouthProps(s => [...s.map(round => round.title === 'Sweet 16' ? chooseWinners(s, 'Round 2', 'Sweet 16', chooseFirst) : round)])
        setMidwestProps([...midwestProps.map(round => round.title === 'Sweet 16' ? chooseWinners(midwestProps, 'Round 2', 'Sweet 16', chooseFirst) : round)])
        setEastProps([...eastProps.map(round => round.title === 'Sweet 16' ? chooseWinners(eastProps, 'Round 2', 'Sweet 16', chooseFirst) : round)])
        setWestProps([...westProps.map(round => round.title === 'Sweet 16' ? chooseWinners(westProps, 'Round 2', 'Sweet 16', chooseFirst) : round)])
    }

    const simulate = () => {
        simulateRound1()
        simulateRound2()
    }

    useEffect(() => {
      let south = mapRound(teams.filter(team => team.team_region === 'South'), 'Round 1')
      setSouthProps([...emptyRegionProps.map(round => round.title === 'Round 1' ? south : round)])
      let east = mapRound(teams.filter(team => team.team_region === 'East'), 'Round 1')
      setEastProps([...emptyRegionProps.map(round => round.title === 'Round 1' ? east : round)])
      let midwest = mapRound(teams.filter(team => team.team_region === 'Midwest'), 'Round 1')
      setMidwestProps([...emptyRegionProps.map(round => round.title === 'Round 1' ? midwest : round)])
      let west = mapRound(teams.filter(team => team.team_region === 'West'), 'Round 1')
      setWestProps([...emptyRegionProps.map(round => round.title === 'Round 1' ? west : round)])
    }, [])
    

  return (
    <div>
        <button onClick={simulateRound1}>round 1</button>
        <button onClick={simulateRound2}>round 2</button>
        <button onClick={simulate}>whole</button>
      <div className='flex'>
      <RegionBracket roundProps={southProps}/>
      <RegionBracket rtl roundProps={midwestProps}/>
      </div>
      <div className='flex'>
        <h4>Final Four</h4>
        <div className='w-1/6 border flex-inline'>
            <CustomSeed seed={four.seed} roundIndex={four.roundIndex} seedIndex={four.seedIndex} breakpoint={four.breakpoint}/>
        </div>
        <div className='w-1/6 border flex-inline'>
            <CustomSeed seed={four.seed} roundIndex={four.roundIndex} seedIndex={four.seedIndex} breakpoint={four.breakpoint}/>
        </div>
      </div>
      <div className='flex'>
      <RegionBracket roundProps={eastProps}/>
      <RegionBracket rtl roundProps={westProps}/>
      </div>
    </div>
  )
}

export default FullBracket