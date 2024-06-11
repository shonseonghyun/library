import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AuthUserInfoAtom } from "../../../../../../atoms/AuthUserInfo";
import ImgTypeContent from "../../../../../../component/Book/ImgTypeContent";
import { useDelHeartBook } from "../../../../../../hooks/hooks";
import { IHeartInfo } from "./MyBookCase";

interface IHeartItemProps{
    heart: IHeartInfo,
}

const GridItem = styled.div`
    background-color:white;
    margin:10px;
`;

function HeartItem({heart}:IHeartItemProps){
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
    const queryClient= useQueryClient();
    const {mutate:delHeartMutate} = useDelHeartBook(queryClient);

    const clickedDelHeart = ()=>{
        delHeartMutate.mutate({userNo: authUserInfo.userNo, bookNo:heart.bookCode});
    }

    return (
        <GridItem>
            <ImgTypeContent heart={heart} delHeart={clickedDelHeart} />
        </GridItem>
    )
}

export default HeartItem;