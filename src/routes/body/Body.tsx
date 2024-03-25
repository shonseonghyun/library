import { Route, Routes } from "react-router-dom";
import Main from "./nonprotected/Main";
import MyLibrary from "./protected/my/MyLibrary";
import LoanHistoryCurrent from "./protected/my/LoanHistoryCurrent";
import LoanHistoryPast from "./protected/my/LoanHistoryPast";
import Login from "./nonprotected/Login";
import Join from "./nonprotected/Join";
import PublicRoute from "./nonprotected/PublicRoute";
import PrivateRoute from "./protected/PrivateRoute";

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
                        <Route path="LoanHistoryCurrent" element={<LoanHistoryCurrent />}/>
                        <Route path="LoanHistoryPast" element={<LoanHistoryPast />}/>
                    </ Route>
                </Route>
            </Routes>
        </div>
    )
}

export default Body;