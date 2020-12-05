import {Component, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-wine-added-alert',
  templateUrl: './wine-added-alert.component.html',
  styleUrls: ['./wine-added-alert.component.css'],
  animations: [
    trigger('wildState', [
      state('normal', style({
        transform: 'translateX(0) scale(1)',
        opacity: 1
      })),
      state('shrunken', style({
        transform: 'translateX(0) scale(0)'
      })),
      transition('void => *', [
        style({
          borderRadius: '50px',
          transform: 'translateX(-500px)',
          opacity: 0
        }),
        animate(1000)
      ]),
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
export class WineAddedAlertComponent implements OnInit {

  @Input() quantity: number;
  @Input() wineName: string;
  @Input() choiceType: string;
  @Output() close = new Subject<boolean>();
  wildState = 'normal';

  constructor() { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.wildState = 'shrunken';
    setTimeout(() => this.close.next(true), 1000);
  }
}
