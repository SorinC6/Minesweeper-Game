import React, { FC } from 'react';
import { Top } from './components/Top';
import { Scoreboard } from './components/Scoreboard';

const App: FC = () => {
  return (
    <>
      <Top feature="Flag" firstAction="ctrl" secondAction="click">
        Minesweeper
      </Top>
      <Scoreboard time="000" levels={['beginner', 'intermediate', 'expert']} mines="010" onReset={() => null} />
    </>
  );
};

export default App;
