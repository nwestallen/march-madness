import React, { useState } from 'react'
import { Bracket, IRoundProps } from 'react-brackets';
import { mockTeams } from '../constants/mockData';
import CustomSeed from './CustomSeed'

const roundsInit: IRoundProps[] = [
  {
    title: 'Round 1',
    seeds: [
      {
        id: 1,
        teams: [{ name: 'slot 0' }, { name: 'slot 2' }],
      },
      {
        id: 2,
        teams: [{ name: 'slot 4' }, { name: 'slot 6' }],
      },
      {
        id: 3,
        teams: [{ name: 'slot 8' }, { name: 'slot 10' }],
      },
      {
        id: 4,
        teams: [{ name: 'slot 12' }, { name: 'slot 16' }],
      },
      {
        id: 5,
        teams: [{ name: 'slot 18' }, { name: 'slot 20' }],
      },
      {
        id: 6,
        teams: [{ name: 'slot 22' }, { name: 'slot 24' }],
      },
      {
        id: 7,
        teams: [{ name: 'slot 26' }, { name: 'slot 28' }],
      },
      {
        id: 8,
        teams: [{ name: 'slot 30' }, { name: 'slot 32' }],
      },
    ],
  },
  {
    title: 'Round 2',
    seeds: [
      {
        id: 1,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 2,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 3,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 4,
        teams: [{ name: '' }, { name: '' }],
      },
    ],
  },
  {
    title: 'Sweet 16',
    seeds: [
      {
        id: 1,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 2,
        teams: [{ name: '' }, { name: '' }],
      },
    ],
  },
  {
    title: 'Elite 8',
    seeds: [
      {
        id: 1,
        teams: [{name: ''}, {name: ''}]
      }
    ]
  }
];

type RegionBracketProps = { 
  rtl?: boolean
  r1Teams?: any[]
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
    title: 'Elite 8',
    seeds: teamPairs.map((pair, ind) => ({id: ind, teams: pair}))
  }
}

const RegionBracket = ({ rtl, r1Teams }: RegionBracketProps) => {

    const [ rounds, setRounds ] = useState<IRoundProps[]>(roundsInit)

    const handleCalc = () => {
      const roundOne: IRoundProps = {
        title: 'Elite 8',
        seeds: [{ id: 1, teams: [ {name: 'test'}, {name: 'success'}]}]
      }
      setRounds(
        [...rounds.filter(round => round.title !== 'Elite 8'), roundOne]
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