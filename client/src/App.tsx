import { useEffect, useRef, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Header from './components/Header';
import Body from './components/Body';

import axios from 'axios';

const theme = {
  background_color: '#E7DFE8',
  sub_color: '#5A6672',
  main_color: '#3993DD',
  red: '#FF4B3E',
  yellow: '#FFC547',
  black: '#1B1F22'
}

const AppBlock = styled.div`
  box-sizing: border-box;
  height: 100%;
`;

function App() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  // client test
  // useEffect(() => {
  //   axios.get('/').then(() => console.log('axios server'))
  // }, []);

  useEffect(() => {
    let height = headerRef.current?.clientHeight;
    if (height === undefined) return;
    setHeaderHeight(height)
  }, [headerRef]);


  return (
    <ThemeProvider theme={theme}>
    <AppBlock>
      <Header headerRef={headerRef}/>
      <Body headerHeight={headerHeight}/>
    </AppBlock>
    </ThemeProvider>
  );
}

export default App;
