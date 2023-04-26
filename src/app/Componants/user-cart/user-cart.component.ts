import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Icart } from 'src/app/Models/icart';
import { ProductServicesService } from 'src/app/Services/productservices/product-services.service';
import { CommonModule } from '@angular/common'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit, OnChanges {
  [x: string]: any;
  cartProducts: Icart;
  subscription!: Subscription;
  endpoint: any;
  totalPriceCart: number = 0;
  len: number = 0
  constructor(private prdservice: ProductServicesService, private router: Router) {
    this.endpoint = environment.jDBUrl

  }
  ngOnChanges(changes: SimpleChanges): void {
    //var countInstock=cartProducts..productId.countInStock
  }
  ngOnInit(): void {
    //this.cartProducts=this.prdservice.getUserCart(this.userId);
    // this.subscription = this.prdservice.getUserCart().subscribe(data => {
    //   console.log('user data is *********> ', data);
    //   this.cartProducts = data[0];
    //   this.cartProducts?.items?.map((item) => {
    //     this.totalPriceCart = this.totalPriceCart + (item.productId.price * item.quantity)
    //   })
    //   console.log('user data is --------> ', this.cartProducts);
    // })
    this.getCard()


  }

  private getCartProducts() {

    this.subscription = this.prdservice.getUserCart().subscribe(data => {
      this.cartProducts = data;
    })

  }


  increaseQuantity(cartId: any, productId: any) {
    this.prdservice.increaseQuantity(cartId, productId).subscribe(data => {
      this.getCard()
    })
  }
  decreaseQuantity(cartId: any, productId: any) {
    this.prdservice.decreaseQuantity(cartId, productId).subscribe(data => {
      this.getCard()
    })
  }


  onDeleteItem(cartId: any, prodId: any) {
    console.log(prodId)
    this.prdservice.deleteItemFromCart(cartId, prodId).subscribe(data => {
      this.getCard()
    })

  }


  getCard(): void {
    this.totalPriceCart = 0
    this.subscription = this.prdservice.getUserCart().subscribe(data => {
      console.log('user data is *********> ', data);
      this.len = data[0].items.length
      this.prdservice.emit<number>(this.len);
      this.cartProducts = data[0];
      this.cartProducts?.items?.map((item) => {
        this.totalPriceCart = this.totalPriceCart + (item.productId.price * item.quantity)
      })
      console.log('user data is --------> ', this.cartProducts);
    })
  }


  onCheckout(): void {
    this.router.navigate(["User/addAddress"])
  }


}
