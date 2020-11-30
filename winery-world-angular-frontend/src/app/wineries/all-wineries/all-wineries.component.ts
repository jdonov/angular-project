import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {WineryServiceDTO} from '../winery.model';
import {Observable} from 'rxjs';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-all-wineries',
  templateUrl: './all-wineries.component.html',
  styleUrls: ['./all-wineries.component.css']
})

export class AllWineriesComponent implements OnInit {
  wineries: Observable<{ wineries: WineryServiceDTO[] }>;
  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.wineries = this.store.select('allWineries');
  }
}
