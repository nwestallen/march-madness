import React from 'react';
import './index.css';
import RegionBracket from './components/RegionBracket';
import { IRenderSeedProps } from 'react-brackets';
import CustomSeed from './components/CustomSeed';

const four: IRenderSeedProps = {
  seed: {id: 1, teams: []},
  roundIndex: 1,
  seedIndex: 1,
  breakpoint: 100
}

function App() {
  return (
    <div className='text-xl font-bold underline'>
      <h1>March Madness Bracket Generator</h1>
      <div className='flex'>
      <RegionBracket/>
      <RegionBracket rtl/>
      </div>
      <div className='w-1/6'>
        <CustomSeed seed={four.seed} roundIndex={four.roundIndex} seedIndex={four.seedIndex} breakpoint={four.breakpoint}/>
      </div>
      <div className='flex'>
      <RegionBracket/>
      <RegionBracket rtl/>
      </div>
    </div>
  );
}

export default App;
