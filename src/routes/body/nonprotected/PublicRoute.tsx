import { useRecoilValue } from "recoil";
import { isLoginSelector } from "../../../atoms/AcessToken";
import { Outlet } from "react-router-dom";

function PublicRoute(){
    const isLogin = useRecoilValue(isLoginSelector);

    return (
        <>
            <Outlet></Outlet>
        </>
    );
}

export default PublicRoute;