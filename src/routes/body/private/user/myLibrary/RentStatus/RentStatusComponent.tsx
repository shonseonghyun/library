import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AuthUserInfoAtom } from "../../../../../../atoms/AuthUserInfo";
import { useExtendBook, useGetRentStatus, useReturnBook } from "../../../../../../hooks/hooks";
import RentRuleExplainComponent from "./RentRuleExplainComponent";
import { replaceDt } from "../../../../../../api/utils";
import Loading from "../../../../../../component/loading/Loading";
import MyLibraryTitle from "../../../../../../component/header/MyLibraryTitle";


const Wrapper = styled.div`
    
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

const ArrangeSelectWrapper = styled.div`
    float: right;
`;

const Td = styled.td`
    font-size: 15px;
    padding: 10px 5px 10px 5px;
`;

const Select = styled.select`
    font-size: 13.55px;
    box-sizing: border-box;
    padding-left: 9px;
    color: #5a5a5a;
    background-color: #e8e8e8;
    border: none;
    height: 25px;
    margin-right: 3px;
    padding-right: 24px;
`;

export interface IRentStatusBookInfo {
    bookNo:number,
    bookName:string,
    rentDt:string,
    haveToReturnDt:string,
    extensionFlg:boolean
}
  
function RentStatus(){
    const [rentStatus,setRentStatus]= useState<IRentStatusBookInfo[]>([]);
    const [checkItems,setCheckItems] = useState<number[]>([]);
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
   
    const onSuccess =(data:any)=>{
        setRentStatus(data.data);
    }
    const {isLoading} = useGetRentStatus({userNo:authUserInfo.userNo,onSuccess});

    //연장 신청 개별 신청 api 핸들러
    const {mutate:extendBookMutate} = useExtendBook();
    const clickedExtendBook = (bookNo:number)=>{
        extendBookMutate.mutate({userNo:authUserInfo.userNo,bookNo:bookNo})
    }


    //전체 선택 핸들러
    const handleAllCheckItems = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const isChecked = e.currentTarget.checked;
        if(isChecked){
            const checkedItemsArray: number[] =[];
            rentStatus.forEach(el=>checkedItemsArray.push(el.bookNo));
            setCheckItems(checkedItemsArray);
        }else{
            setCheckItems([]);
        }
    }

    //개별 선택 핸들러
    const handleSingleCheckItem= (e:React.ChangeEvent<HTMLInputElement>)=>{
        const isChecked=e.currentTarget.checked;
        const checkedItemNum = Number.parseInt(e.currentTarget.value);

        if(isChecked){
            setCheckItems([checkedItemNum,...checkItems])
        }else{
            setCheckItems(checkItems.filter(bookId=> bookId !== checkedItemNum))
        }
    }

    //정렬 핸들러
    const arrangeHandler = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        const selectValue = e.currentTarget.value;
        if(selectValue=="renTdt"){
            setRentStatus( [...rentStatus].sort(function(a:IRentStatusBookInfo,b:IRentStatusBookInfo){
                return Number.parseInt(b.rentDt).valueOf() - Number.parseInt(a.rentDt).valueOf();
            }));  
        }
        else if(selectValue=="returnDt"){
            setRentStatus( [...rentStatus].sort(function(a:IRentStatusBookInfo,b:IRentStatusBookInfo){
                return Number.parseInt(b.haveToReturnDt).valueOf() - Number.parseInt(a.haveToReturnDt).valueOf();
            }));  
        }
    }

    const extendRequestAllHandler = ()=>{ 
        alert("선택 연장 신청 핸들러");
        console.log(checkItems);
    }

    const {mutate:returnMutate} = useReturnBook();
    const clickedReturnBook = (bookNo:number)=>{
        returnMutate.mutate({userNo:authUserInfo.userNo,bookNo:bookNo});
    }

    
    return (
        <Wrapper>
            <MyLibraryTitle title="대출 현황" />
            <RentRuleExplainComponent />
            <ArrangeSelectWrapper>
                <Select name="Arrange" id="Arrange" onChange={arrangeHandler}>
                    <option value="renTdt">대출일</option>
                    <option value="returnDt">반납 예정일</option>
                </Select>
            </ArrangeSelectWrapper>

            {/* <div>
                <button name="returnAllBtn" onClick={extendRequestAllHandler}>선택반납연기</button>
            </div> */}

            {
                isLoading ? <Loading />
                :
                <TableContainer>
                    <Table>
                        <Thead>
                            <tr>
                                <Th>
                                    <input 
                                        type="checkbox" 
                                        name="select-all"
                                        onChange={handleAllCheckItems}
                                        checked={rentStatus?.length == checkItems.length}
                                    />
                                </Th>
                                <Th>번호</Th>
                                <Th>도서정보</Th>
                                <Th>대출일</Th>
                                <Th>반납예정일</Th>
                                <Th>상태</Th>
                                <Th>반납</Th>
                                <Th>반납 연장</Th>
                            </tr>  
                        </Thead>
                        <Tbody>
                            {
                                rentStatus?.map((data,index)=>{
                                    return (
                                    <tr key={data.bookNo}>
                                        <Td>
                                            <input 
                                                value={data.bookNo}
                                                type="checkbox"
                                                checked={checkItems.includes(data.bookNo)}
                                                onChange={handleSingleCheckItem}
                                            />
                                        </Td>
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
                                            {replaceDt(data.haveToReturnDt)}
                                        </Td>
                                        <Td>
                                            {
                                                data.rentDt>data.haveToReturnDt 
                                                ? "연체"
                                                : "대여"
                                            }
                                        </Td>
                                        <Td>
                                            <button onClick={()=>clickedReturnBook(data.bookNo)}>반납</button>
                                        </Td>
                                        <Td>
                                            <button onClick={()=>clickedExtendBook(data.bookNo)} disabled={ data.extensionFlg }>연장</button>
                                        </Td>
                                    </tr>)
                                })
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            }
        </Wrapper>
    );
}


export default RentStatus;