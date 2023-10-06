import { Injectable, NgModule } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { localStorageService } from 'src/app/shared/localStorageService';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: localStorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.getToken();
        
        if (currentUser && currentUser.idsession) {
            request = request.clone({
                headers: request.headers.set('id_session', `${currentUser.idsession}`)
            });
        }
        return next.handle(request);
    }
}

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        },
    ],
})


export class TokenInterceptor { }