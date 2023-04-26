import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Componants/home/home.component';
import { NotFoundComponent } from './Componants/not-found/not-found.component';
import { UserCartComponent } from './Componants/user-cart/user-cart.component';
import { HelpCenterComponent } from './Componants/help-center/help-center.component';
import { UseraccountComponent } from './Componants/useraccount/useraccount.component';
import { AccountoverviewComponent } from './accountoverview/accountoverview.component';
import { CategProductsComponent } from './Componants/categ-products/categ-products.component';
import { SubCategProductsComponent } from './Componants/sub-categ-products/sub-categ-products.component';
import { AboutusComponent } from './Componants/aboutus/aboutus.component';
import { EditaccountComponent } from './Componants/editaccount/editaccount.component';
import { ProductDetailsComponent } from './Componants/product-details/product-details.component';
import { ProductsOfSearchComponent } from './Componants/products-of-search/products-of-search.component';
import { UserAuthGuard } from './Componants/user/user-auth.guard';
import { WishListComponent } from './Componants/wish-list/wish-list.component';
import { PaymentMethodComponent } from './Componants/payment-method/payment-method.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'products/:prodId', component: ProductDetailsComponent },
  { path: 'cart', component: UserCartComponent , canActivate:[UserAuthGuard] },
  { path: 'help', component: HelpCenterComponent , title:'HelpCenter' },
  {path:'about',component:AboutusComponent,title:'ABOUTUS'},
  {path:"search/:srch",component:ProductsOfSearchComponent},
  {
    path: 'useraccount', component: UseraccountComponent , children: [
      { path: 'accountoverview', component: AccountoverviewComponent, title:"My account" },
      {path:'edituser',component:EditaccountComponent,title:"EditProfile"}
    ]
  },
  {
    path: 'User',
    loadChildren: () => import('./Componants/user/user.module').then(m => m.UserModule)
  },
  { path: 'category/:id', component: CategProductsComponent , canActivate:[UserAuthGuard] },
  { path: 'subcategory/:id', component: SubCategProductsComponent , canActivate:[UserAuthGuard] },
  { path: 'wichList', component: WishListComponent , canActivate:[UserAuthGuard] },
  { path: 'payment', component: PaymentMethodComponent , canActivate:[UserAuthGuard] }

];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
