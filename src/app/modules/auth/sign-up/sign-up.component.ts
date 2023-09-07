import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '@app/models/login.model';
import { SignUp } from '@app/models/sign-up.model';
import { User } from '@app/models/user.model';
import { AuthService } from '@app/services/auth/auth.service';
import { markAllControlsAsDirty } from '@app/utilities/markAllControlsAsDirty';
import { confirmPasswordValidator } from '@app/validators/confirm-password.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  loading = false;
  signUpForm: FormGroup<SignUpForm>;
  signupMessage = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  signUp(): void {
    console.dir(this.signUpForm.value);
    if (this.signUpForm.invalid) {
      markAllControlsAsDirty([this.signUpForm]);
      return;
    }

    const { confirmPassword, ...payload } = this.signUpForm.value;
    this.loading = true;

    if (this.authService.signUp(payload as User)) {
      this.signupMessage = 'Signup successful. Redirecting to login...';
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
        this.loading = false;
      }, 2000);
    } else {
      this.signupMessage =
        'Username already exists. Please choose another username.';
      this.loading = false;
    }
  }

  initForm(): void {
    const { required, minLength, maxLength } = Validators;
    this.signUpForm = this.fb.group<SignUpForm>(
      {
        userName: this.fb.control(null, [required, minLength(4), maxLength(8)]),
        password: this.fb.control(null, [required, minLength(6), maxLength(8)]),
        confirmPassword: this.fb.control(null, []),
      },
      { validators: [confirmPasswordValidator] }
    );

    // this.signUpForm.valueChanges.subscribe({
    //   next: (res) => console.log(res),
    // });
  }
}

type SignUpForm = {
  [field in keyof SignUp]: FormControl<SignUp[field] | null>;
};
