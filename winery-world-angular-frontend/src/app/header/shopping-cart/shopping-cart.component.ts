import { Component, OnInit } from '@angular/core';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  faShopping = faShoppingCart;
  items: number;
  constructor() { }

  ngOnInit(): void {
    this.items = 0;
  }

}
