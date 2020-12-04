import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AllAuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signupForm: FormGroup;
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private formBuilder: FormBuilder, private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.select(state => state.shared.loading).subscribe(loading => this.isLoading = loading);
    this.store.select(state => state.auth.authError).subscribe(err => this.error = err);
    this.signupForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]],
      confirmPassword: [null]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }
  mustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (!this.isLoginMode && control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.signupForm.get('confirmPassword').reset();
  }

  onSubmit(): void {
    if (!this.signupForm.valid) {
      return;
    }
    const username = this.signupForm.value.username;
    const password = this.signupForm.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(
        new AllAuthActions.LoginStart({username, password})
      );
    } else {
      this.store.dispatch(
        new AllAuthActions.SignupStart({...this.signupForm.value})
      );
    }

    this.signupForm.reset();
  }
}
