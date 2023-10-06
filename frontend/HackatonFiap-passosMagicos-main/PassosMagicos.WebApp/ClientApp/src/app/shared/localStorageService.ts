import { EventEmitter } from "@angular/core";
import { Token } from "../models/Login";

export class localStorageService {

    token = new EventEmitter<boolean>();

    setToken(token:Token){
        window.localStorage.setItem('token', JSON.stringify(token));

        this.token.emit(true);
    }

    getToken(): Token
    {
        return JSON.parse( window.localStorage.getItem('token'));
    }

    removerToken() : void 
    {
        window.localStorage.clear();
    }
}