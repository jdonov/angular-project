import {Component, Input, OnInit} from '@angular/core';
import {WineInterface} from '../wine-interface';

@Component({
  selector: 'app-wine',
  templateUrl: './wine.component.html',
  styleUrls: ['./wine.component.css']
})
export class WineComponent implements OnInit {
  @Input() wine: WineInterface;
  constructor() { }

  ngOnInit(): void {
  }
}
