import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginSelector } from "../../../atoms/AuthUserInfo";
import LoginModal from "../../../component/login/LoginModal";

function PrivateRoute(){
    console.log("privateRoute 랜더링");
    const isLogin = useRecoilValue(isLoginSelector);
    const [showing,setShowing] = useState(true);

    return (
        isLogin
        ? 
        <Outlet />
        : 
        <LoginModal setShowing={setShowing} isEnteredInPrivateRoute={true} />
    );
}

export default PrivateRoute;