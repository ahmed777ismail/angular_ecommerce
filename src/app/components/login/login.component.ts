import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private AuthService_: AuthService, private Router_: Router) {}

  msgError: string = '';
  isLoading: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-z][a-z0-9]{6,9}$/),
    ]),
  });

  handleForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.AuthService_.setLogin(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this.isLoading = false;

            localStorage.setItem('eToken', response.token);
            this.AuthService_.saveUserData();
            this.Router_.navigate(['/home']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.msgError = err.error.message;
        },
      });
    }
  }
}
