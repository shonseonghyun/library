import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    input,select{
        padding-left: 5px;
        border: 1px solid ${props=>props.theme.borderColor};
        background-color: ${props=>props.theme.inputColor};
        color:${props=>props.theme.textColor};
    }
    input:focus {outline:none;}
    input:-webkit-autofill,input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 1000px #32353F inset;
    box-shadow: 0 0 0 1000px ${props=>props.theme.inputColor} inset;
    //배경색
    -webkit-text-fill-color:${props=>props.theme.textColor};
    //글자색
    }
   
    path{
        stroke:${props=>props.theme.textColor};
    }

    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 10px;
        vertical-align: baseline;
        color:${props=>props.theme.textColor}
    }
    body{
        font-weight: 300;
        font-family: 'Source Sans Pro', sans-serif;
        background-color: ${props=>props.theme.bgColor};
        line-height: 1.2;
    }
    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        cursor: pointer;
        background-color: ${props=>props.theme.btnColor};
        color: ${props=>props.theme.btnTextColor}
    }
`;

export default GlobalStyle;