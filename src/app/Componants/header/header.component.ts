import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ProductServicesService } from 'src/app/Services/productservices/product-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartProducts: any;
  subscription!: Subscription;
  len: number = 0
  currentLang: string =localStorage.getItem('current_lang') || 'en'; 
  // translate: TranslateService;
  constructor(private prdservice: ProductServicesService, public translate:TranslateService , private router:Router) {
    this.currentLang = localStorage.getItem('current_lang') || 'en';
    this.translate.use(this.currentLang)
  }
  ngOnInit(): void {
    this.subscription = this.prdservice.getUserCart().subscribe(data => {
      this.cartProducts = data[0];
    })

    this.subscription = this.prdservice.getUserCart().subscribe(data => {
      data[0].items.length
      this.prdservice.emit<number>(data[0].items.length);
    })
    this.prdservice.on<number>().subscribe(data => {
      this.len = data
    })

  }

  changeCurrentLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('current_lang', lang);
    this.currentLang = lang;
    window.location.reload()

  }

  searchInput(input:string){

    this.router.navigate(["search/"+input])
    
  
  }

}
