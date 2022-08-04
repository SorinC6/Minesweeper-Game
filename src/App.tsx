import React, { FC } from 'react';
import MinesweeperWithHooks from './pages/MinesweeperWithHooks';
import './app.css';

import { BrowserRouter as Router, Routes, Route, Link, Navigate, useSearchParams } from 'react-router-dom';

export const Navigator: FC = () => {
  const [searchParams] = useSearchParams();
  const level = searchParams.get('level') || '';

  const getLocationObjWithSearchParams = (pathname: string): Partial<Location> => ({
    pathname,
    search: `${
      level &&
      `?${new URLSearchParams({
        level,
      }).toString()}`
    }`,
  });

  return (
    <nav>
      <ul>
        <li>
          <Link to={getLocationObjWithSearchParams('/')}>Home</Link>{' '}
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/game-with-hooks')}>Game With Hooks</Link>{' '}
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/game-with-usereducer')}>Game With useReducer</Link>
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/game-with-reactredux')}>Game With ReactRedux</Link>
        </li>
      </ul>
    </nav>
  );
};

const App: FC = () => {
  return (
    <Router>
      <Navigator />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game-with-hooks" element={<MinesweeperWithHooks />} />
        <Route path="/game-with-usereducer" element={<MinesweeperWithHooks />} />
        <Route path="/game-with-reactredux" element={<MinesweeperWithHooks />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

const Home = () => <h2>Home for game</h2>;
