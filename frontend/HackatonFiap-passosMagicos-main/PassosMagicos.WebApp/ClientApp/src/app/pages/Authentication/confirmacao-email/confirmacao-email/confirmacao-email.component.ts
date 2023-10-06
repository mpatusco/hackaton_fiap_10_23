import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Token } from 'src/app/models/Login';
import { localStorageService } from 'src/app/shared/localStorageService';

@Component({
  selector: 'app-confirmacao-email',
  templateUrl: './confirmacao-email.component.html',
  styleUrls: ['./confirmacao-email.component.css']
})
export class ConfirmacaoEmailComponent implements OnInit {

  token: Token;
  constructor(private _localStorageService: localStorageService,  private _route: ActivatedRoute) {}

  ngOnInit() {
    this.token = this._localStorageService.getToken();

    this._route.queryParamMap.subscribe(params => {
     var token =  params.getAll('token');
  });
  }

}
