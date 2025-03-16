import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode: boolean = true;

  constructor(private authService: AuthService) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) { return; }

    const email: string = form.value.email;
    const password: string = form.value.password;

    if (this.isLoginMode) {
      // Login
    } else {
      this.authService.signUp(email, password)
        .subscribe({
          next: response => {
            console.log('User registered successfully!');
          },
          error: error => {
            console.error('Something went wrong. Please try again later.');
          }
        })
    }

    form.reset();
  }
}
