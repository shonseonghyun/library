import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from "react-router-dom";
import NotFound from './NotFound';
import PrivateRoute from "./private/PrivateRoute";
import MyLibrary from "./private/user/myLibrary/MyLibrary";
import RentHistory from "./private/user/myLibrary/RentHistory/RentHistory";
import RentStatus from "./private/user/myLibrary/RentStatus/RentStatus";
import MyBookCase from "./private/user/myLibrary/heart/MyBookCase";
import MyReviews from './private/user/myLibrary/review/MyReviews';
import MyPage from './private/user/myPage/MyPage';
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
                    <Route path="/book/:bookNo" element={<Book />} />
                    <Route path="/book/inquiry/:category/:inquiryWord" element={<Books />} />
                    <Route path="/api/user/login/oauth" element={<OauthLoginSuccess />} />
                </Route>

                {/* 회원 전용 */}
                <Route element={<PrivateRoute />}>
                    <Route path="/myLibrary" element={<MyLibrary /> }>
                        <Route path="rentStatus" element={<RentStatus />}/>
                        <Route path="rentHistory" element={<RentHistory />}/>
                        <Route path="myBookcase" element={<MyBookCase />}/>
                        <Route path="review" element={<MyReviews />}/>
                    </ Route>
                    <Route path="/book/reg" element={<RegBook /> } />
                    <Route path="/user/myPage" element={<MyPage /> } />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> 
        </div>
    )
}

export default Body;