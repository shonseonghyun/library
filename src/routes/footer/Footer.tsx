import styled from "styled-components";

const Wrapper = styled.div`
text-align: center;
padding: 20px;
margin-top: 50px;
`;



function Footer(){
    return (
        <Wrapper>
            <p>Copyright © Sunghyun Corp. All rights reserved.</p>
        </Wrapper>
    )
}

export default Footer;