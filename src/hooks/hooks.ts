import { QueryClient, useInfiniteQuery, useMutation, useQuery } from "react-query";
import { delBook, delHeartBook, delReviewByReviewNo, extendBook, getBookInfoByBookNoFetch, getHeartBooks, getRentStatus, getReviewsHistory, getUserPage, inquiryBooks, modifyReviewByReviewNo, modifyUser, postReviewOfBook, regBook, regHeartBook, rentBook, returnBook } from "../api/api";
import { UseFormReset } from "react-hook-form";
import { useNavigate } from "react-router-dom";


export interface IUserModifyProps{
    userPwd:string,
    tel:string,
    gender:string
}

interface IGetApiProps{
    userNo:number,
    onSuccess(data:any):void
}

export const useGetMyPage = ({userNo,onSuccess}:IGetApiProps)=>{
    const {isLoading} = useQuery(
        ["myPage",`mypage-${userNo}`],
        ()=>getUserPage(userNo),
        {
            onSuccess(data) {
                onSuccess(data);
            },
        }
    ) 
    return {isLoading};
}

export const useModifyUser = (userNo:number) =>{
    const mutate = useMutation((data:IUserModifyProps)=>modifyUser(userNo,data),
        {
            onSuccess(data){
                if(data.code === "S00"){
                    alert("사용자 수정 완료하였습니다.");
                }else{
                    alert(data.msg);

                }
            }
        })
    ;
    return {mutate};
}

export const useGetBook= (bookNo:number,onSuccess:any) =>{
    const {data,isLoading}= useQuery(
        "getBook",
        ()=>getBookInfoByBookNoFetch(bookNo)
        ,{
            onSuccess(data) {
                onSuccess(data);
            },
            refetchOnWindowFocus: false
    });
    return {data,isLoading};
}

interface IUseInquriyBooksProps{
    category:string,
    inquiryWord:string,
    currentPage:number,
    sizePerPage:number,
    totalCount:number,
    onSuccess(data:any) : void
}

export const useInquiryBooks= ({category,inquiryWord,currentPage,sizePerPage,totalCount,onSuccess}:IUseInquriyBooksProps) =>{
    console.log("hook실행");
    const {data,isLoading}= useQuery(
        ["inquiryBooksFetch",`${category}/${inquiryWord}?page=${currentPage}&size=${sizePerPage}`], //쿼리키 , 쿼리키로 구분해서 data fetching
        ()=>inquiryBooks(category,inquiryWord,currentPage,sizePerPage,totalCount),
        {
            onSuccess(data) {
                onSuccess(data);
                // console.log("성공");
                // setBooks(data.data.bookList);
                // setTotalCount(data.data.totalCount);
            },
            // cacheTime: 10000, //default 5분
            // staleTime: 2000, //default 0초
            // refetchOnMount:false, 
            // refetchOnWindowFocus: false,
            // enabled:false
            // refetchInterval:2000,
            // enabled:false,
            // select : data=>{
            //     console.log("select")
            //     const books = data.data;
            //     return data.data;
            //     // return data;
            // }
        }
    );

    return {isLoading};
}

export interface IHeartBookMutateProps{
    bookNo:number,
    userNo:number
}

export interface IHeartBookGetProps{
    userNo:number,
    pageSize:number
}

export const useGetHeartBooks=({userNo,pageSize}:IHeartBookGetProps)=>{
    const {
        isLoading,
        fetchNextPage, //다음페이지를 불러옵니다.
        hasNextPage, //가져올 다음페이지가 있는지 여부를 나타냅니다(boolean). getNextPageParam
        data
    } = useInfiniteQuery(
        ["getAllHearts"],
        ({pageParam})=>getHeartBooks(pageParam ,userNo,pageSize),
        {
            onError:(error)=>{console.log("error"); console.log(error)},
            getNextPageParam: (lastPage) => {
                return (lastPage.data.data.heartList.length==0 || lastPage.isLast) ? undefined : lastPage.data.data.heartList[4].heartNo; //해당값은 pageParam파라미터로 사용된다.
              },
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
        }
    );
    return {isLoading, fetchNextPage, hasNextPage, data};
}

export const useRegHeartBook= ()=>{
    console.log("useRegHeartBook 훅 실행");
    const mutate= useMutation(
        ({userNo, bookNo}:IHeartBookMutateProps)=>regHeartBook(userNo,bookNo),
        {
            onSuccess(data){
                if(data.code === "S00"){
                    alert("찜 등록 완료하였습니다.");
                }else{
                    alert(data.msg);
                }
            }
        }
    )
    return {mutate};
}

export const useDelHeartBook= (queryClient:QueryClient)=>{
    console.log("useDelHeartBook 훅 실행");
    const mutate= useMutation(({userNo, bookNo}:IHeartBookMutateProps) => delHeartBook(userNo,bookNo),{
            onSuccess: (data) => { 
                    queryClient.invalidateQueries("getAllHearts"); //이게 있으니 새로고침한듯 되네?
                    if(data.code=="S00"){
                        alert("찜 해제하였습니다.");
                    }
                    else{
                        alert(data.msg);
                    }
               },
               onError:(err)=>{
                alert(err);
               }
            });
    return {mutate};
}

export const useRentBook= ()=>{
    console.log("useRentBook 훅 실행");
    const mutate= useMutation(({userNo, bookNo}:IHeartBookMutateProps)=>rentBook(userNo,bookNo),{
        onSuccess(data) {
            if(data.code === "S00"){
                alert("대출 완료하였습니다.");
            }else{
                alert(data.msg);
            }
        },
    })
    return {mutate};
}

export const useExtendBook= ()=>{
    console.log("useRentBook 훅 실행");
    const mutate= useMutation(({userNo, bookNo}:IHeartBookMutateProps)=>extendBook(userNo,bookNo),{
        onSuccess(data) {
            if(data.code === "S00"){
                alert("연장 완료하였습니다.");
            }else{
                alert(data.msg);
            }
        },
    })
    return {mutate};
}

export const useReturnBook= ()=>{
    console.log("useReturnBook 훅 실행");
    const mutate= useMutation(({userNo, bookNo}:IHeartBookMutateProps)=>returnBook(userNo,bookNo),{
        onSuccess(data) {
            if(data.code === "S00"){
                alert("반납 완료하였습니다.");
            }else{
                alert(data.msg);
            }
        },
    })
    return {mutate};
}

export const useDelBook= (onSuccess:any)=>{
    console.log("useDelBook 훅 실행");
    const mutate= useMutation((bookNo:number)=>delBook(bookNo),{
        onSuccess(data) {onSuccess(data)}
    })
    return {mutate};
}

interface IRegReview{
    userNo:number,
    bookNo:number,
    reviewContent:string
}

export const useRegReview= ()=>{
    console.log("useRegReview 훅 실행");
    const mutate= useMutation(({userNo,bookNo,reviewContent}:IRegReview)=>postReviewOfBook(userNo,bookNo,reviewContent),{
        onSuccess(data) {
            if(data.code === "S00"){
                alert("리뷰 등록하였습니다.");
            }else{
                alert(data.msg);
            }
        },
    })
    return {mutate};
}



export const useGetRentStatus= ({userNo,onSuccess}:IGetApiProps) =>{
    const {isLoading} = useQuery(
        ["getRentStatus",`getRentStatus-${userNo}`],
        ()=>getRentStatus(userNo),
        {
            onSuccess(data) {
                onSuccess(data);
            },
            // refetchOnWindowFocus:false
        }
    ) 
    return {isLoading};
}

export interface IRegBookParams{
    bookName:string,
    bookAuthor:string,
    bookContent:string,
    bookPublisher:string,
    isbn:string,
    bookLocation:string,
    pubDt:string,
    bookImages: FileList,
}


export const useRegBook= (reset:UseFormReset<IRegBookParams>)=>{
    console.log("useRegBook 훅 실행");
    const mutate= useMutation((formData:FormData)=>regBook(formData),{
        onSuccess(data) {
            if(data.code === "S00"){
                alert("도서 등록하였습니다.");
                reset();
            }else{
                alert(data.msg);
            }
        },
    })
    return {mutate};
}

interface IGetReviewsProps{
    userNo:number,
    currentPage:number,
    sizePerPage:number,
    totalCount:number,
    onSuccess:any
}

export const useGetReviewHistory = ({userNo,currentPage,sizePerPage,totalCount,onSuccess}:IGetReviewsProps)=>{
    const {data,isLoading} = useQuery(
        ["getReviewHistory",`GetReviewHistory/${userNo}?page=${currentPage}&size=${sizePerPage}`],
        ()=>getReviewsHistory(userNo,currentPage,sizePerPage),
        {
            onSuccess:onSuccess
        }
    )
    return {isLoading,data};
}

export const useDelReview= ()=>{
    console.log("useDelReview 훅 실행");
    const mutate= useMutation((reviewNo:number)=>delReviewByReviewNo(reviewNo),{
        onSuccess(data) {
            if(data.code === "S00"){
                alert("리뷰 삭제하였습니다.");
            }else{
                alert(data.msg);
            }
        },
    })
    return {mutate};
}

interface IReviewModifyProps{
    reviewNo:number,
    reviewContent:string
}

export const useModifyReview=()=>{
    console.log("useModifyReview 훅 실행");
    const mutate= useMutation(({reviewNo,reviewContent}:IReviewModifyProps)=>modifyReviewByReviewNo(reviewNo,reviewContent),{
        onSuccess(data) {
            if(data.code === "S00"){
                alert("리뷰 수정하였습니다.");
            }else{
                alert(data.msg);
            }
        },
    })
    return {mutate};
}

