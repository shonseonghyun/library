import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Mode } from '../../atoms/Mode';

const Wrapper = styled.div`
    position: fixed;
    bottom: 50px;
    right: 20px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    background-color: ${props=>props.theme.inputColor};
    text-align: center;
    /* border: 2px solid ${props=>props.theme.btnColor}; */
`;


const Toggle = () => {
    const [isLightMode,setIsLightMode] = useRecoilState(Mode);
    return (
        <Wrapper onClick={()=>setIsLightMode({isLightMode:!isLightMode.isLightMode})}>
            {
                isLightMode.isLightMode 
                ? 
                "다크 모드" 
                :
                "라이트 모드"
            }
        </Wrapper>
        // null
    );
};

export default Toggle;
