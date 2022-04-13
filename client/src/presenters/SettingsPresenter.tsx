import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';


const Presenter = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Wrap = styled.div`
  width: 600px;
  height: 450px;
  border: 3px solid black;
  border-radius: 16px;
  margin: 0px auto;

  position: absolute;
  top: 50%;
  left: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: 40px;
`;

const NsunfBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Tile = styled.div<{idx: number, char: string}>`
  --i: ${props => props.idx};
  font-size: 24px;
  font-weight: bold;

  width: 56px;
  height: 56px;

  border: 2px solid black;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: 250ms;

  animation: tileAnime 15s calc(var(--i) * 1500ms) infinite;


  ${props => {
    let {main_color, sub_color, yellow} = props.theme;
    let char = props.char;
    return css`
      &::after {
      content: "${char}";
      }

      @keyframes tileAnime {
        0% {
          transform: translateY(0);
        }
        3% {
          transform: translateY(-10px);
          background: ${main_color};
          color: white;
        }
        7% {
          transform: translateY(-10px);
          background: ${main_color};
          color: white;
        }
        10% {
          transform: translateY(0);
          background: ${yellow};
          color: white;
        }
        50% {
          transform: translateY(0);
          background: ${yellow};
          color: white;
        }
        53% {
          transform: translateY(-10px);
          background: ${sub_color};
          color: white;
        }
        57% {
          transform: translateY(-10px);
          background: ${sub_color};
          color: white;
        }
        60% {
          transform: translateY(0px);
          background: transparent;
          color: black;
        }
        100% {
          transform: translateY(0);
        }
      }
    `; 
  }}
`;

const ResetButton = styled.button`
  background: ${props => props.theme.red};
  color: white;

  border: 1px solid black;
  border-radius: 8px;

  font-size: 24px;
  font-weight: bold;

  padding: 16px 32px;

  cursor: pointer;

  &:hover {
    background: ${props => lighten(0.05, props.theme.red)};
  }
  &:active {
    background: ${props => darken(0.05, props.theme.red)};
  }
`;

function SettingsPresenter({ onClickButton }: { onClickButton: () => void }) {
  return (
    <Presenter>
      <Wrap>
        <Title>Wordle Clone App</Title>
        <NsunfBlock>
        {['n', 's', 'u', 'n', 'f'].map((char, i) => 
          <Tile key={`nsunf_${char}_${i}`} idx={i} char={char}/>
        )}
        </NsunfBlock>
        <ResetButton onClick={onClickButton}>Reset Leaderboard</ResetButton>
      </Wrap>
    </Presenter>
  );
}

export default SettingsPresenter;