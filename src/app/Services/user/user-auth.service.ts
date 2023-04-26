import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable ,throwError} from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Iuser } from '../../Models/iuser';
import { ToastrService } from 'ngx-toastr';
import { LocalStorgeService } from '../localStorge/local-storge.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private isLogged!: boolean;

  private loggedStatus = new BehaviorSubject<boolean>(false);
  public userNameStore = new BehaviorSubject<string>("")
  public userName$ = this.userNameStore.asObservable();

  httpOptions = {};
  authToken: any;
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    public router: Router,
    private storageService: LocalStorgeService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  signup(user: any): Observable<Iuser> {
    return this.http.post<Iuser>(`${environment.jDBUrl}/api/auth/signup`, user, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  signIn(user: any): any {
    this.http.post<Iuser>(`${environment.jDBUrl}/api/auth/login`, user, this.httpOptions).subscribe((res: any) => {
        this.toastr.success(`Hello again, ${res.user.name}`);
        if (res.user, res.token) {
          localStorage.setItem('access_token', res.token)
          localStorage.setItem('user', JSON.stringify(res.user))
          this.isLogged = true;
          this.loggedStatus.next(this.isLogged); 
          this.userNameStore.next(res.user.name);
          // this.storageService.setItem('name',res.user.name)
          this.router.navigate(['/Home'])
        }
        return res.user
      }, (err) => {
        this.toastr.error(`${err.error}`)
      })
  }
  getUserName(): Observable<string> {
    return this.userNameStore;
  }

  get Token(): any {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }
  isLoggedStatus(): Observable<boolean> {
    return this.loggedStatus;
  }

  Logout() {
    // this.toastr.warning(`Bye Bye...`)
    this.http.get(`${environment.jDBUrl}/api/auth/logout`).subscribe(d => {
    })
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    this.storageService.removeItem('name')
    if (localStorage.removeItem('access_token') == null) {
      this.isLogged = false;
      this.loggedStatus.next(false);
      this.router.navigate(['/User/login']);
    }
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
  //////////////////////////////////////////////

  check(email: string): Observable<any> {
    return this.http.get<any>(environment.jDBUrl + '/api/users/check/forget/' + email)
  }



  HangePass(email: string, password: string, realpass: string): Observable<Iuser> {
    let updatePass = { password: password, realpass: realpass }
    return this.http.put<Iuser>(environment.jDBUrl + '/api/users/changePass/' + email, updatePass, this.httpOptions)
  }


  ////Google credential
  googleSignIn(user: any): any {
    this.http.post<any>(`${environment.jDBUrl}/api/auth/google/login`, user, this.httpOptions)
      .subscribe((res: any) => {
        // this.toastr.success(`Hello again, ${res.user.name}`);
        if (res.user, res.token) {
          localStorage.setItem('access_token', res.token)
          localStorage.setItem('user', JSON.stringify(res.user))
          this.isLogged = true;
          this.loggedStatus.next(this.isLogged);
          this.userNameStore.next(res.user.name);
          this.router.navigate(['Home'])
        }
        return res.user
      }, (err) => {
        this.toastr.error(`${err.error}`)
      })
  }

  googleSignup(user: any): Observable<any> {
    return this.http.post<any>(`${environment.jDBUrl}/api/auth/google/signup`, user, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

}
