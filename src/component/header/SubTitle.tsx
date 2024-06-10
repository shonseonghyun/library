import React, { useEffect } from "react";
import styled from "styled-components";

const SubSearchWrapper =styled.div`
    background:linear-gradient(to right, rgba(72, 52, 212,1.0), white); 
`;

const SearchWrapper =styled.div`
    width: 80%;
    font-size: 28px;
    padding: 15px 0px;
    margin:0 auto;
`;

interface ISubTitleProps{
    title:string
}

const SubTitle = ({title}:ISubTitleProps) => {
    return (
        <SubSearchWrapper>
            <SearchWrapper>
                {title}
            </SearchWrapper>
        </SubSearchWrapper>
    );
};

export default React.memo(SubTitle);
// export default SubTitle;