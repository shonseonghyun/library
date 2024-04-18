import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { AuthUserInfoAtom } from "../../../atoms/AuthUserInfo";

const LogoutBtn = styled.button`
    all:unset;
    cursor:pointer;
`;



function MenuForUser(){
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
            <p>{authUserInfo.userId + "님"}</p>
            <ul>
                <li>
                    <LogoutBtn onClick={LogoutOnClick}>로그아웃</LogoutBtn>
                </li>
                <li>
                    <Link to="myLibrary/rentStatus">내 서재</Link>
                </li>
                <li>
                    <Link to="/book">도서 등록</Link>
                </li>
            </ul>
        </div>
    )
}

export default MenuForUser;