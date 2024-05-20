import { BrowserRouter } from 'react-router-dom';
import Body from './routes/body/Body';
import Footer from './routes/footer/Footer';
import Header from './routes/headers/Header';


function App() {
  return (
  <BrowserRouter>
    {/* 헤더 */}
    <Header />  

    {/* 바디 */}
    <Body />  
    
    {/* 푸터 */}
    <Footer/>
  </BrowserRouter>
  );
}

export default App;
