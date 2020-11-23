import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {ShoppingCartViewComponent} from './header/shopping-cart/shopping-cart-view/shopping-cart-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'auth', component: AuthComponent },
  { path: 'my-orders', component: MyOrdersComponent},
  { path: 'shopping-cart', component: ShoppingCartViewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
