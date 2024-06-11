import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AuthUserInfoAtom } from "../../../../../../atoms/AuthUserInfo";
import Loading from "../../../../../../component/loading/Loading";
import { useGetHeartBooks } from "../../../../../../hooks/hooks";
import HeartItem from "./HeartItem";

const GridWrapper = styled.div`
display: grid;
grid-template-rows: repeat(2, 200px);
grid-template-columns: repeat(5, 200px);
align-content: center;
justify-content: center;

`;

export interface IHeartInfo{
    heartNo:number,
    regDt:string,
    regTm:string,
    bookCode:number,
    bookName:string,
    bookAuthor:string,
    bookPublisher:string,
    bookImage:IBookImageInfo
}

interface IBookImageInfo{
    originalFileName:string,
    newFileName:string
    fileSize:number,
    filePath:string,
}

function MyBookCase(){
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);

    const {
            isLoading,
            fetchNextPage, //다음페이지를 불러옵니다.
            hasNextPage, //가져올 다음페이지가 있는지 여부를 나타냅니다(boolean). getNextPageParam
            data
        } = useGetHeartBooks({userNo:authUserInfo.userNo,pageSize:5});
    
    return (
        <>
            <div style={{fontSize:"30px",fontWeight:"900"}}>
                내 책장
            </div>
                 {
                    isLoading
                    ? <Loading />
                    :
                        data?.pages.map((page,idx)=>{
                            return (
                                <GridWrapper key={idx}>
                                    {page.data.data.heartList.map((heart: IHeartInfo)=>{
                                        return (
                                            <HeartItem key={heart.bookCode} heart={heart} />
                                        )
                                    })}
                                </GridWrapper>
                            )
                        })
                 }

                 <button onClick={()=>fetchNextPage()} disabled={!hasNextPage} >btn</button>
        </>
    )
}

export default MyBookCase;