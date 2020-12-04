import {Component, Input, OnInit} from '@angular/core';
import {WineryServiceDTO} from '../../winery.model';
import {animate, keyframes, query, stagger, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-my-wineries-item',
  templateUrl: './my-wineries-item.component.html',
  styleUrls: ['./my-wineries-item.component.css']
})
export class MyWineriesItemComponent implements OnInit {

  @Input() winery: WineryServiceDTO;

  constructor() {
  }

  ngOnInit(): void {
  }

}
