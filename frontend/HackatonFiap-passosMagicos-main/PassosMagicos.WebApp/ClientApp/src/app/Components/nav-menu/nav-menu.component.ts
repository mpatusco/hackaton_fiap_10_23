import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { localStorageService } from 'src/app/shared/localStorageService';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  token;

  constructor(private _localStorageService: localStorageService, private route: Router){

    this.token = this._localStorageService.getToken();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

Sair()
{
  // this._localStorageService.removerToken();
  // window.location.reload();

  debugger
  this.route.navigate(['/pessoa', 'dsadsdasd']);
}

}
