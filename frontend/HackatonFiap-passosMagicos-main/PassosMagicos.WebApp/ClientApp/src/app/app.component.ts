import { Component } from '@angular/core';
import { localStorageService } from './shared/localStorageService';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  exibirCabecalho: boolean;
  
  constructor(private _localStorageService: localStorageService)
  {
    this._localStorageService.token.subscribe(
      data =>{
        this.exibirCabecalho = data;
      });

    var token = this._localStorageService.getToken();

    if(token)
    this.exibirCabecalho = true;

  }
}

