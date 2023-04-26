import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from 'src/app/Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(subCatId:string): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.jDBUrl}/api/products/subcat/${subCatId}`)
  }

  getProductById(prodId: string): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${environment.jDBUrl}/api/products/${prodId}`)
  }
}