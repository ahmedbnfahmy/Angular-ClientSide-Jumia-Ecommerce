import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Componants/header/header.component';
import { FooterComponent } from './Componants/footer/footer.component';
import { SideBarComponent } from './Componants/side-bar/side-bar.component';
import { HomeComponent } from './Componants/home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorProvider } from './auth.interceptor';
import { UseraccountComponent } from './Componants/useraccount/useraccount.component';
import { HelpCenterComponent } from './Componants/help-center/help-center.component';
import { AccountoverviewComponent } from './accountoverview/accountoverview.component';
import { UserCartComponent } from './Componants/user-cart/user-cart.component';
import { SubCategProductsComponent } from './Componants/sub-categ-products/sub-categ-products.component';
import { CategProductsComponent } from './Componants/categ-products/categ-products.component';
import { AboutusComponent } from './Componants/aboutus/aboutus.component';
import { EditaccountComponent } from './Componants/editaccount/editaccount.component';
import { ProductDetailsComponent } from './Componants/product-details/product-details.component';
import { ProductsOfSearchComponent } from './Componants/products-of-search/products-of-search.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { WishListComponent } from './Componants/wish-list/wish-list.component';
import { PaymentMethodComponent } from './Componants/payment-method/payment-method.component';

export function createTranslateloader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/','.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    HomeComponent,
    UseraccountComponent,
    HelpCenterComponent,
    AccountoverviewComponent,
    UserCartComponent,
    SubCategProductsComponent,
    CategProductsComponent,
    AboutusComponent,
    EditaccountComponent,
    ProductDetailsComponent,
    ProductsOfSearchComponent,
    WishListComponent,
    PaymentMethodComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateloader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
