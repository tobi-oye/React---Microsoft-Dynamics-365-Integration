import { Flex, Spinner, Image, Box } from '@chakra-ui/react';
import { useEffect, useReducer } from 'react';
import { useRouteMatch } from 'react-router-dom';
// import { BrowserRouter as useRouteMatch } from 'react-router-dom';
import { handleInitialQuoteData } from '../../actions';
import { MyContext } from '../../Context';
import reducer from '../../reducers';
import MainForm from './component/MainForm';

import microageLogo from '../../assets/logo.jpeg';

import { acquireToken } from '../../api';
import TokenServiceInstance from '../../services/Token';

const LandingPage = () => {
  const [{ quote, pdfTemplates }, dispatch] = useReducer(reducer, {
    quote: {},
    pdfTemplates: {},
  });
  let id = useRouteMatch('/:id');
  id = id && id.params.id;
  useEffect(() => {
    acquireToken().then(resp => {
      const token = resp.data.accessToken && resp.data.accessToken;
      TokenServiceInstance.setToken(token);
      handleInitialQuoteData(dispatch, id);
    });
  }, [id]);

  return (
    <MyContext.Provider value={{ quote, dispatch, pdfTemplates }}>
      {Object.keys(quote).length && id ? (
        <MainForm />
      ) : (
        <Flex
          h="100vh"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box boxSize="200px">
            <Image src={microageLogo} alt="microage logo" />
          </Box>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="red.500"
            size="xl"
          />
        </Flex>
      )}
    </MyContext.Provider>
  );
};

export default LandingPage;
