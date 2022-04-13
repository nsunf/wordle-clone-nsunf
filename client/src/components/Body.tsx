import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import TilesMatrixContainer from "../container/TilesMatrixContainer";
import LeaderboardContainer from "../container/LeaderboardContainer";
import SettingsContainer from "../container/SettingsContainer";

const BodyBlock = styled.div<{headerHeight: number}>`
  ${props => `height: calc(100% - ${props.headerHeight}px);`}
`;

function Body( {headerHeight }: { headerHeight: number }) {
  return (
    <BodyBlock headerHeight={headerHeight}>
      <Routes>
        <Route path="/" element={<TilesMatrixContainer/>}/>
        <Route path="/leaderboard" element={<LeaderboardContainer/>}/>
        <Route path="/setting" element={<SettingsContainer/>}/>
      </Routes>
    </BodyBlock>
  );
}

export default Body