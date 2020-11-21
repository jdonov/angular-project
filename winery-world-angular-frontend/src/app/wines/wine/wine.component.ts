import {Component, Input, OnInit} from '@angular/core';
import {WineServiceDTO} from '../wine.model';

import {WineService} from './wine.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wine',
  templateUrl: './wine.component.html',
  styleUrls: ['./wine.component.css']
})
export class WineComponent implements OnInit {
  @Input() wine: WineServiceDTO;
  @Input() isMine: boolean;
  constructor(private wineService: WineService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  leaveRating(rating: string): void {
    this.wineService.wineRate.next({rating, wineId: this.wine.id});
  }
  editWine(): void{

  }

  deleteWine(): void {
    this.wineService.deleteWine(this.wine.id);
    this.router.navigate(['../', 'wines'], {relativeTo: this.route});
  }
}
