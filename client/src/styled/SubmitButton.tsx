import styled from "styled-components";
import { lighten, darken } from "polished";

const SubmitButton = styled.button`
  ${ props =>`
  --color: ${props.theme.main_color};
  background: var(--color);
  color: white;

  font-size: 32px;
  width: 240px;
  height: 64px;
  border: none;
  border-radius: 24px;

  cursor: pointer;

  &:hover {
    background: ${lighten(0.025, props.theme.main_color)};
  }
  &:active {
    background: ${darken(0.025, props.theme.main_color)};
  }
  `}
`;

export default SubmitButton;