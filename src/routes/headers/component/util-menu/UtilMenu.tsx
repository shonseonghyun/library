import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { isLoginSelector } from '../../../../atoms/AuthUserInfo';
import MenuForGuest from './guest/MenuForGuest';
import MenuForUser from './user/MenuForUser';

const Wrapper = styled.div`
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #d2d2d2;
    
    display: flex;
    justify-content: end;
    align-items: center;
`;

const Items = styled.ul`
    margin-right: 10% ;
`;

const UtilMenu = () => {
    const isLogin = useRecoilValue(isLoginSelector);

    return (
        <Wrapper>
            <Items>
                {
                    isLogin 
                    ? 
                        <MenuForUser />
                    :
                        <MenuForGuest />
                }
            </Items>

        </Wrapper>
        
    );
};

export default UtilMenu;