import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyReceivedOrdersComponent} from './my-received-orders/my-received-orders.component';
import {ShoppingCartViewComponent} from './shopping-cart/shopping-cart-view/shopping-cart-view.component';
import {MyReceivedOrdersResolverService} from './my-received-orders-resolver.service';
import {MySentOrdersResolverService} from './my-sent-orders-resolver.service';
import {MySentOrdersComponent} from './my-sent-orders/my-sent-orders.component';


const routes: Routes = [
  { path: 'my-orders/received', component: MyReceivedOrdersComponent, resolve: [MyReceivedOrdersResolverService]},
  { path: 'my-orders/sent', component: MySentOrdersComponent, resolve: [MySentOrdersResolverService]},
  { path: 'shopping-cart', component: ShoppingCartViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyOrdersRoutingModule{}
