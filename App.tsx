import React from 'react';

import Routes from './src/config/routes';
import ContextProvider from './src/config/context';
import { ThemeProvider, createTheme } from '@rneui/themed';

const myTheme = createTheme({
  lightColors: {
    primary: '#D68D85',
  },
  darkColors: {
    primary: '#121212',
  },
  
  mode: 'dark',
});

function App() {
  return (
    <ContextProvider>
      <ThemeProvider theme={myTheme}>
        <Routes/>
      </ThemeProvider>
    </ContextProvider>
  );
}

export default App;
