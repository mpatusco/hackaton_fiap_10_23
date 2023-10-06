import { NivelPermissao } from "./enum/NivelPermissao";

export class Token {
    idsession:string;
}

export class ResponseModel {
    success: boolean;
    message:string;
    data:any;
}


export class ResponseTokenModel {
    success: boolean;
    message:string;
    data:Token;
}

export class Usuario {
    id:string;
    nome:string;
    email:string;
    emailConfirmed:boolean;

}