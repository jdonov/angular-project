import {Component, Input, OnInit} from '@angular/core';
import {OrderServiceDTO} from '../my-orders.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() order: OrderServiceDTO;
  @Input() received: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
