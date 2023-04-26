import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductService } from 'src/app/Services/product/product.service';
import { ProductServicesService } from 'src/app/Services/productservices/product-services.service';
import { WishListService } from 'src/app/Services/wichList/wish-list.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct | undefined = undefined;
  prodId: string;
  stok: number = 9;
  endpoint: any;

  data = null
  data2 = null

  constructor(private activatedRoute: ActivatedRoute, private toastr: ToastrService, private prodService: ProductService, private prdservice: ProductServicesService, private wishList: WishListService) {
    this.endpoint = environment.jDBUrl
  }
  ngOnInit(): void {
    this.productDetails()
  }


  productDetails() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.prodId = paramMap.get('prodId');
      this.prodService.getProductById(this.prodId).subscribe((prod) => {
        this.product = prod;
      })
    })
  }


  addToCart(id: any) {

    this.data = { items: { productId: id } }
    this.prdservice.addToUserCart(this.data).subscribe(data => {
      this.prdservice.getUserCart().subscribe(data => {
        this.prdservice.emit<number>(data[0].items.length);

      })
    })

  }


  addToWishLIst(prdId: any) {
    this.data2 = { items: { productId: prdId } }
    this.wishList.addUserToWichList(this.data2).subscribe(data => {
      if (data) {
        this.toastr.success("item add successfuly..")
        
      }
      
    })
    this.toastr.error("item is alredy add ...!")

  }
}