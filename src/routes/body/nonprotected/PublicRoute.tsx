import { Outlet } from "react-router-dom";

function PublicRoute(){
    return (
        <>
            <Outlet></Outlet>
        </>
    );
}

export default PublicRoute;