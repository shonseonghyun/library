import React, { useCallback, useState } from 'react';
import { useExtendBook, useGetRentStatus, useReturnBook } from '../../../../../../hooks/hooks';
import { IRentStatusBookInfo } from './RentStatus';
import { AuthUserInfoAtom } from '../../../../../../atoms/AuthUserInfo';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import RentStatusRow from './RentStatusRow';
import Loading from '../../../../../../component/loading/Loading';
import Select from '../../../../../../component/slsect/Select';

const ORDER_OPTIONS = {
    rentDt:"대출일",
    haveToReturnDt:"반납예정일"
}



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

const SelectGroup = styled.div`
    float: right;
`;

const RentstatuRows = () => {
    const [rentStatus,setRentStatus]= useState<IRentStatusBookInfo[]>([]);
    const [checkItems,setCheckItems] = useState<number[]>([]);
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
   
    const onSuccess =(data:any)=>{
        setRentStatus(data.data);
        setRentStatus( data.data.sort(function(a:IRentStatusBookInfo,b:IRentStatusBookInfo){
            return Number.parseInt(b.rentDt).valueOf() - Number.parseInt(a.rentDt).valueOf();
        }));  
    }
    const {isLoading} = useGetRentStatus({userNo:authUserInfo.userNo,onSuccess});

    //도서 대여 연장 
    const {mutate:extendBookMutate} = useExtendBook();
    const clickedExtendBook = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
        const bookNo = parseInt(e.currentTarget.value);
        extendBookMutate.mutate({userNo:authUserInfo.userNo,bookNo:bookNo})
    },[]);

    //도서 반납
    const {mutate:returnMutate} = useReturnBook();
    const clickedReturnBook = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
        const bookNo = parseInt(e.currentTarget.value);
        returnMutate.mutate({userNo:authUserInfo.userNo,bookNo:bookNo});
    },[]);


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
    const changeOrder = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        const selectValue = e.currentTarget.value;
        if(selectValue=="rentDt"){
            setRentStatus( [...rentStatus].sort(function(a:IRentStatusBookInfo,b:IRentStatusBookInfo){
                return Number.parseInt(b.rentDt).valueOf() - Number.parseInt(a.rentDt).valueOf();
            }));  
        }
        else if(selectValue=="haveToReturnDt"){
            setRentStatus( [...rentStatus].sort(function(a:IRentStatusBookInfo,b:IRentStatusBookInfo){
                return Number.parseInt(b.haveToReturnDt).valueOf() - Number.parseInt(a.haveToReturnDt).valueOf();
            }));  
        }
    }

    const extendRequestAllHandler = ()=>{ 
        alert("선택 연장 신청 핸들러");
        console.log(checkItems);
    }

    return (
        <>
             <SelectGroup>
                <Select id="orderCategory" name="orderCategory" onChange={changeOrder} optionList={ORDER_OPTIONS} /> 
            </SelectGroup>

            {/* <div>
                <button name="returnAllBtn" onClick={extendRequestAllHandler}>선택반납연기</button>
            </div> */}

            {
                <TableContainer>
                    {
                        isLoading ? 
                            <Loading />
                        :
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
                                    {/* <Th>번호</Th> */}
                                    <Th>도서정보</Th>
                                    <Th>대출일</Th>
                                    <Th>반납예정일</Th>
                                    <Th>상태</Th>
                                    <Th>반납</Th>
                                    <Th>연장</Th>
                                </tr>  
                            </Thead>
                            <Tbody>
                                {
                                    rentStatus?.map((data)=>{
                                            return (
                                                    <RentStatusRow key={data.bookNo} rentStatusBook={data} extendBook={clickedExtendBook} returnBook={clickedReturnBook}/>
                                                )
                                            })
                                        }
                            </Tbody>
                        </Table>
                    }
                </TableContainer>
            }
        </>
    );
};

export default RentstatuRows;