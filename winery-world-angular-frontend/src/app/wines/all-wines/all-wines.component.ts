import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Observable, Subscription} from 'rxjs';
import {WineryDetailsServiceDTO, WineryServiceDTO} from '../../wineries/winery.model';
import {ActivatedRoute, Router} from '@angular/router';
import {map, withLatestFrom} from 'rxjs/operators';


@Component({
  selector: 'app-all-wines',
  templateUrl: './all-wines.component.html',
  styleUrls: ['./all-wines.component.css']
})
export class AllWinesComponent implements OnInit {

  winery: Observable<{winery: WineryDetailsServiceDTO}>;
  isInMine: boolean;
  isMineSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    this.winery = this.store.select('allWineries');
    this.isMineSubscription = this.store.select(state => state.allWineries.winery).pipe(
      withLatestFrom(this.store.select(state => state.auth.user)),
      map(([winery, user]) => {
        return {owner: winery.owner, user: user.username};
      })
    ).subscribe((data) => this.isInMine = data.owner === data.user);
  }
}
