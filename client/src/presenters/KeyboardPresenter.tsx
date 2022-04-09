import { ReactNode } from "react";
import styled from "styled-components";

const Presenter = styled.div`
`;

function KeyboardPresenter({ children }: { children: ReactNode}) {
  return (
    <Presenter>{children}</Presenter>
  );
}

export default KeyboardPresenter