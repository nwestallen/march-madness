import React, { useState } from 'react'
import { Bracket, IRoundProps } from 'react-brackets';
import CustomSeed from './CustomSeed'

const roundsInit: IRoundProps[] = [
  {
    title: '',
    seeds: [
      {
        id: 1,
        teams: [{ name: 'Team A' }, { name: 'Team B' }],
      },
      {
        id: 2,
        teams: [{ name: 'Team C' }, { name: 'Team D' }],
      },
      {
        id: 3,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 4,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 5,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 6,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 7,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 8,
        teams: [{ name: '' }, { name: '' }],
      },
    ],
  },
  {
    title: '',
    seeds: [
      {
        id: 1,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
      {
        id: 2,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
      {
        id: 3,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
      {
        id: 4,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
    ],
  },
  {
    title: '',
    seeds: [
      {
        id: 1,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
      {
        id: 2,
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
    ],
  },
];

type Props = { rtl?: boolean }

const RegionBracket = ({ rtl }: Props) => {

    const [ rounds, setRounds ] = useState<IRoundProps[]>(roundsInit)
  return (
    <div className='flex-inline border-4 text-sm w-1/2 pb-4'>
        <Bracket rounds={rounds} rtl={rtl} renderSeedComponent={CustomSeed}/>
    </div>
  )
}

export default RegionBracket