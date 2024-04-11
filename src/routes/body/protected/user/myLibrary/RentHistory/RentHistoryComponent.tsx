import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { AuthUserInfoAtom } from "../../../../../../atoms/AuthUserInfo";
import { getRentHistory } from "../../../../../../api";
import { useQuery } from "react-query";

const Wrapper = styled.div`
    width:100%;
    height:50px;
    background-color: yellow;
`;

interface IBookHistoryInfo {
    bookNo:number,
    bookName:string,
    rentDt:string,
    haveToReturnDt:string,
    // status:string,
    extensionFlg:boolean
}

function RentHistory(){
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
    const [bookHistory,setBookHistory] = useState<IBookHistoryInfo[]>([]);

    useEffect(()=>{
        const response = getRentHistory(authUserInfo.userNo);
        response.then(response=>{
            setBookHistory(response?.data);
        });
    },[])
    
    return (
        <Wrapper>
            <h1>대출 이력</h1>
            {
                bookHistory?.map(item=>
                    (
                        <div key={item.bookNo}>
                            <p>{item.bookName}</p>
                            <p>{item.bookName}</p>
                            <p>{item.bookName}</p>
                        </div>
                        

                    )
                )    
            }
        </Wrapper>
    )
}

export default RentHistory;