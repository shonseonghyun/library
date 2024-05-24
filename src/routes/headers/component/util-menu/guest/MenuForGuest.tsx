import { AnimatePresence, motion } from "framer-motion";
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

const OverlayForLogin= styled(motion.div)` 
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.5);
    cursor: pointer;
`;

const LoginModalWrapper = styled(motion.div)`
    position: fixed;
    z-index: 99;
    top: 40%;
    left: 50%;
    width : 90% ;
    height : 20vh ;

    max-width: 500px;
    min-width: 300px;
    min-height: 200px;
    transform: translate(-50%, -50%);
    background-color: white;
`;

const overlayVariants = {
    normal:{
        opacity:0
    },
    animate:{
        opacity:1,
        transition:{
            duration:0.5
        }
    }
}

const loginModalVariants = {
    normal:{
        opacity:0
    },
    animate:{
        opacity:1,
        transition:{
            duration:0.5
        }
    }
}

function MenuForGuest(){
    const [showing,setShowing] = useState(false);

    const clickedLogin = ()=>{
        setShowing(true);
    }

    return (
        <>
            <LoginModal showing={showing} setShowing={setShowing}/>

            <Item>
                <p onClick={clickedLogin}>
                    로그인
                </p>
            </Item>
            <Item>
                <NavbarLink to="/join">회원가입</NavbarLink>
            </Item>
            <Item>
                <NavbarLink to="myLibrary/rentStatus">내서재</NavbarLink>
            </Item>
        </>
    )
}

export default MenuForGuest;