import { Route, Routes } from "react-router-dom";
import Main from "./nonprotected/common/Main";
import MyLibrary from "./protected/user/myLibrary/MyLibrary";
import Login from "./nonprotected/user/login/Login";
import Join from "./nonprotected/user/join/Join";
import PublicRoute from "./nonprotected/PublicRoute";
import PrivateRoute from "./protected/PrivateRoute";
import MyBookCase from "./protected/user/myLibrary/heart/MyBookCase";
import RentStatus from "./protected/user/myLibrary/RentStatus/RentStatusComponent";
import RentHistory from "./protected/user/myLibrary/RentHistory/RentHistoryComponent";
import BookDetail from "./nonprotected/book/detail/BookDetail";
import TokenRefresher from "./nonprotected/user/login/TokenRefresher";
import OauthLoginSuccess from "./nonprotected/user/login/OauthLoginSuccess";
import Books from "./nonprotected/book/simple/Books";
import { ReactQueryDevtools } from 'react-query/devtools';


function Body(){
    return (
        <div>
            <TokenRefresher />
            <Routes>
                {/* 비회원 */}
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<Main/> }/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/book/inquiry/:cateogry/:inquiryWord" element={<Books />} />
                    <Route path="/book/:bookNo" element={<BookDetail />} />
                    <Route path="/api/user/login/oauth" element={<OauthLoginSuccess />} />
                </Route>

                {/* 회원 전용 */}
                <Route element={<PrivateRoute />}>
                    <Route path="/myLibrary" element={<MyLibrary /> }>
                        <Route path="rentStatus" element={<RentStatus />}/>
                        <Route path="rentHistory" element={<RentHistory />}/>
                        <Route path="myBookcase" element={<MyBookCase />}/>
                    </ Route>
                </Route>
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />      
        </div>
    )
}

export default Body;