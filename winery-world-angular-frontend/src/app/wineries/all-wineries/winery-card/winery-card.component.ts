import {Component, Input, OnInit} from '@angular/core';
import {WineryServiceDTO} from '../../winery.model';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-winery-card',
  templateUrl: './winery-card.component.html',
  styleUrls: ['./winery-card.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({transform: 'rotate(0)'})),
      state('rotated', style({transform: 'rotate(0)'})),
      transition('default => rotated', animate(300, keyframes([
        style({transform: 'rotate(-3deg)', offset: 0.25}),
        style({transform: 'rotate(0)', offset: 0.5}),
        style({transform: 'rotate(+3deg)', offset: 0.75}),
        style({transform: 'rotate(0)', offset: 1}),
      ])))
    ])
  ]
})
export class WineryCardComponent implements OnInit {

  @Input() winery: WineryServiceDTO;
  stateRotate = 'default';

  constructor() { }

  ngOnInit(): void {
  }

  rotate(): void {
    this.stateRotate = (this.stateRotate === 'default' ? 'rotated' : 'default');
  }

}
