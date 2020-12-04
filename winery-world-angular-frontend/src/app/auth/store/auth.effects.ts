import {Injectable} from '@angular/core';
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
  if (errorRes.status !== 200 && errorRes.status !== 403 && errorRes.status !== 409) {
    return of(new AllAuthActions.AuthenticateFail(errorMessage));
  }
  if (errorRes.status === 409) {
    return of(new AllAuthActions.AuthenticateFail(errorRes.error.errors[0]));
  }
  errorMessage = 'Wrong username or password';
  return of(new AllAuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) {
  }

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
        .post(environment.apiURL + END_POINT_LOGIN, action.payload, {observe: 'response'})
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

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AllAuthActions.AUTO_LOGIN),
    map(() => {
      const userData: User = JSON.parse(sessionStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUser = {
        username: userData.username,
        token: userData.token,
        tokenExpirationDate: new Date(userData.tokenExpirationDate)
      };

      if (loadedUser.token) {
        const expirationDuration =
          new Date(userData.tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AllAuthActions.AuthenticateSuccess({
          username: loadedUser.username,
          token: loadedUser.token,
          tokenExpirationDate: new Date(userData.tokenExpirationDate)
        });
      }
      return { type: 'DUMMY' };
    })
  );
}

