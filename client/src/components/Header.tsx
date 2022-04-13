import React from "react";
import styled from "styled-components";
import { FiSettings } from "react-icons/fi";
import { MdLeaderboard } from "react-icons/md";
import { Link } from "react-router-dom";

const HeaderBlock = styled.div`
  background: ${props => props.theme.sub_color};

  height: 80px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    height: 64px;
  }

  @media (max-width: 428px) {
    height: 44px;
  }
`;

const Logo = styled.h1`
  color: white;
  padding: 8px 0;
  margin: 0 16px;
  @media (max-width: 428px) {
    font-size: 20px;
  }
`;

const Buttons = styled.div`
  margin: 0 16px;
`;

const iconStyles = `
  font-size: 24px;
  margin: 16px;
  
  cursor: pointer;
  @media (max-width: 428px) {
    font-size: 20px;
    margin: 10px;
  }
`;
const LeaderBoard = styled(MdLeaderboard)<{$isSelected: boolean}>`
  color: ${props => props.$isSelected ? props.theme.black : 'white'};
  ${iconStyles}
`;

const Setting = styled(FiSettings)<{$isSelected: boolean}>`
  color: ${props => props.$isSelected ? props.theme.black : 'white'};
  ${iconStyles}
`;

function Header({ headerRef }: { headerRef: React.RefObject<HTMLDivElement> }) {
  return (
    <HeaderBlock ref={headerRef}>
      <Link to="/"><Logo>WORDLE</Logo></Link>
      <Buttons>
      <Link to="/leaderBoard"><LeaderBoard $isSelected={false}/></Link>
      <Link to ="/setting"><Setting $isSelected={false}/></Link>
      </Buttons>
    </HeaderBlock>
  )
}

export default Header;