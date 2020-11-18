import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Observable, Subscription} from 'rxjs';
import {WineryDetailsServiceDTO} from '../winery.model';
import {WineService} from '../../wines/wine/wine.service';
import {RateWineStart} from '../store/wineries.actions';

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

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute, private router: Router, private wineService: WineService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.wineryId = params.wineryId;
    });

    this.winery = this.store.select('allWineries');
    this.isInMine = true;

    this.wineSubscription = this.wineService.wineRate.subscribe(w => {
      this.store.dispatch(new RateWineStart({rating: w.rating, wineId: w.wineId, wineryId: this.wineryId}));
    });
  }

  editWinery(): void{
    this.router.navigate(['/my-wineries', this.wineryId, 'edit']);
  }

  registerWine(): void {
    this.router.navigate(['/my-wineries', this.wineryId, 'register-wine']);
  }

  leaveComment(): void {
    this.router.navigate(['/my-wineries', this.wineryId, 'comment']);
  }

  viewWines(): void {
    this.router.navigate(['/my-wineries', this.wineryId, 'wines']);
  }

  ngOnDestroy(): void {
    this.wineSubscription.unsubscribe();
  }
}
