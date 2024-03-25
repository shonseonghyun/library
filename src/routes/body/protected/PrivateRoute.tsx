import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginSelector } from "../../../atoms/AcessToken";
import { useEffect } from "react";

function PrivateRoute(){
    const isLogin = useRecoilValue(isLoginSelector);
    const currentLocation = useLocation();

    return isLogin? <Outlet /> : <Navigate to={"/login"} state={ {redirectedFrom: currentLocation}}/>;
}

export default PrivateRoute;