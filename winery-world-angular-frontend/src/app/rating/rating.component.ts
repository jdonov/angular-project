import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  faStar = faStar;
  ratings = [0, 1, 2, 3, 4];
  selected: number;
  hover: number;

  constructor() { }
  ngOnInit(): void {
    this.selected = -1;
    this.hover = this.selected;
  }
  changeColor(rate: number): void {
    this.hover = rate;
  }

  initRate(): void {
    this.hover = this.selected;
  }

  selectRate(rate: number): void{
    this.selected = rate;
    this.hover = this.selected;
  }

}
