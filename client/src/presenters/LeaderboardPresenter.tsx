import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

import HistoryTile from "../components/HistoryTile";

import { IHistory } from "../models/IHistory";


const BackgroundBlock = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Presenter = styled.div`
  width: 70vw;
  height: 90vh;

  position: absolute;
  bottom: 0;
  left: 50%;


  transform: translateX(-50%);

  background: #e4e4e4;
  border-radius: 4px 4px 0 0;

  @media (max-width: 1024px) {
    width: 80vw;
  }
  @media (max-width: 768px) {
    width: 95vw;
    height: 88vh;
  }
`;

const CloseBtn = styled(AiOutlineClose)`
  float: right;

  font-size: 32px;
  padding: 8px;
  color: black;

  cursor: pointer;
`;

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  clear: both;
`;


interface PresenterProps {
  histories: IHistory[]|null;
}

function LeaderboardPresenter({ histories }: PresenterProps) {
  return (
    <BackgroundBlock>
    <Presenter>
      <Link to="/"><CloseBtn/></Link>
      <Wrap>
        {histories ? histories.map((history, i) => <HistoryTile key={`${history.word}_history_${i}`} history={history}/>) : null}
      </Wrap>
    </Presenter>
    </BackgroundBlock>
  ); 
}

export default LeaderboardPresenter;