export class Foto {

    constructor(url:string = null, publica:boolean = null, dataEnvio:Date = null)
{
    this.url = url;
    this.publica = publica;
    this.dataEnvio = dataEnvio;
}
    url:string;
    publica:boolean;
    dataEnvio:Date;
    id:string;
    extensao:string;
}