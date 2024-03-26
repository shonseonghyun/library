import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { AuthUserInfoAtom } from "../../../atoms/AuthUserInfo";

const LogoutBtn = styled.button`
    all:unset;
    cursor:pointer;
`;



function UtilMenuForUser(){
    const navigate = useNavigate();
    const [authUserInfo,setAuthUserInfo] = useRecoilState(AuthUserInfoAtom);
    const resetAuthUserInfo = useResetRecoilState(AuthUserInfoAtom);

    const LogoutOnClick = ()=>{
        alert("로그아웃 진행");
        resetAuthUserInfo();
        navigate("/");
    }

    return (
        <div>
            <p>{ authUserInfo.userId + "님"}</p>
            <ul>
                <li>
                    <LogoutBtn onClick={LogoutOnClick}>로그아웃</LogoutBtn>
                </li>
                <li>
                    <Link to="myLibrary">내 서재</Link>
                </li>
            </ul>
        </div>
    )
}

export default UtilMenuForUser;