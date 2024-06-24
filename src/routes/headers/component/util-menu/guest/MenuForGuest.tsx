import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginModal from "../../../../../component/login/LoginModal";

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

function MenuForGuest(){
    console.log("menuForguest 랜더링");
    const [showing,setShowing] = useState(false);
    const [loginAfterUrl,setLoginAfterUrl] = useState("");

    const clickedLogin = ()=>{
        setShowing(true);
        setLoginAfterUrl("empty");
    }

    const clickedMyLibrary = ()=>{
        setShowing(true);
        setLoginAfterUrl("/myLibrary/rentStatus");
    }

    return (
        <>
            {
                showing 
                ?
                <LoginModal setShowing={setShowing} loginAfterUrl={loginAfterUrl}/>
                : 
                null
            }

            <Item>
                <p onClick={clickedLogin}>
                    로그인
                </p>
            </Item>
            <Item>
                <NavbarLink to="/join">회원가입</NavbarLink>
            </Item>
            <Item>
                <p onClick={clickedMyLibrary}>내서재</p>
            </Item>
        </>
    )
}

export default MenuForGuest;