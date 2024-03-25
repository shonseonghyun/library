import styled from "styled-components";

const Wrapper = styled.div`
    width:100%;
    height:50px;
    background-color: yellow;
`;

function LoanHistoryPast(){
    return (
        <Wrapper>
            <p>
                대출 이력
            </p>
        </Wrapper>
    )
}

export default LoanHistoryPast;