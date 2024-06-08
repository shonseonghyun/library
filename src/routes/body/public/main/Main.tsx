import styled from "styled-components";

const Wrapper = styled.div`
    height: 100vh;
`;

const SubSearchWrapper =styled.div`
    background:linear-gradient(to right, rgba(72, 52, 212,1.0), white); 
`;

const SearchWrapper =styled.div`
    width: 80%;
    font-size: 28px;
    padding: 15px 0px;
    margin:0 auto;
`;


function Main(){
    return (
        <Wrapper>
            <SubSearchWrapper>
                <SearchWrapper>
                    메인 페이지
                </SearchWrapper>
            </SubSearchWrapper>
        </Wrapper>
    )
}

export default Main;