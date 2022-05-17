import React, { FC } from "react";
import { Top } from "./components/Top/Top";

const App = () => {
  return (
    <div>
      <Top feature="Flag" firstAction="ctrl" secondAction="click">
        Minesweeper
      </Top>
    </div>
  );
};

export default App;
