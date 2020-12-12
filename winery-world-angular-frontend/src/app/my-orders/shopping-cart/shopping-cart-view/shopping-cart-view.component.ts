import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AddressUserBindingDTO, OrderWineView} from '../../my-orders.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import {map} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as AllMyOrdersActions from '../../store/my-orders.actions';
import {EditOrder} from '../../store/my-orders.actions';

@Component({
  selector: 'app-shopping-cart-view',
  templateUrl: './shopping-cart-view.component.html',
  styleUrls: ['./shopping-cart-view.component.css']
})
export class ShoppingCartViewComponent implements OnInit {
  orders: Observable<OrderWineView[]>;
  deliveryAddressForm: FormGroup;
  enterAddress = true;
  totalOrderPrice: number;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.orders = this.store.select('myOrders').pipe(
      map(st => st.shoppingCart.orderedWines)
    );
    this.deliveryAddressForm = new FormGroup({
      'city': new FormControl(null, Validators.required),
      'street': new FormControl(null, Validators.required)
    });
    this.orders.subscribe(orders => {
      this.totalOrderPrice = orders.map(o => o.quantity * o.price).reduce((acc, currValue) => acc + currValue, 0);
    });
  }

  submitForm(): void {
    const userAddress: AddressUserBindingDTO = {
      ...this.deliveryAddressForm.value
    };
    this.store.dispatch(new AllMyOrdersActions.SetReceiverAddressStart(userAddress));
    this.enterAddress = false;
  }

  sendOrder(): void {
    this.store.dispatch(new AllMyOrdersActions.SendOrderStart());
  }

  editAddress(): void {
    this.enterAddress = true;
  }
  onClose(id: string): void {
    this.store.dispatch(new EditOrder(id));
  }
}
