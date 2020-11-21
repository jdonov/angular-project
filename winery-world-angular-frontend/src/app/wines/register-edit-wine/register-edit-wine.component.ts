import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {WineRegisterStart} from '../../wineries/store/wineries.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {WineRegisterDTO} from '../wine.model';

@Component({
  selector: 'app-register-edit-wine',
  templateUrl: './register-edit-wine.component.html',
  styleUrls: ['./register-edit-wine.component.css']
})
export class RegisterEditWineComponent implements OnInit {
  wineForm: FormGroup;
  wineryId: string;
  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.wineForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'price': new FormControl(null, [Validators.required, Validators.min(0.01)]),
      'description': new FormControl(null, Validators.required),
      'imageUrl': new FormControl(null, Validators.required)
    });
    this.store.select(state => state.allWineries.winery).subscribe(winery => {
      this.wineryId = winery.id;
    });
  }

  onSubmit(): void {
    const wine: WineRegisterDTO = {
      ...this.wineForm.value,
      wineryId: this.wineryId
    };
    this.store.dispatch(new WineRegisterStart(wine));
    this.router.navigate(['../', 'wines'], {relativeTo: this.route});
  }

  cancel(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
