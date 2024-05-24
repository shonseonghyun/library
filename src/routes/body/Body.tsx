import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./private/PrivateRoute";
import MyLibrary from "./private/user/myLibrary/MyLibrary";
import RentHistory from "./private/user/myLibrary/RentHistory/RentHistoryComponent";
import RentStatus from "./private/user/myLibrary/RentStatus/RentStatusComponent";
import MyBookCase from "./private/user/myLibrary/heart/MyBookCase";
import RegBook from "./private/user/regBook/RegBook";
import PublicRoute from "./public/PublicRoute";
import Book from './public/book/detail/Book';
import Books from "./public/book/simple/Books";
import Main from "./public/main/Main";
import Join from "./public/user/join/Join";
import OauthLoginSuccess from "./public/user/login/OauthLoginSuccess";
import TokenRefresher from "./public/user/login/TokenRefresher";


function Body(){
    return (
        <div>
            <TokenRefresher />
            <Routes>
                {/* 비회원 */}
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<Main/> }/>
                    <Route path="/join" element={<Join />} />
                    <Route path="/book/inquiry/:cateogry/:inquiryWord" element={<Books />} />
                    <Route path="/book/:bookNo" element={<Book />} />
                    <Route path="/api/user/login/oauth" element={<OauthLoginSuccess />} />
                </Route>

                {/* 회원 전용 */}
                <Route element={<PrivateRoute />}>
                    <Route path="/myLibrary" element={<MyLibrary /> }>
                        <Route path="rentStatus" element={<RentStatus />}/>
                        <Route path="rentHistory" element={<RentHistory />}/>
                        <Route path="myBookcase" element={<MyBookCase />}/>
                    </ Route>
                    <Route path="/book/reg" element={<RegBook /> } />
                </Route>
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />      
        </div>
    )
}

export default Body;