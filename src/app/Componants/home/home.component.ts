import { ProductService } from './../../Services/product/product.service';
import { IProduct } from './../../Models/iproduct';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentLang: string =localStorage.getItem('current_lang') || 'en'; 


    productList: IProduct[] = [];
    childFashions:IProduct[] = [];
    homeAppliances:IProduct[] = [];
    womenSprtswear:IProduct[] = [];

    constructor(private prodService: ProductService, private router: Router) { }

    ngOnInit(): void {
        this.prodService.getAllProducts("642c0aaaff89ab6980edd00a").subscribe((data) => {
            this.childFashions = data
        })
        this.prodService.getAllProducts("642c141aff89ab6980edd06a").subscribe((data) => {
            this.homeAppliances = data
        })
        this.prodService.getAllProducts("642c131dff89ab6980edd05e").subscribe((data) => {
            this.womenSprtswear = data
        })
    }


    ProductDetails(prodId: string){
        this.router.navigate(['products',prodId])
    }
}
