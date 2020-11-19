import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Observable, Subscription} from 'rxjs';
import {WineryServiceDTO} from '../winery.model';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterEditWineryService} from '../register-edit-winery/register-edit-winery.service';


@Component({
  selector: 'app-my-wineries',
  templateUrl: './my-wineries.component.html',
  styleUrls: ['./my-wineries.component.css']
})
export class MyWineriesComponent implements OnInit, OnDestroy {
  wyWineries: Observable<WineryServiceDTO[]>;
  registerMode = false;
  isFormSentSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute, private router: Router, private registerEditService: RegisterEditWineryService) {
  }

  ngOnInit(): void {
    this.wyWineries = this.store.select(fromApp.selectMyWineries);
    this.isFormSentSubscription = this.registerEditService.isSent.subscribe((data) => this.registerMode = !data);
  }

  register(): void {
    this.registerMode = true;
    this.router.navigate(['register'], {relativeTo: this.route, queryParams: {register: 'true'} });
  }

  ngOnDestroy(): void {
    this.isFormSentSubscription.unsubscribe();
  }



}
