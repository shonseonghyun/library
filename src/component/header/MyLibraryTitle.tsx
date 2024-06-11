import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    font-size  : 30px ;
    font-weight: 800;
    margin-top: 20px;
`;

interface IMyLibraryTitleProps{
    title:string
}

const MyLibraryTitle = ({title}:IMyLibraryTitleProps) => {
    return (
        <Wrapper>
            {title}
        </Wrapper>
    );
};

export default React.memo(MyLibraryTitle);