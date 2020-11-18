import {Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {WineServiceDTO, WineRate} from '../wine.model';
import {Subject} from 'rxjs';
import {WineService} from './wine.service';

@Component({
  selector: 'app-wine',
  templateUrl: './wine.component.html',
  styleUrls: ['./wine.component.css']
})
export class WineComponent implements OnInit {
  @Input() wine: WineServiceDTO;

  constructor(private wineService: WineService) { }

  ngOnInit(): void {
  }

  leaveRating(rating: string): void {
    this.wineService.wineRate.next({rating, wineId: this.wine.id});
  }
}
