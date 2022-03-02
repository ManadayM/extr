import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'xtr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
  ) { }

  onSubmit() {
    if (!this.registerForm.valid) {
      console.log('Invalid form');
      return;
    }
    console.log(this.registerForm.value)
  }
}
