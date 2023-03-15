import React, { useEffect, useState } from 'react'
import { Bracket, IRoundProps } from 'react-brackets';
import { emptyRegionProps, mockTeams } from '../constants/mockData';
import CustomSeed from './CustomSeed'

type RegionBracketProps = { 
  rtl?: boolean
  r1Teams?: any[]
  roundProps: IRoundProps[]
}

const sampleTeams = mockTeams.slice(0,8)

const mapRound = (roundTeams: any[]) => {
  let teamPairs = roundTeams.map(team => ({name: team.team_name})).reduce(
    (result: any[], val, ind, array: any[]) => {
      if(ind % 2 === 0)
      result.push(array.slice(ind, ind + 2));
      return result;
    }, [])
  return {
    title: 'Round 2',
    seeds: teamPairs.map((pair, ind) => ({id: ind, teams: pair}))
  }
}

const RegionBracket = ({ rtl, roundProps }: RegionBracketProps) => {

    const [ rounds, setRounds ] = useState<IRoundProps[]>(emptyRegionProps)

  useEffect(() => {
    setRounds(roundProps)
  },[roundProps])

    const handleCalc = () => {
      setRounds(
        [...rounds.map(round => round.title === 'Round 2' ? mapRound(sampleTeams): round)]
      )
      console.log(mapRound(sampleTeams))
    }

  return (
    <div className='flex-inline border-4 text-sm w-1/2 pb-4'>
        <Bracket rounds={rounds} rtl={rtl} renderSeedComponent={CustomSeed}/>
        <button onClick={handleCalc}>Calc</button>
    </div>
  )
}

export default RegionBracket