import { Component, OnInit } from '@angular/core';
import { Token } from 'src/app/models/Login';
import { localStorageService } from 'src/app/shared/localStorageService';

@Component({
  selector: 'app-confirmacao-email',
  templateUrl: './confirmacao-email.component.html',
  styleUrls: ['./confirmacao-email.component.css']
})
export class ConfirmacaoEmailComponent implements OnInit {

  token: Token;
  constructor(private _localStorageService: localStorageService) { }

  ngOnInit() {
    this.token = this._localStorageService.getToken();
  }

}
