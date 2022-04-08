import { ReactNode } from "react";
import styled from "styled-components";

const Presenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
  
  margin: 80px 0;
  &>div {
    display: flex;
    flex-direction: column;
  }
`;

function TilesMatrixPresenter({children} : {children: ReactNode}) {
  return (
    <Presenter>{children}</Presenter>
  );
}

export default TilesMatrixPresenter;