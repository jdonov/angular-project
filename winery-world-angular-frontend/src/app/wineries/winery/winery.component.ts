import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Observable, Subscription} from 'rxjs';
import {WineryDetailsServiceDTO} from '../winery.model';
import {WineService} from '../../wines/wine/wine.service';
import {RateWineStart} from '../store/wineries.actions';
import {map, withLatestFrom} from 'rxjs/operators';
import {RegisterEditWineryService} from '../register-edit-winery/register-edit-winery.service';
import {ResetComments} from '../../comments/store/comments.actions';

@Component({
  selector: 'app-winery',
  templateUrl: './winery.component.html',
  styleUrls: ['./winery.component.css']
})
export class WineryComponent implements OnInit, OnDestroy {
  isInMine: boolean;
  winery: Observable<{winery: WineryDetailsServiceDTO}>;
  wineryId: string;
  wineSubscription: Subscription;
  isMineSubscription: Subscription;
  isSentSubscription: Subscription;
  isLoading: boolean;

  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private wineService: WineService,
              private registerEditWineryService: RegisterEditWineryService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.wineryId = params.wineryId;
    });
    this.store.select(state => state.shared.loadChild).subscribe(loadChild => this.isLoading = loadChild);
    this.winery = this.store.select('allWineries');
    this.isMineSubscription = this.store.select(state => state.allWineries.winery).pipe(
      withLatestFrom(this.store.select(state => state.auth.user)),
      map(([winery, user]) => {
        return {owner: winery.owner, user: user.username};
      })
    ).subscribe((data) => this.isInMine = data.owner === data.user);

    this.wineSubscription = this.wineService.wineRate.subscribe(w => {
      this.store.dispatch(new RateWineStart({rating: w.rating, wineId: w.wineId, wineryId: this.wineryId}));
    });

  }

  editWinery(): void{
    this.router.navigate(['/wineries', this.wineryId, 'edit'], {fragment: 'winery-register-edit'});
  }

  registerWine(): void {
    this.router.navigate(['/wineries', this.wineryId, 'register-wine']);
  }

  viewComments(): void {
    this.router.navigate(['/wineries', this.wineryId, 'comments']);
  }

  viewWines(): void {
    this.router.navigate(['/wineries', this.wineryId, 'wines'], {queryParams: {author: this.isInMine}});
  }

  ngOnDestroy(): void {
    this.wineSubscription.unsubscribe();
    this.isMineSubscription.unsubscribe();
    this.store.dispatch(new ResetComments());
  }
}
