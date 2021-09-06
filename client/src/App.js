import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';

import LandingPage from './Pages/LandingPage';

// import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <LandingPage />
    </ChakraProvider>
  );
}

export default App;
