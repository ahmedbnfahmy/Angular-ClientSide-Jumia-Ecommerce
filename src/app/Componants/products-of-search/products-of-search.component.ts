import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/Models/iproductCart';
import { ProductServicesService } from 'src/app/Services/productservices/product-services.service';

@Component({
  selector: 'app-products-of-search',
  templateUrl: './products-of-search.component.html',
  styleUrls: ['./products-of-search.component.scss']
})
export class ProductsOfSearchComponent {

  inputSearch: string

  products: Iproduct[]

  data = null


  constructor(private activatedRoute: ActivatedRoute, private prdservice: ProductServicesService) {

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.inputSearch = paramMap.get('srch');
    })

    if (this.inputSearch == "Fashion" || this.inputSearch == "fashion" || this.inputSearch == "clothes") {
      this.prdservice.getProductsByCategory("642c0a72ff89ab6980edd003").subscribe(data => {
        this.products = data
      })
    } else if (this.inputSearch == "Sports Supplies" || this.inputSearch == "sports supplies" || this.inputSearch == "sports") {
      this.prdservice.getProductsByCategory("642c1271ff89ab6980edd04a").subscribe(data => {
        this.products = data
      })
    } else if (this.inputSearch == "Houseware" || this.inputSearch == "houseware" || this.inputSearch == "home") {
      this.prdservice.getProductsByCategory("642c13f6ff89ab6980edd065").subscribe(data => {
        this.products = data
      })
    } else {
      this.prdservice.getProductsOfSearch(this.inputSearch).subscribe(data => {
        this.products = data
      })
    }

  }


  addToCart(id: any) {

    this.data = { items: { productId: id } }
    this.prdservice.addToUserCart(this.data).subscribe(data => {
      this.prdservice.getUserCart().subscribe(data => {
        this.prdservice.emit<number>(data[0].items.length);

      })
    })

  }
  



}
