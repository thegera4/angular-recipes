import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {UserCredential} from "@firebase/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) { return; }

    this.isLoading = true;
    const email: string = form.value.email;
    const password: string = form.value.password;
    let authObs: Observable<UserCredential>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe({
      next: successRes => {
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/recipes'])
      },
      error: errorMessage => {
        console.error(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    })

    form.reset();
  }
}
