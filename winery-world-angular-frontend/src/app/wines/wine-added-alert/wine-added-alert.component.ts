import {Component, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-wine-added-alert',
  templateUrl: './wine-added-alert.component.html',
  styleUrls: ['./wine-added-alert.component.css']
})
export class WineAddedAlertComponent implements OnInit {

  @Input() quantity: number;
  @Input() wineName: string;
  @Output() close = new Subject<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.close.next(true);
  }

}
