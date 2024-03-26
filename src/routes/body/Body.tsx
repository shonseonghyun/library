import { Route, Routes } from "react-router-dom";
import Main from "./nonprotected/Main";
import MyLibrary from "./protected/my/MyLibrary";
import Login from "./nonprotected/Login";
import Join from "./nonprotected/Join";
import PublicRoute from "./nonprotected/PublicRoute";
import PrivateRoute from "./protected/PrivateRoute";
import MyBookCase from "./protected/my/heart/MyBookCase";
import RentStatus from "./protected/my/currentHistory/RentStatusComponent";
import RentHistory from "./protected/my/currentHistory/RentHistoryComponent";

function Body(){
    return (
        <div>
            <Routes>
                {/* 비회원 */}
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<Main/> }/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/join" element={<Join />} />
                </Route>

                {/* 회원 전용 */}
                <Route element={<PrivateRoute />}>
                    <Route path="/myLibrary" element={<MyLibrary /> }>
                        <Route path="LoanHistoryCurrent" element={<RentStatus />}/>
                        <Route path="LoanHistoryPast" element={<RentHistory />}/>
                        <Route path="myBookcase" element={<MyBookCase />}/>
                    </ Route>
                </Route>
            </Routes>
        </div>
    )
}

export default Body;