import emailjs from "@emailjs/browser";
import config from "../../config";


export interface ISendEmailHandlerProps{
    email:string,
    name:string,
    authNumber:string
}

export interface IResponse{
    rslt: boolean,
    msg:string
}

export function sendEmailAuthNumber(props:ISendEmailHandlerProps){

    const templateParams = {
        email: props.email,
        name: props.name,
        authNumber: props.authNumber
    }

        emailjs.send(
        config.mailer.ServiceId as string,
        config.mailer.TemplateId as string,
        templateParams,
        config.mailer.publicKey as string,
    )
}