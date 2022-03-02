import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LocalStorageService } from '@extr/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'xtr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private subs = new SubSink();

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  onSubmit() {
    if (!this.loginForm.valid) {
      console.log('Invalid form');
      return;
    }

    const { email, password } = this.loginForm.value;
    this.subs.sink = this.authService
      .login(email, password).subscribe((res: any) => {
        this.localStorage.setItem(this.authService.loginTokenKey, res.token);
        this.router.navigate(['/']);
      });
  }

}
