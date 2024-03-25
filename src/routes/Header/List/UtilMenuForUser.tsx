import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { accessTokenAtom } from "../../../atoms/AcessToken";

const LogoutBtn = styled.button`
    all:unset;
    cursor:pointer;
`;



function UtilMenuForUser(){
    const navigate = useNavigate();
    const [accessToken,setAccessToken] = useRecoilState(accessTokenAtom);

    const LogoutOnClick = ()=>{
        alert("로그아웃 진행");
        setAccessToken("");
        navigate("/");
    }

    return (
        <div>
            <p>{ accessToken + "님"}</p>
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