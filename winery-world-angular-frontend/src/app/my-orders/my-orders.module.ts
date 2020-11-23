import {NgModule} from '@angular/core';
import {MyOrdersComponent} from './my-orders.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {ShoppingCartViewComponent} from './shopping-cart/shopping-cart-view/shopping-cart-view.component';
import {SharedModule} from '../shared/shared.module';
import {MyOrdersRoutingModule} from './my-orders-routing.module';


@NgModule({
  declarations: [
    MyOrdersComponent,
    ShoppingCartComponent,
    ShoppingCartViewComponent
  ],
  imports: [MyOrdersRoutingModule, SharedModule],
  exports: [MyOrdersComponent, ShoppingCartComponent, ShoppingCartViewComponent]
})
export class MyOrdersModule {}
