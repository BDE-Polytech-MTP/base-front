import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { BaseNavBar } from '../base-nav-bar';

@Component({
  selector: 'app-mobile-nav-bar',
  templateUrl: './mobile-nav-bar.component.html',
  styleUrls: ['./mobile-nav-bar.component.scss']
})
export class MobileNavBarComponent extends BaseNavBar {

  constructor(authService: AuthService, router: Router) {
    super(authService, router);
  }

}
