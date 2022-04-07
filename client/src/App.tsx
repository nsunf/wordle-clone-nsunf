import styled, { ThemeProvider } from 'styled-components';

import Header from './components/Header';
import Body from './components/Body';

const theme = {
  background_color: '#E7DFE8',
  sub_color: '#5A6672',
  main_color: '#3993DD',
  red: '#FF4B3E',
  yellow: '#FFC547',
  black: '#1B1F22'
}

const AppBlock = styled.div`
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
    <AppBlock>
      <Header/>
      <Body/>
    </AppBlock>
    </ThemeProvider>
  );
}

export default App;
