import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-edit-winery',
  templateUrl: './register-edit-winery.component.html',
  styleUrls: ['./register-edit-winery.component.css']
})
export class RegisterEditWineryComponent implements OnInit {
  wineryForm: FormGroup;
  isRegisterMode: false;

  constructor() { }

  ngOnInit(): void {
    this.wineryForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'address': new FormGroup({
        'region': new FormControl(null, Validators.required),
        'city': new FormControl(null, Validators.required),
        'street': new FormControl(null, Validators.required)
      }),
      'imageUrl': new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void{

  }

}
