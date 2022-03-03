import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { SubSink } from 'subsink';

import { AuthService, LocalStorageService } from '@extr/core';
import { Router } from '@angular/router';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {

  const passwordControl = c.get('password');
  const confirmPasswordControl = c.get('confirmPassword');

  if (passwordControl?.pristine || confirmPasswordControl?.pristine) {
    return null;
  }

  if (passwordControl?.value === confirmPasswordControl?.value) {
    return null
  }

  return { match: true };
}

@Component({
  selector: 'xtr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private subs = new SubSink();

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    passwordGroup: this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: passwordMatcher }),
  })

  constructor(
    private fb: FormBuilder,
    private localStorage: LocalStorageService,
    private router: Router,
    private authService: AuthService,
  ) { }

  onSubmit() {
    if (!this.registerForm.valid) {
      console.log('Invalid form');
      return;
    }

    const { email, passwordGroup: { password } } = this.registerForm.value;
    this.subs.sink = this.authService.register(email, password)
      .subscribe((res: any) => {
        this.localStorage.setItem(this.authService.loginTokenKey, res.token);
        this.router.navigate(['/']);
      });
  }




}
