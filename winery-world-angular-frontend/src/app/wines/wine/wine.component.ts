import {Component, ComponentFactoryResolver, ElementRef, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {WineServiceDTO} from '../wine.model';

import {WineService} from './wine.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { OrderWineView} from '../../my-orders/my-orders.model';
import {AddWineToOrder} from '../../my-orders/store/my-orders.actions';
import {WineAddedAlertComponent} from '../wine-added-alert/wine-added-alert.component';
import {PlaceholderDirective} from '../../shared/placeholder.directive';
import {tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-wine',
  templateUrl: './wine.component.html',
  styleUrls: ['./wine.component.css']
})
export class WineComponent implements OnInit, OnDestroy {
  @Input() wine: WineServiceDTO;
  @Input() isMine: boolean;
  @Input() wineryName: string;
  editMode = false;
  @ViewChild('quantity') quantity: ElementRef;
  @ViewChild(PlaceholderDirective) placeholder: PlaceholderDirective;
  closeSubscription: Subscription;

  constructor(private wineService: WineService, private router: Router,
              private route: ActivatedRoute, private store: Store<fromApp.AppState>,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  leaveRating(rating: string): void {
    this.wineService.wineRate.next({rating, wineId: this.wine.id});
  }
  editWine(): void{
    this.editMode = !this.editMode;
  }

  deleteWine(): void {
    this.wineService.deleteWine(this.wine.id);
    this.router.navigate(['../', 'wines'], {relativeTo: this.route});
  }

  addToCaret(): void {
    const wine: OrderWineView = {
      id: this.wine.id,
      quantity: Number(this.quantity.nativeElement.value),
      name: this.wine.name,
      wineryName: this.wineryName,
      price: this.wine.price
    };
    this.quantity.nativeElement.value = '';
    const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(WineAddedAlertComponent);
    const hostViewContainerRef = this.placeholder.viewContainerRef;
    hostViewContainerRef.clear();
    const wineAlertComp = hostViewContainerRef.createComponent(alertCompFactory);
    wineAlertComp.instance.wineName = this.wine.name;
    wineAlertComp.instance.quantity = wine.quantity;
    wineAlertComp.instance.choiceType = this.choiceType();
    this.closeSubscription = wineAlertComp.instance.close.pipe(tap((event) => {
      hostViewContainerRef.clear();
      wineAlertComp.destroy();
    })).subscribe();
    this.store.dispatch(new AddWineToOrder(wine));
  }

  choiceType(): string {
    switch (this.wine.rating) {
      case 'NOT_RATED':
      case 'VERY_BAD':
        return 'Interesting';
      case 'POOR':
        return 'Not bad';
      case 'OK':
        return 'Nice';
      case 'GOOD':
        return 'Good';
      case 'EXCELLENT':
        return 'Excellent';
    }
  }

  ngOnDestroy(): void {
    if(this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

}
