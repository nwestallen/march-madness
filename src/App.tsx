import React from 'react';
import './index.css';
import FullBracket from './components/FullBracket';

function App() {
  return (
    <div className='text-xl font-bold underline'>
      <h1>March Madness Bracket Generator</h1>
      <FullBracket/>
    </div>
  );
}

export default App;
