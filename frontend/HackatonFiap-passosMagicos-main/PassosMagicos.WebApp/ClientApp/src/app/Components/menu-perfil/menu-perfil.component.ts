import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-menu-perfil',
  templateUrl: './menu-perfil.component.html',
  styleUrls: ['./menu-perfil.component.css']
})
export class MenuPerfilComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goCalendar()
  {
    this.router.navigate(['']);
  }

  goEditar(){
    this.router.navigate(['voluntario/editar']);
  }

  goProdutos(){
    this.router.navigate(['produtos']);
  }

  checkIn(){
    
  }

  ckeckOut()
  {

  }

}


$(document).ready(function() {
  $("#navMenu").click(function() {
   //$(".nav").toggleClass("small");
    if ($(".nav").hasClass("small")) {
      $(".nav").removeClass("small");
    } else {
      $(".nav").addClass("small");
    }
  });
});

