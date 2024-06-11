import { Outlet } from "react-router-dom";

function PublicRoute(){
    console.log("publicRoute 랜더링");

    return (
        <Outlet />
    );
}

export default PublicRoute;