import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { localStorageService } from 'src/app/shared/localStorageService';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { AccountService } from '../shared/account.service';
import { NivelPermissao } from 'src/app/models/enum/NivelPermissao';

declare var gtag;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  public NivelPermissao = NivelPermissao;
  

  constructor(public dialog: MatDialog, private title: Title, private _snackBar: MatSnackBar, private router: Router, private localStorageService: localStorageService, private accountService: AccountService) { }

  ngOnInit() {
    this.title.setTitle("Login");
  }

  adicionar()
  {
    this.accountService.logar(this.form.value).subscribe(result => {
      this.localStorageService.setToken(result.data);
      this.router.navigate([''])
    },
    err =>{
      this._snackBar.open('Usuario ou senha invalida');
    });
  }

  cadastrar()
  {
    gtag('event', `BOTAO_CADASTRAR`, {
      event_category: 'USUARIO',
      event_label: 'Acompanhamento de intenção de cadastro'
  });

    this.router.navigate(['voluntario']);
  }
}
