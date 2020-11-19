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
  selectedOption: number;
  isRegisterMode: false;
  winerySubscription: Subscription;
  winery: Observable<WineryDetailsServiceDTO>;
  wineryId: string;

  constructor(private route: ActivatedRoute, private router: Router, private registerEditService: RegisterEditWineryService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.isRegisterMode = params.register);
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
              'region': this.regions.indexOf(winery.address.region),
              'city': winery.address.city,
              'street': winery.address.street
            },
            'description': winery.description,
            'imageUrl': winery.imageUrl
          });
          this.wineryId = winery.id;
          this.selectedOption = this.regions.indexOf(winery.address.region);
          console.log(winery.address.region);
          console.log(this.selectedOption);
        }
      );
    }

  }

  onSubmit(): void{
    console.log(this.selectedOption);
    const winery: WineryRegisterBindingDTO = {
      name: this.wineryForm.get('name').value,
      imageUrl: this.wineryForm.get('imageUrl').value,
      description: this.wineryForm.get('description').value,
      address: {
        region: this.regions[this.wineryForm.get('address.region').value],
        city: this.wineryForm.get('address.city').value,
        street: this.wineryForm.get('address.street').value
      }
    };
    this.isRegisterMode ? this.registerEditService.registerWinery(winery) : this.registerEditService.editWinery( this.wineryId, winery);
  }

  cancel(): void {
    this.wineryForm.reset();
    this.isRegisterMode = false;
    this.router.navigate(['../'], {relativeTo: this.route});
    this.registerEditService.isSent.next(true);

  }

}
