import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyOrdersComponent} from './my-orders.component';
import {ShoppingCartViewComponent} from './shopping-cart/shopping-cart-view/shopping-cart-view.component';


const routes: Routes = [
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'shopping-cart', component: ShoppingCartViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyOrdersRoutingModule{}
