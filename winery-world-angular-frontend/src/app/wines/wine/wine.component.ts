import {Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {WineServiceDTO} from '../wine.model';

import {WineService} from './wine.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {OrderWineBindingDTO, OrderWineView} from '../../my-orders/my-orders.model';
import {AddWineToOrder} from '../../my-orders/store/my-orders.actions';

@Component({
  selector: 'app-wine',
  templateUrl: './wine.component.html',
  styleUrls: ['./wine.component.css']
})
export class WineComponent implements OnInit {
  @Input() wine: WineServiceDTO;
  @Input() isMine: boolean;
  @Input() wineryName: string;
  editMode = false;
  @ViewChild('quantity') quantity: ElementRef;

  constructor(private wineService: WineService, private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

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
      wineryName: this.wineryName
    };
    this.store.dispatch(new AddWineToOrder(wine));
  }
}
