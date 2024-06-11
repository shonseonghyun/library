import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { AuthUserInfoAtom } from "../../../../../../atoms/AuthUserInfo";
import { getRentHistory } from "../../../../../../api/api";
import { useQuery } from "react-query";
import { useGetRentHistory } from "../../../../../../hooks/hooks";
import { Link } from "react-router-dom";
import { replaceDt } from "../../../../../../api/utils";
import Loading from "../../../../../../component/loading/Loading";
import MyLibraryTitle from "../../../../../../component/header/MyLibraryTitle";

const Wrapper = styled.div`
    width:100%;
`;

const Table = styled.table`
    border-spacing: 0;
    border-collapse: collapse;
    width:100%;
`;

const Thead = styled.thead`
    vertical-align: middle;
`;

const Th = styled.th`
    padding: 10px 0 11px;
    border-bottom: 1px solid #dedede;
    // text-align: center;
    font-weight: 700;
    font-size: 20px;
    color: #666;
    display: table-cell;
`;

const TableContainer = styled.div`
    margin-top: 10px;
`;

const Tbody = styled.tbody`
    display: table-row-group;
    vertical-align: middle;
    unicode-bidi: isolate;
    border-color: inherit;
`;

const Td = styled.td`
    font-size: 15px;
    padding: 10px 5px 10px 5px;
`;


interface IBookHistoryInfo {
    bookNo:number,
    bookName:string,
    rentDt:string,
    haveToReturnDt:string,
    returnDt:string,
    rentState:string,
    // status:string,
    extensionFlg:boolean
}

function RentHistory(){
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
    const [bookHistory,setBookHistory] = useState<IBookHistoryInfo[]>([]);

    const onSuccess=(data:any)=>{
        if(data.code=="S00"){
            setBookHistory(data.data);
        }
    }
    const {isLoading}= useGetRentHistory({userNo:authUserInfo.userNo,onSuccess:onSuccess});

    return (
        <Wrapper>
            <MyLibraryTitle title="대출 이력" />
            
            {
                isLoading ? <Loading />
                :
                <TableContainer>
                    <Table>
                        <Thead>
                            <tr>
                            <Th>번호</Th>
                                <Th>도서정보</Th>
                                <Th>대출일</Th>
                                <Th>반납일</Th>
                                <Th>상태</Th>
                                <Th>연체</Th>
                                <Th>연장</Th>
                            </tr>  
                        </Thead>
                        <Tbody>
                            {
                                bookHistory?.map((data,index)=>{
                                    return (
                                    <tr key={data.bookNo}>
                                        <Td>
                                            {index+1}
                                        </Td>
                                        <Td>
                                            <Link to={`/book/${data.bookNo}`} style={{textDecoration:"none",fontSize:"inherit"}}>
                                                {data.bookName}
                                            </Link>
                                        </Td>
                                        <Td>
                                            {replaceDt(data.rentDt)}
                                        </Td>
                                        <Td>
                                            {replaceDt(data.returnDt)}
                                        </Td>
                                        <Td>
                                            {
                                                data.rentState == "NORMAL_RETURN"
                                                ? "정상"
                                                : "연체"
                                            }
                                        </Td>
                                        <Td>
                                            {
                                                data.returnDt > data.haveToReturnDt 
                                                ? parseInt(data.returnDt)-parseInt(data.haveToReturnDt)
                                                : 0
                                            }
                                        </Td>
                                        <Td>
                                            {
                                                data.extensionFlg ? "O" : "X"
                                            }
                                        </Td>
                                    </tr>)
                                })
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            }
        </Wrapper>
    )
}

export default RentHistory;