import { useEffect } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { AuthUserInfoAtom } from "../../../../../atoms/AuthUserInfo";
import { useCookies } from "react-cookie";

function OauthLoginSuccess(){
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [authUserInfo,setAuthUserInfo] = useRecoilState(AuthUserInfoAtom);
    const [cookie,,removeCookie] = useCookies(["refreshToken", "userNo", "userId"]);
    
    
    useEffect(()=>{
        const accessToken = searchParams.get("accessToken");
        const refreshToken = cookie.refreshToken;
        const userNo = cookie.userNo;
        const userId = cookie.userId;

        setAuthUserInfo({
            accessToken: accessToken!,
            refreshToken:refreshToken!,
            userId:userId!,
            userNo: Number.parseInt(userNo!)  
        });

        localStorage.setItem("accessToken",accessToken!);
        localStorage.setItem("refreshToken",refreshToken!);
        localStorage.setItem("userId",userId!);
        localStorage.setItem("userNo",userNo!);

        navigate("/");

        return () =>{ 
            console.log("OauthLoginSuccess 언마운트");
            if(cookie){
                console.log("cookie!!");
                // removeCookie("userNo");
                // removeCookie("userId");
                // removeCookie("refreshToken");
                removeCookie("userNo", { path: '/' });
                removeCookie("userId", { path: '/' });
                removeCookie("refreshToken", { path: '/' });
            }
        }
    },[]);

    return (
        <>
        </>
    )
}

export default OauthLoginSuccess;