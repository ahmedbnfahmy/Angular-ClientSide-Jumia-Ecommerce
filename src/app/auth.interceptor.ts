import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable ,throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserAuthService } from './Services/user/user-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: UserAuthService,
    // private spinner: NgxSpinnerService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('access_token');
    const lang = localStorage.getItem('current_lang')||'en'
    if(token){
      // this.spinner.show();
      console.log("1",lang)
      request = request.clone({
        headers: request.headers.set('authorization', this.authService.Token)
        .set('lang', lang as string)
      });
    }else{
      // this.spinner.show();
      console.log("2",lang)
    request = request.clone({
      headers: request.headers.set('lang', lang)
    });
    }
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      // this.spinner.hide();
    }, 1000);
    return next.handle(request).pipe(
      retry(1),
      catchError(
        (err)=>{
          request = request.clone({
            headers: request.headers.set('authorization', this.authService.Token)
            .set('lang', lang as string)
          });
          if(err instanceof HttpErrorResponse){
            console.log("interceptor...")
            if(err.status === 405){
              this.authService.Logout();
            }
          }
          return throwError(err)
        }
      )
    )
    
  }
}
export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
