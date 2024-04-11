import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { AuthUserInfoAtom } from "../../../../../../atoms/AuthUserInfo";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import HeartItem from "./HeartItem";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { getHeartBooksFetch } from "../../../../../../api";

const GridWrapper = styled.div`
display: grid;
grid-template-rows: repeat(2, 200px);
grid-template-columns: repeat(5, 200px);
align-content: center;
justify-content: center;

`;

interface IHeartList{
    heartList: IHeartInfo[]
}

export interface IHeartInfo{
    heartNo:number,
    regDt:string,
    regTm:string,
    bookCode:number,
    bookName:string,
    bookAuthor:string,
    bookPublisher:string,
    bookImage:string
}


function MyBookCase(){
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
    const resetAuthUserInfo = useResetRecoilState(AuthUserInfoAtom);
    const navigate = useNavigate();
    const queryClient= useQueryClient();
    const {
        isLoading,
        fetchNextPage, //다음페이지를 불러옵니다.
        hasNextPage, //가져올 다음페이지가 있는지 여부를 나타냅니다(boolean). getNextPageParam
        data
    } = useInfiniteQuery(
        ["getAllHearts"],
        ({pageParam})=>getHeartBooksFetch(pageParam ,authUserInfo.userNo,authUserInfo.accessToken,5),
        {
            onSuccess:(data)=>{},
            onError:(error)=>{console.log("error"); console.log(error)},
            getNextPageParam: (lastPage) => {
                return (lastPage.data.data.heartList.length==0 || lastPage.isLast) ? undefined : lastPage.data.data.heartList[4].heartNo; //해당값은 pageParam파라미터로 사용된다.
              },
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
        }
    )


    //언마운트시 모두 제거
    useEffect(()=>{
        console.log("mybookCase 들어옴");
        return()=>{
            queryClient.removeQueries('getAllHearts');
        }
    },[])



    return (
        <>
            <h1>내책장</h1>
                 {
                    isLoading
                    ? <div>Loading..</div>
                    :
                        // !hasNextPage 
                        // ? <div></div>
                        // : 
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