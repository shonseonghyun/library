import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 10px;
    margin-bottom: 30px;
    width: 100%;
    font-size: 15px;  
`;

const HideWrapper = styled.div<{showing:boolean}>`
    display: ${props=>props.showing ? "block" : "none"};
    p{
        font-size: 15px;
    }
`;

const Button =styled.button`
  background-color  : transparent;
`;

interface IContentProps{
    content:string    
}

const Content = ({content}:IContentProps) => {
    const [showing,setShowing] = useState(false);

    const clickedBtn = ()=>{
        setShowing(!showing);
    }

    return (
        <Wrapper style={{width:"100%"}}>
            <div style={{borderBottom:"1px solid black",display:"flex",justifyContent:"space-between"}}>
                <div style={{fontSize:"20px"}}>
                    책소개
                </div>
                <div>
                    <Button onClick={clickedBtn}>
                        {
                            showing ? "접기" : "열기"
                        }
                    </Button>
                </div>
            </div>
            <HideWrapper showing={showing}>
                <p>
                    {content}
                </p> 
            </HideWrapper>
        </Wrapper>
    );
};

export default Content;