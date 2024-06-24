import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AuthUserInfoAtom } from "../../../../../../atoms/AuthUserInfo";
import MyLibraryTitle from "../../../../../../component/header/MyLibraryTitle";
import Loading from "../../../../../../component/loading/Loading";
import Select from "../../../../../../component/slsect/Select";
import { useGetRentHistory } from "../../../../../../hooks/hooks";
import RentHistoryRow from "./RentHistoryRow";

const ORDER_OPTIONS = {
    rentDt:"대출일",
    returnDt:"반납일"
}

const Wrapper = styled.div`
    width:100%;
`;

const SelectGroup = styled.div`
    float: right;
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

export interface IRentHistoryBookInfo {
    historyNo:number,
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
    const [rentHistory,setRentHistory] = useState<IRentHistoryBookInfo[]>([]);

    const onSuccess=(data:any)=>{
        if(data.code=="S00"){
            // setRentHistory(data.data);
            //받아올 때부터 정렬
            setRentHistory( data.data.sort(function(a:IRentHistoryBookInfo,b:IRentHistoryBookInfo){
                return Number.parseInt(b.rentDt).valueOf() - Number.parseInt(a.rentDt).valueOf();
            }));  
        }
    }
    const {isLoading}= useGetRentHistory({userNo:authUserInfo.userNo,onSuccess:onSuccess});

    //정렬 핸들러
    const changeOrder = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        const selectValue = e.currentTarget.value;
        if(selectValue=="rentDt"){
            setRentHistory( [...rentHistory].sort(function(a:IRentHistoryBookInfo,b:IRentHistoryBookInfo){
                return Number.parseInt(b.rentDt).valueOf() - Number.parseInt(a.rentDt).valueOf();
            }));  
        }
        else if(selectValue=="returnDt"){
            setRentHistory( [...rentHistory].sort(function(a:IRentHistoryBookInfo,b:IRentHistoryBookInfo){
                return Number.parseInt(b.returnDt).valueOf() - Number.parseInt(a.returnDt).valueOf();
            }));  
        }
    }

    return (
        <Wrapper>
            <MyLibraryTitle title="대출 이력" />
            
            <SelectGroup>
                <Select id="orderCategory" name="orderCategory" onChange={changeOrder} optionList={ORDER_OPTIONS} /> 
            </SelectGroup>

            <TableContainer>
            {
                isLoading ?
                <Loading />
                :
                    <Table>
                        <Thead>
                            <tr>
                            {/* <Th>번호</Th> */}
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
                                isLoading ? <Loading />
                                : rentHistory?.map((data)=>{
                                    return (
                                        <RentHistoryRow key={data.historyNo}  rentHistoryBook={data}/>
                                    )
                                })
                            }
                        </Tbody>
                    </Table>
            }
            </TableContainer>
        </Wrapper>
    )
}

export default RentHistory;