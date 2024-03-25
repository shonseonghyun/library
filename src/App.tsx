import Header from './routes/Header/Header';
import Footer from './routes/footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './routes/body/Body';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* 헤더 */}
        <Header />

        {/* 바디 */}
        <Body />

        {/* 푸터 */}
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
