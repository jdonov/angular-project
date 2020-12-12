import {NgModule} from '@angular/core';
import {MyReceivedOrdersComponent} from './my-received-orders/my-received-orders.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {ShoppingCartViewComponent} from './shopping-cart/shopping-cart-view/shopping-cart-view.component';
import {SharedModule} from '../shared/shared.module';
import {MyOrdersRoutingModule} from './my-orders-routing.module';
import { MySentOrdersComponent } from './my-sent-orders/my-sent-orders.component';
import { OrderComponent } from './order/order.component';
import { ShoppingCartItemComponent } from './shopping-cart/shopping-cart-view/shopping-cart-item/shopping-cart-item.component';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    ShoppingCartViewComponent,
    MyReceivedOrdersComponent,
    MySentOrdersComponent,
    OrderComponent,
    ShoppingCartItemComponent
  ],
  imports: [MyOrdersRoutingModule, SharedModule],
  exports: [MyReceivedOrdersComponent, MySentOrdersComponent, ShoppingCartViewComponent, ShoppingCartComponent, OrderComponent]
})
export class MyOrdersModule {}
