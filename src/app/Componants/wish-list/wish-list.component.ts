import { ProductServicesService } from 'src/app/Services/productservices/product-services.service';
import { WishListService } from './../../Services/wichList/wish-list.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  prodList = []

  data = null


  constructor(private toastr: ToastrService,private WishList: WishListService, private prdServe: ProductServicesService) {

  }


  ngOnInit(): void {
    this.getUserWichLIst()
  }

  getUserWichLIst() {
    this.WishList.getUserWichLists().subscribe(data => {
      this.prodList = data[0].items
    })

  }

  addToCart(id: any) {

    this.data = { items: { productId: id } }
    this.prdServe.addToUserCart(this.data).subscribe(data => {
      this.prdServe.getUserCart().subscribe(data => {
        this.prdServe.emit<number>(data[0].items.length);

      })
    })

  }


  removFromWishLIst(prdId: string) {
    this.WishList.deleteProductFromWishList(prdId).subscribe(data=>{
      this.getUserWichLIst()
      this.toastr.success('item removed successfully..');

    })
  }

}
