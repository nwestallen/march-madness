import React from 'react';
import './index.css';
import RegionBracket from './components/RegionBracket';

function App() {
  return (
    <div className='text-xl font-bold underline'>
      <h1>March Madness Bracket Generator</h1>
      <div className='flex'>
      <RegionBracket/>
      <RegionBracket rtl/>
      </div>
      <div className='flex'>
      <RegionBracket/>
      <RegionBracket rtl/>
      </div>
    </div>
  );
}

export default App;
