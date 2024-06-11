import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { darkTheme, lightTheme } from './styles/theme';
import GlobalStyle from './styles/GlobaStyle';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <CookiesProvider>
        <ThemeProvider theme={darkTheme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </CookiesProvider>
    </RecoilRoot>
  </QueryClientProvider>
);
