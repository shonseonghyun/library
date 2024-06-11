import { Link, useLocation, useNavigate } from "react-router-dom";
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
    const location = useLocation();
    console.log(location); 

    const clickedLogout = ()=>{
        alert("로그아웃 진행");
        // resetAuthUserInfo();

        //PrivateRoute내 컴포넌트에서 로그아웃 진행 시 메인페이지로 보내기
        if(location.state?.isEnteredInPrivateRoute){
            alert("privateRoute에서 로그아웃 진행");
            navigate("/");
        }
    }

    return (
        <>
            <Item>
                <NavbarLink to="/user/myPage" state={{isEnteredInPrivateRoute:true}}>
                    {authUserInfo.userId + "님"}
                </NavbarLink>
            </Item>
            <Item>
                <NavbarLink to="myLibrary/rentStatus" state={{isEnteredInPrivateRoute:true}}>내 서재</NavbarLink>
            </Item>
            <Item>
                <NavbarLink to="/book/reg" state={{isEnteredInPrivateRoute:true}}>도서 등록</NavbarLink>
            </Item>
            <Item>
                <p onClick={clickedLogout}>로그아웃</p>
            </Item>
        </>
    )
}

export default MenuForUser;