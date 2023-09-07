import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_PATH } from '@app/utilities/route-path';

@Injectable({
  providedIn: 'root',
})
export class NavigateService {
  private url = ROUTE_PATH;

  constructor(private router: Router, private location: Location) {}

  toRoot(): void {
    this.router.navigate(['/']);
  }

  toApp(): void {
    this.router.navigate([this.url.root]);
  }

  toLogin(): void {
    this.router.navigate([this.url.login.fullPath]);
  }

  toSignUp(): void {
    this.router.navigate([this.url.signup.fullPath]);
  }

  toUrl(url: string): void {
    this.router.navigate([url]);
  }

  goBack(): void {
    this.location.back();
  }

  getCurrentPath() {
    return decodeURIComponent(this.location.path())
  }
}
