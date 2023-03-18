import { Seed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';
import React from 'react';

const CustomSeed = ({seed, breakpoint, roundIndex, seedIndex}: IRenderSeedProps) => {
  // breakpoint passed to Bracket component
  // to check if mobile view is triggered or not

  // mobileBreakpoint is required to be passed down to a seed

  //onClick callback to update FullBracket state
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div>
          <SeedTeam style={{ color: 'white' }}>{seed.teams[0]?.name || 'TBD'}</SeedTeam>
          <SeedTeam style={{ color: 'white' }}>{seed.teams[1]?.name || 'TBD'}</SeedTeam>
        </div>
      </SeedItem>
      <button>Test</button>
    </Seed>
  );
};

export default CustomSeed
