import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { regBookFetch } from "../../../../../api/api";


const InputWrapper = styled.div`

`;

const Label = styled.label`
    display: inline-block;
    background: white;
    font-size: 14px;
    color: #888;
    font-weight: bold;
`;

const Img = styled.img`
    width:300px;
    height:300px;
`;

const Input = styled.input`
    font-size: 15px;
    color: #222222;
    width: 300px;
    border: none;
    border-bottom: solid #aaaaaa 1px;
    padding-bottom: 10px;
    background: none;
`

export interface IRegBookParams{
    bookName:string,
    bookAuthor:string,
    bookContent:string,
    bookPublisher:string,
    isbn:string,
    bookLocation:string,
    pubDt:string,
    bookImages: FileList
}

function RegBook(){
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch
    } = useForm<IRegBookParams>();
    
    const [preview,setPreview] = useState('');
    const files = watch("bookImages");

    const onSubmit=(data:IRegBookParams)=>{
        const formData= new FormData();
        formData.append('bookRegReqDto', new Blob([JSON.stringify(data)], {type:'application/json'})); // 텍스트 데이터들 추가
        formData.append("file",Array.from(data.bookImages)[0]);
        regBookFetch(formData);
    }

    const onError=(data:any)=>{
        console.log("onError");
        console.log(data);
    }

    const onClick=(e:React.MouseEvent<HTMLButtonElement>)=>{
        // e.preventDefault(); // submit을 막음 / 용도 : input값에 대한 검증 외 추가검증 필요시(ex. 서버로 아이디 중복체크했는지?)
        console.log("onClick");
    }


    useEffect(()=>{
        if(files){
            const filesArr = Array.from(files);
            if(filesArr.length>0){
                const imgFile = filesArr[0];
                console.log(imgFile);
                const previewUrl = URL.createObjectURL(imgFile);
                setPreview(previewUrl);
            }
        }
    },[files]);

    return (
        <>
            <h1>도서 등록</h1>

            <form onSubmit={handleSubmit(onSubmit,onError)} >
                <InputWrapper>
                    <Label>도서 제목</Label>
                    <Input type="text" {
                        ...register("bookName",
                            {
                                required:"도서제목은 필수입니다."
                            }
                        )
                    } />
                </InputWrapper>
                {errors.bookName && <p>{errors.bookName.message}</p>}

                <InputWrapper>
                    <Label>저자</Label>
                    <Input type="text" {
                        ...register("bookAuthor",
                            {
                                required:"저자는 필수입니다."
                            }
                        )
                    } />
                </InputWrapper>
                {errors.bookAuthor && <p>{errors.bookAuthor.message}</p>}

                <InputWrapper>
                    <Label>isbn</Label>
                    <Input type="text" {
                        ...register("isbn",
                            {
                                required:"isbn은 필수입니다."
                            }
                        )
                    } />
                </InputWrapper>
                {errors.isbn && <p>{errors.isbn.message}</p>}

                <InputWrapper>
                    <Label  >간단 설명</Label>
                    <Input type="text" {
                        ...register("bookContent",
                            {
                                required:"도서 내용은 필수입니다."
                            }
                        )
                    } />
                </InputWrapper>
                {errors.bookContent && <p>{errors.bookContent.message}</p>}

                <InputWrapper>
                    <Label  >출판사</Label>
                    <Input type="text" {
                        ...register("bookPublisher",
                            {
                                required:"출판사는 필수입니다."
                            }
                        )
                    } />
                </InputWrapper>
                {errors.bookPublisher && <p>{errors.bookPublisher.message}</p>}

                <InputWrapper>
                    <Label  >출판일자</Label>
                    <Input type="text" {
                        ...register("pubDt",
                            {
                                required:"출판일자는 필수입니다."
                            }
                        )
                    } />
                </InputWrapper>
                {errors.pubDt && <p>{errors.pubDt.message}</p>}

                <InputWrapper>
                    <Label  >도서 위치</Label>
                    <Input type="text" {
                        ...register("bookLocation",
                            {
                                required:"도서위치는 필수입니다."
                            }
                        )
                    } />
                </InputWrapper>
                {errors.bookLocation && <p>{errors.bookLocation.message}</p>}

                <InputWrapper>
                    <Label  >도서 이미지</Label>
                    <Input type="file" {
                        ...register("bookImages",
                            {
                                required:"도서 이미지는 필수입니다."
                            }
                        )
                    }
                    />
                    {preview ? 
                        <Img
                            src={preview}
                        />
                        : 
                        <div/>
                    }
                </InputWrapper>
                {errors.bookImages && <p>{errors.bookImages.message}</p>}

                <button onClick={onClick}>등록 요청</button>
            </form>
        </>
    )
}

export default RegBook;