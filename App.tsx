import React from 'react';
import { theme } from './src/config/theme'
import { ThemeProvider } from 'styled-components';
import Routes from './src/config/routes';
import ContextProvider from './src/config/context';



function App() {
  return (
    <ThemeProvider theme={theme}>
    <ContextProvider>
        <Routes/>
    </ContextProvider>
    </ThemeProvider>
  );
}

export default App;
