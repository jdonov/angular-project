import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {WineEditStart, WineRegisterStart} from '../../wineries/store/wineries.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {WineRegisterDTO, WineServiceDTO, WineUpdateDTO} from '../wine.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-register-edit-wine',
  templateUrl: './register-edit-wine.component.html',
  styleUrls: ['./register-edit-wine.component.css']
})
export class RegisterEditWineComponent implements OnInit {
  wineForm: FormGroup;
  wineryId: string;
  @Input() editMode: boolean;
  @Input() wine: WineServiceDTO;
  @Output() cancelEdit = new Subject<boolean>();
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
    if (this.wine && this.editMode) {
      this.wineForm.setValue({
        'name': this.wine.name,
        'price': this.wine.price,
        'description': this.wine.description,
        'imageUrl': this.wine.imageUrl
      });
    }
  }

  onSubmit(): void {
    if (!this.editMode) {
      const wine: WineRegisterDTO = {
        ...this.wineForm.value,
        wineryId: this.wineryId
      };
      this.store.dispatch(new WineRegisterStart(wine));
      this.router.navigate(['../', 'wines'], {relativeTo: this.route});
    } else {
      const editedWine: WineUpdateDTO = {
        ...this.wineForm.value,
        id: this.wine.id
      };
      this.store.dispatch(new WineEditStart(editedWine));
      this.editMode = false;
      this.cancelEdit.next(true);
    }
  }

  cancel(): void {
    if(!this.editMode) {
      this.router.navigate(['../'], {relativeTo: this.route});
    } else {
      this.editMode = false;
      this.cancelEdit.next(true);
    }
  }
}
