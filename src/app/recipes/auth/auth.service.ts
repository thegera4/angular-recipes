import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Auth, createUserWithEmailAndPassword, getAuth, UserCredential} from "@firebase/auth";
import app from "../../firebase.config";
import {from, Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthService {
  private auth: Auth = getAuth(app);

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string): Observable<UserCredential>{
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        catchError(error => {
          console.error('Sign Up error:', error.message);
          return throwError(() => error);
        })
      )
  }
}
