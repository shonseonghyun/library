import styled from "styled-components";
import SubTitle from "../../../../component/header/SubTitle";

const Wrapper = styled.div`
    height: 100vh;
`;

function Main(){
    return (
        <Wrapper>
            <SubTitle title="메인 페이지" />
            
        </Wrapper>
    )
}

export default Main;