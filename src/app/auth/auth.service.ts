import {Injectable} from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from "@firebase/auth";
import app from "../firebase.config";
import {BehaviorSubject, from, Observable, throwError} from "rxjs";
import {catchError, tap, map, switchMap} from "rxjs/operators";
import {User} from "./user.model";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {
  private auth: Auth = getAuth(app); // Firebase Auth instance
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null); // this subject allows you to use previous data
  private tokenExpirationTimer: any; // Timer for token expiration

  constructor(private router: Router) {}

  /**
   * Handle errors that occur during authentication.
   * @param errorResponse - The error response from the authentication request.
   */
  private handleCredentialErrors(errorResponse: any) {
    let errorMessage: string = 'An unknown error occurred!';
    if (!errorResponse.code) { return throwError(errorMessage); }
    switch (errorResponse.code) {
      case 'auth/user-not-found':
        errorMessage = 'No user found with this email!';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password!';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password is too weak!';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address!';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Invalid user or password!';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'This email is already in use!';
        break;
      default:
        errorMessage = 'An error occurred: ' + errorResponse.message;
    }
    return throwError(errorMessage);
  }

  /**
   * Handle user authentication
   * @param email
   * @param userId
   * @param token
   * @param expiresIn
   */
  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  /**
   * Process user authentication result
   * @param email User's email
   * @param userCredential Firebase UserCredential object
   */
  private processAuthResult(email: string, userCredential: UserCredential) {
    userCredential.user.getIdToken().then(token => {
      this.handleAuthentication(email, userCredential.user.uid, token, 3600);
    });
  }

  /**
   * Sign up (Register) a new user with the provided email and password.
   * @param email
   * @param password
   */
  signUp(email: string, password: string): Observable<UserCredential>{
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        catchError(errorResponse => this.handleCredentialErrors(errorResponse)),
        tap(responseData => this.processAuthResult(email, responseData))
      );
  }

  /**
   * Log in a user with the provided email and password.
   * @param email
   * @param password
   */
  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password))
      .pipe(
        catchError(errorResponse => this.handleCredentialErrors(errorResponse)),
        switchMap(responseData => {
          return from(responseData.user.getIdToken()).pipe(
            tap(token => {
              this.handleAuthentication(email, responseData.user.uid, token, 3600);
            }),
            map(() => responseData)
          );
        })
      );
  }

  /**
   * Automatically logs in a user if their token is still valid.
   */
  autoLogin(): void {
    const userData: User = JSON.parse(localStorage.getItem('userData'));

    if (!userData) { return; }

    const loadedUser = new User(
      userData.email,
      userData.id,
      Object.keys(userData).includes('_token') ? (userData as any)._token : null,
      Object.keys(userData).includes('_tokenExpirationDate') ? new Date((userData as any)._tokenExpirationDate) : null
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration: number = new Date((userData as any)._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  /**
   * Logs a user out of firebase and the application by making 'user' = null. Also, it redirects the user to auth view.
   * @returns Void Observable
   */
  logout(): Observable<void> {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    localStorage.removeItem('userData');
    return from(signOut(this.auth))
      .pipe(
        tap(() => {
          this.user.next(null);
          this.router.navigate(['/auth']);
        })
      )
  }

  /**
   * Automatically logs a user out after a specified (token) duration.
   * @param expirationDuration - The duration in milliseconds
   */
  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout().subscribe();
    }, expirationDuration);
  }
}
