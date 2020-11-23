import {NgModule} from '@angular/core';
import {MyOrdersComponent} from './my-orders.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {ShoppingCartViewComponent} from './shopping-cart/shopping-cart-view/shopping-cart-view.component';
import {SharedModule} from '../shared/shared.module';
import {MyOrdersRoutingModule} from './my-orders-routing.module';
import { MySentOrdersComponent } from './my-sent-orders/my-sent-orders.component';
import { OrderComponent } from './order/order.component';


@NgModule({
  declarations: [
    MyOrdersComponent,
    ShoppingCartComponent,
    ShoppingCartViewComponent,
    MySentOrdersComponent,
    OrderComponent
  ],
  imports: [MyOrdersRoutingModule, SharedModule],
  exports: [MyOrdersComponent, ShoppingCartComponent, ShoppingCartViewComponent]
})
export class MyOrdersModule {}
