import styled from "styled-components";
import { FiSettings } from "react-icons/fi";
import { MdLeaderboard, MdOutlineLeaderboard } from "react-icons/md";
import { Link } from "react-router-dom";

const HeaderBlock = styled.div`
  background: ${props => props.theme.sub_color};

  height: 80px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: white;
  padding: 8px 0;
  margin: 0 16px;
`;

const Buttons = styled.div`
  margin: 0 16px;
`;

const iconStyles = `
  font-size: 24px;
  margin: 16px;
  
  cursor: pointer;
`;
const LeaderBoard = styled(MdLeaderboard)<{$isSelected: boolean}>`
  color: ${props => props.$isSelected ? props.theme.black : 'white'};
  ${iconStyles}
`;

const Setting = styled(FiSettings)<{$isSelected: boolean}>`
  color: ${props => props.$isSelected ? props.theme.black : 'white'};
  ${iconStyles}
`;

function Header() {
  return (
    <HeaderBlock>
      <Logo>WORDLE</Logo>
      <Buttons>
      <Link to="/leaderBoard"><LeaderBoard $isSelected={false}/></Link>
      <Link to ="/setting"><Setting $isSelected={false}/></Link>
      </Buttons>
    </HeaderBlock>
  )
}

export default Header;