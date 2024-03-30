import styled from "styled-components";

const Wrapper = styled.div`
    text-align:left;
`;

function RentRuleExplainComponent(){
    return (
        <Wrapper>
            <p>* 대출정지 : 반납기일을 초과하여 반납하였을 경우 연체반납일로부터 7일 간 대출 정지</p>
            <p>* 도서변상 : 대출도서의 분실 또는 훼손시에는 동일도서로 변상</p>
        </Wrapper>
    )
}

export default RentRuleExplainComponent;