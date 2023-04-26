import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/Models/iproductCart';
import { ProductServicesService } from 'src/app/Services/productservices/product-services.service';

@Component({
  selector: 'app-categ-products',
  templateUrl: './categ-products.component.html',
  styleUrls: ['./categ-products.component.scss']
})
export class CategProductsComponent implements OnInit {

  currentLang: string =localStorage.getItem('current_lang') || 'en'; 


  cate: string = "";
  Products: Iproduct[] = [];

  data = null


  constructor(private activatedRoute: ActivatedRoute, private prdServe: ProductServicesService, private router: Router) {

  }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (paramMap) => {
        this.cate = String(paramMap.get('id'))

        this.prdServe.getProductsByCategory(this.cate).subscribe(products => {
          this.Products = products;
          console.log(this.Products)
        })

      })
  }


  ProductDetails(prodId: string) {
    this.router.navigate(['products', prodId])
  }



  addToCart(id: any) {

    this.data = { items: { productId: id } }
    this.prdServe.addToUserCart(this.data).subscribe(data => {
      this.prdServe.getUserCart().subscribe(data => {
        this.prdServe.emit<number>(data[0].items.length);

      })
    })

  }

}
