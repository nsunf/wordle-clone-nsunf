import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import TilesMatrixContainer from "../container/TilesMatrixContainer";
import LeaderboardContainer from "../container/LeaderboardContainer";
import SettingsContainer from "../container/SettingsContainer";

const BodyBlock = styled.div`
  height: calc(100vh - 80px);
`;

function Body() {
  return (
    <BodyBlock>
      <Routes>
        <Route path="/" element={<TilesMatrixContainer/>}/>
        <Route path="/leaderboard" element={<LeaderboardContainer/>}/>
        <Route path="/setting" element={<SettingsContainer/>}/>
      </Routes>
    </BodyBlock>
  );
}

export default Body