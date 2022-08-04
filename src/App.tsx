import React, { FC } from 'react';
import MinesweeperWithHooks from './pages/MinesweeperWithHooks';
import './app.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useQuery } from './hooks/useQuery';

export const Navigator: FC = () => {
  const query = useQuery();
  const level = query.get('level') || '';

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
      <Switch>
        <Route path="/game-with-hooks">
          <MinesweeperWithHooks />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

const Home = () => <h2>Home for game</h2>;
