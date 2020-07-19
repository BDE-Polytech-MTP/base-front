import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { BaseNavBar } from '../base-nav-bar';

@Component({
  selector: 'app-desktop-nav-bar',
  templateUrl: './desktop-nav-bar.component.html',
  styleUrls: ['./desktop-nav-bar.component.scss']
})
export class DesktopNavBarComponent extends BaseNavBar {

  constructor(authService: AuthService, router: Router) {
    super(authService, router);
  }

}
