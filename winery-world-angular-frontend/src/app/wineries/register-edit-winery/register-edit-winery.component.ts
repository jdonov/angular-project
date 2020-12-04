import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterEditWineryService} from './register-edit-winery.service';
import {WineryDetailsServiceDTO, WineryRegisterBindingDTO} from '../winery.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-register-edit-winery',
  templateUrl: './register-edit-winery.component.html',
  styleUrls: ['./register-edit-winery.component.css']
})
export class RegisterEditWineryComponent implements OnInit {
  regions = ['SELECT_REGION', 'NORTH_WESTERN', 'NORTH_CENTRAL', 'NORTH_EASTERN', 'SOUTH_WESTERN', 'SOUTH_CENTRAL', 'SOUTH_EASTERN'];
  wineryForm: FormGroup;
  selectedOption: string;
  isRegisterMode = false;
  winerySubscription: Subscription;
  winery: Observable<WineryDetailsServiceDTO>;
  wineryId: string;
  isSentSubscription: Subscription;
  error: string;

  constructor(private route: ActivatedRoute, private router: Router, private registerEditService: RegisterEditWineryService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.isRegisterMode = !!params.register);
    this.store.select(state => state.allWineries.wineryError).subscribe(err => this.error = err);
    // this.isSentSubscription = this.registerEditService.isSent.subscribe(isSent => {
    //   if (isSent) {
    //     this.router.navigate(['../'], {relativeTo: this.route, fragment: 'top'});
    //   }
    // });
    this.wineryForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'address': new FormGroup({
        'region': new FormControl(null, Validators.required),
        'city': new FormControl(null, Validators.required),
        'street': new FormControl(null, Validators.required)
      }),
      'description': new FormControl(null, Validators.required),
      'imageUrl': new FormControl(null, Validators.required)
    });
    if (!this.isRegisterMode) {
      this.winery = this.store.select(state => state.allWineries.winery);
      this.winerySubscription = this.winery.subscribe((winery) => {
          this.wineryForm.setValue({
            'name': winery.name,
            'address': {
              'region': winery.address.region,
              'city': winery.address.city,
              'street': winery.address.street
            },
            'description': winery.description,
            'imageUrl': winery.imageUrl
          });
          this.wineryId = winery.id;
          this.selectedOption = winery.address.region;
        }
      );
    }
  }

  onSubmit(): void{
    const winery: WineryRegisterBindingDTO = {
      ...this.wineryForm.value
    };
    this.isRegisterMode ? this.registerEditService.registerWinery(winery) : this.registerEditService.editWinery(this.wineryId, winery);
  }

  cancel(): void {
    this.wineryForm.reset();
    if (this.isRegisterMode) {
      this.registerEditService.isSent.next(true);
    }
    this.router.navigate(['../'], {relativeTo: this.route, fragment: 'top'});
  }
}
