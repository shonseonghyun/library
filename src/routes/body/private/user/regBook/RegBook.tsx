import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { IRegBookParams, useRegBook } from "../../../../../hooks/hooks";
import SubTitle from "../../../../../component/header/SubTitle";


const Wrapper = styled.div`
    margin: 0 auto;
    justify-content: center;
    margin-bottom: 30px;
`;

const Button = styled.button`   
    margin-right: 5px;
    height: 40px;
    padding: 0px 10px;
`;

const InputWrapper = styled.div`
    text-align: center;
`;


const Img = styled.img`
    width:300px;
    height:300px;
`;

const Input = styled.input`
    font-size: 15px;
    width: 300px;
    padding-bottom: 5px;
    padding-top:5px;
`

const FormWrapper =styled.div`
    width: 80%;
    font-size: 28px;
    padding: 15px 0px;
    margin:0 auto;
`;

const Table = styled.table`
    border:  1px solid #d2d2d2;
    border-collapse: collapse ;
`;

const Tbody = styled.tbody`
    display: table-row-group;
    vertical-align: middle;
    unicode-bidi: isolate;
    border-color: inherit;


`;

const Th = styled.th`
    border:  1px solid #d2d2d2;
    background-color: #6ab2cb;
    color:white;
    padding:10px 20px;
    text-align: left;
    white-space: nowrap;
`;

const Td = styled.td`
    border:  1px solid #d2d2d2;
    width: 90%;
    padding-left: 10px;
    text-align: left;
`;


function RegBook(){
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        reset
    } = useForm<IRegBookParams>();
    
    const [preview,setPreview] = useState('');
    const files = watch("bookImages");

    const {mutate:regBookMutate} = useRegBook(reset);

    const onSubmit=(data:IRegBookParams)=>{
        const formData= new FormData();
        formData.append('bookRegReqDto', new Blob([JSON.stringify(data)], {type:'application/json'})); // 텍스트 데이터들 추가
        formData.append("file",Array.from(data.bookImages)[0]);
        regBookMutate.mutate(formData);
        setPreview("");
    }

    const onError=(data:any)=>{
        console.log(data);
    }

    useEffect(()=>{
        console.log("useEffect:" , files);
        if(files==undefined || files.length==0){
            setPreview("");
        }
    },[files])

    useEffect(()=>{
        if(files){
            const filesArr = Array.from(files);
            if(filesArr.length>0){
                const imgFile = filesArr[0];
                const previewUrl = URL.createObjectURL(imgFile);
                setPreview(previewUrl);
            }
        }
    },[files]);

    return (
        <Wrapper>
            <SubTitle title="도서 등록" />

            <FormWrapper>
                {
                    <form onSubmit={handleSubmit(onSubmit,onError)}> 
                        <Table>
                            <Tbody>
                                <tr>
                                    <Th>제목</Th>
                                    <Td>
                                        <Input type="text" {
                                            ...register("bookName",
                                                {
                                                    required:"도서제목은 필수입니다."
                                                }
                                            )
                                        } />
                                    </Td>
                                </tr>
                                <tr>
                                    <Th>저자</Th>
                                    <Td>
                                        <Input type="text" {
                                            ...register("bookAuthor",
                                                {
                                                    required:"저자는 필수입니다."
                                                }
                                            )
                                        } />
                                    </Td>
                                </tr>
                                <tr>
                                    <Th>ISBN</Th>
                                    <Td>
                                        <Input type="text" {
                                            ...register("isbn",
                                                {
                                                    required:"isbn은 필수입니다."
                                                }
                                            )
                                        } />
                                    </Td>
                                </tr>
                                <tr>
                                    <Th>간단설명</Th>
                                    <Td>
                                        <Input type="text" {
                                            ...register("bookContent",
                                                {
                                                    required:"도서 내용은 필수입니다."
                                                }
                                            )
                                        } />
                                    </Td>
                                </tr>
                                <tr>
                                    <Th>출판사</Th>
                                    <Td>
                                        <Input type="text" {
                                            ...register("bookPublisher",
                                                {
                                                    required:"출판사는 필수입니다."
                                                }
                                            )
                                        } />
                                    </Td>
                                </tr>
                                <tr>
                                    <Th>출판일자</Th>
                                    <Td>
                                        <Input type="date" 
                                            pattern="\d{4}-\d{2}-\d{2}" 
                                        {
                                            ...register("pubDt",
                                                {
                                                    required:"출판일자는 필수입니다.",
                                                    pattern:{
                                                        value: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                                                        message:"날짜 형식에 맞춰 입력 바랍니다"
                                                    }
                                                }
                                            )
                                        } />
                                    </Td>
                                </tr>
                                <tr>
                                    <Th>도서 위치</Th>
                                    <Td>
                                    <Input type="text" {
                                        ...register("bookLocation",
                                            {
                                                required:"도서위치는 필수입니다."
                                            }
                                        )
                                    } />
                                    </Td>
                                </tr>
                                <tr>
                                    <Th>도서 이미지</Th>
                                    <Td>
                                        <div>
                                            <Input type="file" {
                                                ...register("bookImages",
                                                    {
                                                        required:"도서 이미지는 필수입니다."
                                                    }
                                                )
                                            }
                                            />
                                        </div>
                                        {preview ? 
                                            <div>
                                                <Img
                                                    src={preview}
                                                />
                                            </div>
                                            : 
                                            <div/>
                                        }
                                    </Td>
                                </tr>
                            </Tbody>
                        </Table>

                        <InputWrapper>
                            <Button>등록</Button>
                            <Button type="button" onClick={()=>reset()}>초기화</Button>
                        </InputWrapper>
                    </form>
                }
            </FormWrapper>


        </Wrapper>
    )
}

export default RegBook;