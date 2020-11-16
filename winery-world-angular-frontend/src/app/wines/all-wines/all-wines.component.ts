import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Observable} from 'rxjs';
import {WineryDetailsServiceDTO, WineryServiceDTO} from '../../wineries/winery.model';


@Component({
  selector: 'app-all-wines',
  templateUrl: './all-wines.component.html',
  styleUrls: ['./all-wines.component.css']
})
export class AllWinesComponent implements OnInit {

  winery: Observable<{winery: WineryDetailsServiceDTO}>;

  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    this.winery = this.store.select('allWineries');
  }

}
