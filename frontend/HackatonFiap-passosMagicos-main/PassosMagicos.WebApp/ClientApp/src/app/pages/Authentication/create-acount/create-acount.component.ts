import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-create-acount',
  templateUrl: './create-acount.component.html',
  styleUrls: ['./create-acount.component.css']
})
export class CreateAcountComponent implements OnInit {

  form: FormGroup;
  
  constructor(private title:Title, private _snackBar: MatSnackBar, private router: Router, private accountService: AccountService, private formbuilder: FormBuilder) 
  {
    this.form = this.formbuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.title.setTitle("Cadastrar");
  }

  cadastrar()
  {
    this.accountService.Cadastrar(this.form.value).subscribe(result => {
      this._snackBar.open('Usuario Cadastrado com sucesso!');

      this.router.navigate([''])
    },
    err =>{
      this._snackBar.open(err.message);
    });
  }
}
