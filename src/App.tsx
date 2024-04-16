import Header from './routes/headers/Header';
import Footer from './routes/footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './routes/body/Body';
import styled from 'styled-components';

const AppWrapper= styled.div`
    background-color : #808080
`

function App() {
  return (
    <AppWrapper className="App">
      <BrowserRouter>
        {/* 헤더 */}
        <Header />

        {/* 바디 */}
        <Body />

        {/* 푸터 */}
        <Footer/>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
