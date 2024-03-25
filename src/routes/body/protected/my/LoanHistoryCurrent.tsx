import styled from "styled-components";

const Wrapper = styled.div`
    width:100%;
    height:50px;
    background-color: yellow;
`;

function LoanHistoryCurrent(){
    return (
        <Wrapper>
            <h1>대출현황</h1>
        </Wrapper>
    )
}

export default LoanHistoryCurrent;