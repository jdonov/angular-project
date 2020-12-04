import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Observable, Subscription} from 'rxjs';
import {WineryServiceDTO} from '../winery.model';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterEditWineryService} from '../register-edit-winery/register-edit-winery.service';
import {animate, animateChild, keyframes, query, stagger, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-my-wineries',
  templateUrl: './my-wineries.component.html',
  styleUrls: ['./my-wineries.component.css'],
  animations: [
    trigger('stagger', [
      transition(':enter', [
        query(':enter', stagger('.3s', [animateChild()]))
      ])
    ]),
    trigger('listItems', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        query(':enter', [
          stagger(200, [
            animate('.5s ease-in', keyframes([
                style({
                  transform: 'translateX(-100px)',
                  opacity: 0,
                  offset: 0
                }),
                style({
                  transform: 'translateX(-75px)',
                  opacity: 0.25,
                  offset: 0.25
                }),
                style({
                  transform: 'translateX(-50px)',
                  opacity: 0.5,
                  offset: 0.5
                }),
                style({
                  transform: 'translateX(-25px)',
                  opacity: 0.75,
                  offset: 0.75
                }),
                style({
                  transform: 'translateX(0px)',
                  opacity: 1,
                  offset: 1
                })
              ])
            )
          ])
        ])
      ])
    ])
  ]
})
export class MyWineriesComponent implements OnInit, OnDestroy {
  wyWineries: Observable<WineryServiceDTO[]>;
  registerMode = false;
  isFormSentSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute, private router: Router, private registerEditService: RegisterEditWineryService) {
  }

  ngOnInit(): void {
    this.wyWineries = this.store.select(fromApp.selectMyWineries);
    this.isFormSentSubscription = this.registerEditService.isSent.subscribe((isSent) => isSent === true ? this.registerMode = !isSent : this.registerMode = false);
  }

  register(): void {
    this.registerMode = true;
    this.router.navigate([{outlets: {'wineries-outlet': 'register'}}], {relativeTo: this.route, queryParams: {register: 'true'}});
  }

  ngOnDestroy(): void {
    this.isFormSentSubscription.unsubscribe();
  }
}
