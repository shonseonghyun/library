import { BrowserRouter } from 'react-router-dom';
import Body from './routes/body/Body';
import Footer from './routes/footer/Footer';
import Header from './routes/headers/Header';
import Toggle from './component/Mode/Toggle';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styles/theme';
import GlobalStyle from './styles/GlobaStyle';
import { useRecoilValue } from 'recoil';
import { Mode } from './atoms/Mode';


function App() {
  const  mode = useRecoilValue(Mode);
  return (
    <ThemeProvider theme={mode.isLightMode ?lightTheme : darkTheme}>
      <GlobalStyle />
      <BrowserRouter>
        {/* 헤더 */}
        <Header />  

        {/* 바디 */}
        <Body />  
        
        {/* 푸터 */}
        <Footer/>

        <Toggle />
      </BrowserRouter>
  </ThemeProvider>
  );
}

export default App;
