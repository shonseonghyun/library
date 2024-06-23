import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { AuthUserInfoAtom } from "../../../../../atoms/AuthUserInfo";
import PrivateLink from "../../../../../component/Link/PrivateLink";

const fontSize = "13px";

const Item = styled.li`
    margin-left: 25px;
    display: inline-block;
    p{
        color:${props=>props.theme.textColor};
        font-size: 13px;
        cursor: pointer;
    }
`;

function MenuForUser(){
    const navigate = useNavigate();
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
    const resetAuthUserInfo = useResetRecoilState(AuthUserInfoAtom);
    const location = useLocation();

    const clickedLogout = ()=>{
        alert("로그아웃 진행");
        resetAuthUserInfo();
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userNo");

        //PrivateRoute내 컴포넌트에서 로그아웃 진행 시 메인페이지로 보내기
        if(location.state?.isEnteredInPrivateRoute){
            navigate("/");
        }
    }

    return (
        <>
            <Item>
                <PrivateLink to="/user/myPage" fontSize={fontSize}>
                    {authUserInfo.userId + "님"}
                </PrivateLink>
            </Item>
            <Item>
                <PrivateLink to="myLibrary/rentStatus" fontSize={fontSize}>
                    내 서재
                </PrivateLink>
            </Item>
            <Item>
                <PrivateLink to="/book/reg" fontSize={fontSize}>
                  도서 등록
                </PrivateLink>
            </Item>
            <Item>
                <p onClick={clickedLogout}>로그아웃</p>
            </Item>
        </>
    )
}

export default MenuForUser;