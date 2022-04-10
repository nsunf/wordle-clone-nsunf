import styled from "styled-components";

import TilesMatrixContainer from "../container/TilesMatrixContainer";
import LeaderboardContainer from "../container/LeaderboardContainer";
import { Route, Routes } from "react-router-dom";

const BodyBlock = styled.div`
`;

function Body() {
  return (
    <BodyBlock>
      <Routes>
        <Route path="/" element={<TilesMatrixContainer/>}/>
        <Route path="/leaderboard" element={<LeaderboardContainer/>}/>
      </Routes>
    </BodyBlock>
  );
}

export default Body