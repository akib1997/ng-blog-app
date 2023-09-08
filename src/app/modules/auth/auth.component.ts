import { Component, OnInit } from '@angular/core';
import { NavigateService } from '@app/services/navigate/navigate.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private navigateService: NavigateService
  ) { }

  ngOnInit(): void {
    this.navigateService.toLogin();
  }

}
