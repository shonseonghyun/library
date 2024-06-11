import "styled-components"

declare module "styled-components"{
    export interface DefaultTheme{
        bgColor: string,
        btnColor:string,
        disableBtnColor:string,
        btnTextColor:string
        textColor:string,
        inputColor:string,
        borderColor:string,
        gradientColor:string
    }
}