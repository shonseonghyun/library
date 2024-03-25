import styled from "styled-components";

const Wrapper = styled.div`
    background-color:blue;
    width:100%;
    height:100px;
`;



function Footer(){
    return (
        <Wrapper>
            <p>Footer</p>
        </Wrapper>
    )
}

export default Footer;