import {Component, Input, OnInit, Output} from '@angular/core';
import {OrderWineView} from '../../../my-orders.model';
import {Subject} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.css'],
  animations: [
    trigger('wildState', [
      state('normal', style({
        transform: 'translateX(0) scale(1)',
        opacity: 1
      })),
      state('shrunken', style({
        transform: 'translateX(0) scale(0)'
      })),
      transition('normal => shrunken', [
        animate(1000, style({
          borderRadius: '50px',
          transform: 'translateX(+500px)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class ShoppingCartItemComponent implements OnInit {
  @Input() order: OrderWineView;
  @Output() edit = new Subject<string>();
  wildState = 'normal';
  constructor() { }

  ngOnInit(): void {
  }

  onEdit(): void {
    this.wildState = 'shrunken';
    setTimeout(() => this.edit.next(this.order.id), 1000);
  }

}
