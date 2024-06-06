import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {User} from "./user.module";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
      'AIzaSyCgc-aJm3wZXKMCTCL7YVhJ2-Att6rB2D4', {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  login(email: string, password: string) {
  return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
    'AIzaSyCgc-aJm3wZXKMCTCL7YVhJ2-Att6rB2D4', {
    email: email,
    password: password,
    returnSecureToken: true
  })
    .pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError (errorRes: HttpErrorResponse) {
      let errorMessage = 'An unknown error occurred!';
      if ( !errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      console.log(errorRes);
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists!';
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMessage = 'Email or password are not correct!';
          break
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exists!';
          break
        case 'INVALID_PASSWORD':
          errorMessage = 'This password is not correct!';
          break
      }
      return throwError(errorMessage);
    }
}
