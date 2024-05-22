import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginSelector } from "../../../atoms/AuthUserInfo";

function PrivateRoute(){
    console.log("privateRoute 랜더링");
    const isLogin = useRecoilValue(isLoginSelector);
    const currentLocation = useLocation();

    return (
        isLogin
        ? 
        <Outlet /> 
        : 
        <Navigate to={"/"} state={ {redirectedFrom: currentLocation}}/>
    );
}

export default PrivateRoute;