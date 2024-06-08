import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginSelector } from "../../../atoms/AuthUserInfo";
import LoginModal from "../../../component/login/LoginModal";
import { useEffect, useState } from "react";

function PrivateRoute(){
    console.log("privateRoute 랜더링");
    const isLogin = useRecoilValue(isLoginSelector);
    const currentLocation = useLocation();
    console.log(currentLocation);
    const [showing,setShowing] = useState(true);
    console.log(showing);   

    useEffect(()=>{
        console.log("1회 랜더링");
        console.log(showing);
    },[]);

    useEffect(()=>{
        console.log(showing);
    },[showing]);

    return (
        isLogin
        ? 
        <Outlet />
        : 
        <>
        {/* <Navigate to={"/"} state={ {redirectedFrom: currentLocation}}/> */}
        <LoginModal setShowing={setShowing} showing={showing} />
        </>
    );
}

export default PrivateRoute;