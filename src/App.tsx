import React, { FC } from 'react';
import { MinesweeperWithHooks } from './pages/MinesweeperWithHooks';
import { MinesweeperWithUseReducer } from './pages/MinesweeperWithUseReducer/MinesweeperWithUseReducer';
import { MinesweeperWithReactRedux } from './pages/MinesweeperWithReactRedux';

import { store } from '@/store';
import { Provider } from 'react-redux';

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
          <Link to={getLocationObjWithSearchParams('/')}>Game With Hooks</Link>{' '}
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
    <Provider store={store}>
      <Router>
        <Navigator />
        <Routes>
          <Route path="/" element={<MinesweeperWithHooks />} />
          <Route path="/game-with-usereducer" element={<MinesweeperWithUseReducer />} />
          <Route path="/game-with-reactredux" element={<MinesweeperWithReactRedux />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
