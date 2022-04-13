import styled from "styled-components";
import { lighten, darken } from "polished";

const SubmitButton = styled.button`
  flex-shrink: 0;
  ${ props =>`
  --color: ${props.theme.main_color};
  background: var(--color);
  color: white;

  font-size: 32px;
  width: 240px;
  height: 80px;
  border: 2px solid black;
  border-radius: 20px;

  cursor: pointer;

  &:hover {
    background: ${lighten(0.025, props.theme.main_color)};
  }
  &:active {
    background: ${darken(0.025, props.theme.main_color)};
  }

  @media (max-width: 1920px) {
    font-size: 28px;
    height: 64px;
    width: 184px;
  }
  
  @media (max-width: 1200px) {
    font-size: 24px;
    height: 48px;
    width: 160px;
    border-radius: 12px;
  }

  `}
`;

export default SubmitButton;