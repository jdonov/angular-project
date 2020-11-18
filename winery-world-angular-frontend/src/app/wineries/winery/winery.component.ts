import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Observable} from 'rxjs';
import {WineryDetailsServiceDTO} from '../winery.model';

@Component({
  selector: 'app-winery',
  templateUrl: './winery.component.html',
  styleUrls: ['./winery.component.css']
})
export class WineryComponent implements OnInit {
  isInMine: boolean;
  winery: Observable<{winery: WineryDetailsServiceDTO}>;
  wineryId: string;

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.wineryId = params.wineryId;
    });

    this.winery = this.store.select('allWineries');
    this.isInMine = true;
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
}
