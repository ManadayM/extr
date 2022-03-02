import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'xtr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
  ) { }

  onSubmit() {
    if (!this.loginForm.valid) {
      console.log('Invalid form');
      return;
    }
    console.log(this.loginForm.value)
  }

}
