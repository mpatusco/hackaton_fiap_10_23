import { Foto } from "./Foto";

export class Publicacao {
    constructor(nome:string, usuario:string, urlPerfil:string, foto:Foto)
    {
        this.nome = nome;
        this.usuario = usuario;
        this.urlPerfil = urlPerfil;
        this.foto = foto;
    }
    nome:string;
    usuario:string;
    foto:Foto;
    urlPerfil:string;
    id:number
}

