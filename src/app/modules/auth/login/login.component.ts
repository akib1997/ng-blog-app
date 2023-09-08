import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '@app/models/login.model';
import { User } from '@app/models/user.model';
import { AuthService } from '@app/services/auth/auth.service';
import { markAllControlsAsDirty } from '@app/utilities/markAllControlsAsDirty';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  loading = false;
  loginForm: FormGroup<LoginForm>;
  signupMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,

    private route: ActivatedRoute, private router: Router
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.initForm();
  }

  login(): void {
    console.dir(this.loginForm.value);
    if (this.loginForm.invalid) {
      markAllControlsAsDirty([this.loginForm]);
      return;
    }

    const payload = this.loginForm.value;
    this.loading = true;

    if (this.authService.login(payload as User)) {
      this.signupMessage = 'Login successful. Redirecting...';
      setTimeout(() => {
        this.router.navigateByUrl(this.returnUrl);
        this.loading = false;
      }, 2000);
    } else {
      this.signupMessage = 'Please choose another username.';
      this.loading = false;
    }
  }

  initForm(): void {
    const { required, minLength, maxLength } = Validators;
    this.loginForm = this.fb.group<LoginForm>({
      userName: this.fb.control(null, [required, minLength(4), maxLength(8)]),
      password: this.fb.control(null, [required, minLength(6), maxLength(8)]),
    });
  }
}

type LoginForm = {
  [field in keyof Login]: FormControl<Login[field] | null>;
};
