import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {OrderWineView} from '../../../my-orders/my-orders.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import {map} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-shopping-cart-view',
  templateUrl: './shopping-cart-view.component.html',
  styleUrls: ['./shopping-cart-view.component.css']
})
export class ShoppingCartViewComponent implements OnInit {
  orders: Observable<OrderWineView[]>;
  deliveryAddressForm: FormGroup;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.orders = this.store.select('order').pipe(
      map(st => st.orderedWines)
    );
    this.deliveryAddressForm = new FormGroup({
      'city': new FormControl(null, Validators.required),
      'street': new FormControl(null, Validators.required)
    });
  }

  submitForm(): void {

  }
}
