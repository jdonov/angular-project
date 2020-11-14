import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Observable} from 'rxjs';
import {WineryModel} from '../winery.model';

@Component({
  selector: 'app-winery',
  templateUrl: './winery.component.html',
  styleUrls: ['./winery.component.css']
})
export class WineryComponent implements OnInit {

  winery: Observable<{ winery: WineryModel}>;

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.winery = this.store.select('winery');
  }

  editWinery(): void{
    this.router.navigate(['/my-wineries/winery/edit']);
  }

  registerWine(): void {
    this.router.navigate(['/my-wineries/winery/register-wine']);
  }

  leaveComment(): void {
    this.router.navigate(['/my-wineries/winery/comment']);
  }

  viewWines(): void {
    this.router.navigate(['/my-wineries/winery/wines']);
  }
}
