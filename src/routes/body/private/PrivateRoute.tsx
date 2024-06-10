import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginSelector } from "../../../atoms/AuthUserInfo";
import LoginModal from "../../../component/login/LoginModal";

function PrivateRoute(){
    const isLogin = useRecoilValue(isLoginSelector);
    const [showing,setShowing] = useState(true);

    return (
        isLogin
        ? 
        <Outlet />
        : 
        <LoginModal setShowing={setShowing} showing={showing} isEnteredInPrivateRoute={true} />
    );
}

export default PrivateRoute;