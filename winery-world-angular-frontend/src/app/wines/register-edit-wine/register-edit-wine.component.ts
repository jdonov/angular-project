import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-edit-wine',
  templateUrl: './register-edit-wine.component.html',
  styleUrls: ['./register-edit-wine.component.css']
})
export class RegisterEditWineComponent implements OnInit {
  wineForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.wineForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'price': new FormControl(null, [Validators.required, Validators.min(0.01)]),
      'description': new FormControl(null, Validators.required),
      'imageUrl': new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {

  }

}
