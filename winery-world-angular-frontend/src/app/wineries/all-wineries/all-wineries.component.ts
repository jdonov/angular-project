import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {WineryServiceDTO} from '../winery.model';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-all-wineries',
  templateUrl: './all-wineries.component.html',
  styleUrls: ['./all-wineries.component.css']
})
export class AllWineriesComponent implements OnInit {
  wineries: Observable<{wineries: WineryServiceDTO[]}>;
  // isLoading: boolean;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    // this.store.select(state => state.shared.loading).subscribe(loading => this.isLoading = loading);
    this.wineries = this.store.select('allWineries');
  }

}
