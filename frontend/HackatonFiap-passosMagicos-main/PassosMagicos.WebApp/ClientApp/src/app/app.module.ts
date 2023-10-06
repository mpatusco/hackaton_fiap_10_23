import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSlideToggleModule, MatSnackBarModule, MatStepperModule } from '@angular/material';
import { localStorageService } from './shared/localStorageService';
import { HomeComponent } from './pages/Core/home/home.component';
import { AuthenticationComponent } from './pages/Authentication/authentication/authentication.component';
import { LoginComponent } from './pages/Authentication/login/login.component';
import { CreateAcountComponent } from './pages/Authentication/create-acount/create-acount.component';
import { AuthGuard } from './pages/Authentication/shared/auth.guard';
import { ErrorRequestInterceptor } from './pages/Authentication/shared/Error.Interceptor';
import { TokenInterceptor } from './pages/Authentication/shared/jwt.interceptor';
import { ExibirParaNiveisDirective } from './shared/Directives/ExibirParaNiveisDirective';
import { ConfirmacaoEmailComponent } from './pages/Authentication/confirmacao-email/confirmacao-email/confirmacao-email.component';
import { NavMenuComponent } from './Components/nav-menu/nav-menu.component';
import {MatSelectModule} from '@angular/material/select';
import { MenuPerfilComponent } from './Components/menu-perfil/menu-perfil.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './Components/calendario/calendario.component';
import { ProdutosComponent } from './pages/Core/home/produtos/produtos.component';
import { EditarUsuarioComponent } from './pages/Core/home/editar-usuario/editar-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AuthenticationComponent,
    LoginComponent,
    CreateAcountComponent,
    ExibirParaNiveisDirective,
    ConfirmacaoEmailComponent,
    MenuPerfilComponent,
    CalendarioComponent,
    ProdutosComponent,
    EditarUsuarioComponent
  ],
  exports:[ExibirParaNiveisDirective],
  entryComponents:[],
  imports: [
    // ExibirParaNiveisModule,
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', children:[], canActivate:[AuthGuard] },
      { path: 'confirmar/:token', component: ConfirmacaoEmailComponent, pathMatch: 'full', children:[], canActivate:[AuthGuard] },

    {path: '', component: AuthenticationComponent},
    {path: '', redirectTo:'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent },
    {path: 'voluntario/editar', component: EditarUsuarioComponent },
    {path: 'produtos', component: ProdutosComponent },
    { path: 'voluntario', component: CreateAcountComponent },
    { path: 'home', component: HomeComponent },
      
    ]),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    ErrorRequestInterceptor,
    TokenInterceptor,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule
    
  ],
  providers: [localStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
