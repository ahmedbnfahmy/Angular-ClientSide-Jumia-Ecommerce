import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iaddress } from 'src/app/Models/iaddress';
import { Iuser } from 'src/app/Models/iuser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcountuserService {
  private httpOptions = {};
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getUserByID(Id: string): Observable<Iuser> {
    return this.http.get<Iuser>(environment.jDBUrl + '/api/users/' + Id);
  }

  updateUser(Id: string, data: any): Observable<Iuser> {
    return this.http.put<Iuser>(
      environment.jDBUrl + '/api/users/' + Id,
      data,
      this.httpOptions
    );
  }
  checkEmail(email: string): Observable<any> {
    return this.http.get<any>( environment.jDBUrl + '/api/users/checkEmail/' + email);
  }

  getUserAddByID(): Observable<any> {
    return this.http.get<any>(environment.jDBUrl + '/api/address');
  }
}
