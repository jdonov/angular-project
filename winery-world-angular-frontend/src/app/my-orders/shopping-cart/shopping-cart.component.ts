import {Component, OnDestroy, OnInit} from '@angular/core';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  faShopping = faShoppingCart;
  items: number;
  itemsSubscription: Subscription;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.itemsSubscription = this.store.select('myOrders').subscribe(st => {
      this.items = st.shoppingCart.orderedWines.length;
    });
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }
}
