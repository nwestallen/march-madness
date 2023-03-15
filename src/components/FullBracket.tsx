import React, { useEffect, useState } from 'react'
import { IRenderSeedProps, IRoundProps } from 'react-brackets'
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

type FullBracketProps = {}

const FullBracket = (props: FullBracketProps) => {

    const [ southProps, setSouthProps ] = useState<IRoundProps[]>(emptyRegionProps)
    const [ eastProps, setEastProps ] = useState<IRoundProps[]>(emptyRegionProps)
    const [ midwestProps, setMidwestProps ] = useState<IRoundProps[]>(emptyRegionProps)
    const [ westProps, setWestProps ] = useState<IRoundProps[]>(emptyRegionProps)

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