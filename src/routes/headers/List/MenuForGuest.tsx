import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display:line-box;
`;

function MenuForGuest(){
    return (
        <Wrapper>
            <ul>
                <li>
                    <Link to="login">로그인</Link>
                </li>
                <li>
                    <Link to="join">회원가입</Link>
                </li>
            </ul>
        </Wrapper>
    )
}

export default MenuForGuest;