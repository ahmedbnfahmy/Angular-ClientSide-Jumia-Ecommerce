import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

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

  httpOptions = {};

  constructor(private toastr: ToastrService, private http: HttpClient, public router: Router) {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

  }


  addUserToWichList(data: any): Observable<any> {
    return this.http.post<any>(`${environment.jDBUrl}/api/wishlist`, data, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }


  getUserWichLists(): Observable<any> {
    return this.http.get<any>(`${environment.jDBUrl}/api/wishlist`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }


  deleteProductFromWishList(prdId:any): Observable<any> {
    return this.http.delete<any>(`${environment.jDBUrl}/api/wishlist/remveItem/`+prdId, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }




}
