import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { AuthUserInfoAtom } from "../../../../../atoms/AuthUserInfo";

const NavbarLink = styled(Link)`
`;

const Item = styled.li`
    margin-left: 25px;
    display: inline-block;
    ${NavbarLink},p{
        font-size: 15px;
        cursor: pointer;
    }
`;

function MenuForUser(){
    const navigate = useNavigate();
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
    const resetAuthUserInfo = useResetRecoilState(AuthUserInfoAtom);

    const clickedLogout = ()=>{
        alert("로그아웃 진행");
        resetAuthUserInfo();
    }

    return (
        <>
            <Item>
                <p>{authUserInfo.userId + "님"}</p>
            </Item>
            <Item>
                <p onClick={clickedLogout}>로그아웃</p>
                {/* <NavbarLink to="logout">로그아웃</NavbarLink> */}
            </Item>
            <Item>
                <NavbarLink to="myLibrary/rentStatus">내 서재</NavbarLink>
            </Item>
            <Item>
                <NavbarLink to="/book/reg">도서 등록</NavbarLink>
            </Item>
        </>
    )
}

export default MenuForUser;