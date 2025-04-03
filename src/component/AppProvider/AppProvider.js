import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { createTheme, ThemeProvider, CssBaseline, useMediaQuery, StyledEngineProvider } from '@mui/material';
import { indigo, red } from '@mui/material/colors';

const Context = createContext();
const { Provider } = Context;

const reducer = (state, action) => {
  switch (action.type) {
    case 'direction':
      return { ...state, direction: state.direction === 'ltr' ? 'rtl' : 'ltr' };
    case 'type':
      return { ...state, type: state.type === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [state, dispatch] = useReducer(reducer, {
    type: prefersDarkMode ? 'dark' : 'light',
    direction: 'ltr'
  });

  const theme = createTheme({
    direction: state.direction,
    palette: {
      mode: state.type, 
      primary: indigo,
      secondary: red,
      error: red
    },
    typography: {
      headline: { fontSize: '1rem' },
      subtitle1: { fontSize: '0.8125rem' },
      button: { fontWeight: 400, textTransform: 'initial' },
      body1: { fontSize: '0.875rem' }
    },
    shape: { borderRadius: 4 }
  });

  useEffect(() => {
    document.body.dir = state.direction;
  }, [state.direction]);

  return (
    <StyledEngineProvider injectFirst> 
      <ThemeProvider theme={theme}>
        <CssBaseline /> 
        <Provider value={[state, dispatch]}>{children}</Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default AppProvider;
export const useAppState = () => useContext(Context);
