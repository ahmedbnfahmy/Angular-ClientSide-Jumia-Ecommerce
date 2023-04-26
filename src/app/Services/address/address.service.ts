import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Icountry } from 'src/app/Models/icountry';
import { Igovernate } from 'src/app/Models/igovernate';
import { Icity } from 'src/app/Models/icity';
import { Iaddress } from 'src/app/Models/iaddress';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  httpOptions = {}
  constructor(private http:HttpClient) {
    this.httpOptions = {
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }
  getCountries():Observable<Icountry[]>{
    return this.http.get<Icountry[]>(`${environment.jDBUrl}/api/country`)
  }
  
  getGovs(ctryname:string): Observable<Igovernate[]>{
    return this.http.get<Igovernate[]>(`${environment.jDBUrl}/api/governate/${ctryname}`)
  }
  getCities(govName:string): Observable<Icity[]>{
    console.log(govName)
    return this.http.get<Icity[]>(`${environment.jDBUrl}/api/city/${govName}`)
  }
  getUserAddresses():Observable<Iaddress[]>{
    return this.http.get<Iaddress[]>(`${environment.jDBUrl}/api/address`)
  }
  getUserAddress(id:string):Observable<Iaddress>{
    return this.http.get<Iaddress>(`${environment.jDBUrl}/api/address/${id}`)
  }
  deleteUserAddresses(id:string):Observable<Iaddress[]>{
    return this.http.delete<Iaddress[]>(`${environment.jDBUrl}/api/address/${id}`)
  }
  addAddresses(adr:Iaddress):Observable<Iaddress[]>{
    return this.http.post<Iaddress[]>(`${environment.jDBUrl}/api/address`,adr,this.httpOptions)
  }
  EditAddresses(adr:Iaddress,id:string):Observable<Iaddress[]>{
    return this.http.put<Iaddress[]>(`${environment.jDBUrl}/api/address/${id}`,adr,this.httpOptions)
  }
  defaultAddress(id:string):Observable<Iaddress>{
    return this.http.put<Iaddress>(`${environment.jDBUrl}/api/address/default/${id}`,this.httpOptions)
  }
  getDefaultAddress():Observable<Iaddress>{
    return this.http.get<Iaddress>(`${environment.jDBUrl}/api/address/get/default`)
  }
}
