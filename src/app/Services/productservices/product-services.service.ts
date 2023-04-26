import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Iuser } from '../../Models/iuser';
import { ToastrService } from 'ngx-toastr';
import { LocalStorgeService } from '../localStorge/local-storge.service';
import { Router } from '@angular/router';
import { Icart } from 'src/app/Models/icart';
import { Iproduct } from 'src/app/Models/iproductCart';


@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {
  loginUserId: string;

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

  public subject=new BehaviorSubject<any>('')
  emit<T>(data:T){
    this.subject.next(data)
  }
  on<T>():Observable<T>{
    return this.subject.asObservable()
  }
  
  items = [{ productId: Object("") }]


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

  getUserCart(): Observable<Icart> {
    return this.http.get<Icart>(`${environment.jDBUrl}/api/cart/userCart`, this.httpOptions).pipe(
      catchError(this.handleError)
    )

  }

  addUserCart(cart: any): Observable<Icart> {
    return this.http.post<Icart>(`${environment.jDBUrl}/api/cart/addToCart`, cart, this.httpOptions).pipe(
      catchError(this.handleError)
    )

  }

  removeCart(cartId: any): Observable<Icart> {
    return this.http.delete<Icart>(`${environment.jDBUrl}/api/cart/deleteCart/${cartId}`, this.httpOptions).pipe(
      catchError(this.handleError)
    )

  }

  deleteItemFromCart(cartId: string, productId: string): Observable<Icart> {
    return this.http.delete<Icart>(environment.jDBUrl + '/api/cart/' + cartId + '/' + productId)
  }

  GetProductsBySubCate(subcate: string): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(
      environment.jDBUrl + '/api/products/subcat/' + subcate, this.httpOptions).pipe(
        catchError(this.handleError)
      )

  }

  getProductsByCategory(cate: string) {
    return this.http.get<Iproduct[]>(
      environment.jDBUrl + '/api/products/cat/' + cate, this.httpOptions).pipe(
        catchError(this.handleError)
      )

  }


  addToUserCart(data: any) {

    return this.http.post<any>(
      environment.jDBUrl + '/api/cart/addToCart', data, this.httpOptions).pipe(
        catchError(this.handleError)
      )

  }


  
  // payment service
  addPayment(stripeToken: any,amount:number): Observable<any> {
    return this.http.post<Icart>(`${environment.jDBUrl}/api/checkout`, {token:stripeToken,amount:amount}, this.httpOptions).pipe(
      catchError(this.handleError)
    )
    
  }



  increaseQuantity(cartId: string, productId: string): Observable<Icart> {
    return this.http.put<Icart>(environment.jDBUrl + '/api/cart/increaseQuantity/' + cartId + '/' + productId, this.httpOptions)
  }

  decreaseQuantity(cartId: string, productId: string): Observable<Icart> {
    return this.http.put<Icart>(environment.jDBUrl + '/api/cart/decreaseQuantity/' + cartId + '/' + productId, this.httpOptions)
  }


  getProductsOfSearch(input: string) {
    let data = {search:input}

    console.log(data);

    return this.http.post<Iproduct[]>(
      environment.jDBUrl + `/api/products/search`, data ,this.httpOptions).pipe(
        catchError(this.handleError)
      )

      

  }

}
