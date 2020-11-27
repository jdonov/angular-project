import {enableProdMode, Injectable} from '@angular/core';
import * as AllAuthActions from './auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {User, UserServiceDTO} from '../user.model';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {environment} from '../../../environments/environment';

const END_POINT_REGISTER = 'api/users/register';
const END_POINT_LOGIN = 'login';

const handleAuthentication = (respUser: UserServiceDTO, token: string, expiresIn) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user: User = {username: respUser.username, token, tokenExpirationDate: expirationDate};
  sessionStorage.setItem('userData', JSON.stringify(user));
  return new AllAuthActions.AuthenticateSuccess(user);
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AllAuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AllAuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) {}

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AllAuthActions.SIGNUP_START),
    switchMap((signupAction: AllAuthActions.SignupStart) => {
      return this.http
        .post(environment.apiURL + END_POINT_REGISTER, signupAction.payload, {observe: 'response'})
        .pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.headers.get('tokenExpirationDate') * 1000);
          }),
          map(resData => {
            const respUser = resData.body as UserServiceDTO;
            const token = resData.headers.get('authorization');
            const expiresIn = resData.headers.get('tokenExpirationDate');
            return handleAuthentication(respUser, token, expiresIn);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );

    @Effect()
    authLogin = this.actions$.pipe(
      ofType(AllAuthActions.LOGIN_START),
      switchMap((action: AllAuthActions.LoginStart) => {
        return this.http
          .post(environment.apiURL + END_POINT_LOGIN, action.payload, { observe: 'response' })
          .pipe(
            tap(resData => {
              this.authService.setLogoutTimer(+resData.headers.get('tokenExpirationDate') * 1000);
            }),
            map(resData => {
              const respUser = resData.body as UserServiceDTO;
              const token = resData.headers.get('authorization');
              const expiresIn = resData.headers.get('tokenExpirationDate');
              return handleAuthentication(respUser, token, expiresIn);
            }),
            catchError(errorRes => {
              return handleError(errorRes);
            })
          );
      })
    );
  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AllAuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AllAuthActions.AuthenticateSuccess) => {
      // if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      // }
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AllAuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      sessionStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );
}

