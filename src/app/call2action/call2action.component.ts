import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ConnectionState } from '../services/auth.service';

@Component({
  selector: 'app-call2action',
  templateUrl: './call2action.component.html',
  styleUrls: ['./call2action.component.scss'],
})
export class Call2actionComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  get show() {
    return (
      this.authService.connectionState.value === ConnectionState.CONNECTED &&
      this.router.url !== '/vote' &&
      !this.router.url.startsWith('/bde')
    );
  }
}
