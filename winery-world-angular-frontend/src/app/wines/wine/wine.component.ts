import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {WineModel} from '../wine.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-wine',
  templateUrl: './wine.component.html',
  styleUrls: ['./wine.component.css']
})
export class WineComponent implements OnInit {
  @Input() wine: WineModel;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
  }

  leaveRating(rating: string): void{

  }
}
