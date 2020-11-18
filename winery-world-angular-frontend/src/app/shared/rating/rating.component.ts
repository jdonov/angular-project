import {Component, Input, OnInit} from '@angular/core';
import { faWineGlassAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  faStar = faWineGlassAlt;
  ratingMap = ['VERY_BAD', 'POOR', 'OK', 'GOOD', 'EXCELLENT'];
  @Input() initRating: string;
  ratings = [0, 1, 2, 3, 4];
  @Input() selected: number;
  hover: number;

  constructor() { }
  ngOnInit(): void {
    this.hover = this.selected = this.ratingMap.indexOf(this.initRating);
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

  getRate(): string {
    return this.ratingMap[this.selected];
  }

}
