import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyReceivedOrdersComponent} from './my-received-orders/my-received-orders.component';
import {ShoppingCartViewComponent} from './shopping-cart/shopping-cart-view/shopping-cart-view.component';
import {MyReceivedOrdersResolverService} from './my-received-orders-resolver.service';
import {MySentOrdersResolverService} from './my-sent-orders-resolver.service';
import {MySentOrdersComponent} from './my-sent-orders/my-sent-orders.component';
import {AuthGuard} from '../auth/auth.guard';


const routes: Routes = [
  { path: 'my-orders/received', canActivate: [AuthGuard], component: MyReceivedOrdersComponent, resolve: [MyReceivedOrdersResolverService]},
  { path: 'my-orders/sent', canActivate: [AuthGuard], component: MySentOrdersComponent, resolve: [MySentOrdersResolverService]},
  { path: 'shopping-cart', canActivate: [AuthGuard], component: ShoppingCartViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyOrdersRoutingModule{}
