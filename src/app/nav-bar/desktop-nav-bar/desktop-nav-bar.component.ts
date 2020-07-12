import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, ConnectionState } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desktop-nav-bar',
  templateUrl: './desktop-nav-bar.component.html',
  styleUrls: ['./desktop-nav-bar.component.scss']
})
export class DesktopNavBarComponent implements OnInit, OnDestroy {

  private connectionState = ConnectionState.CONNECTING;

  private authSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.connectionState.subscribe(
      (value) => this.connectionState = value
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  isDisconnected(): boolean {
    return this.connectionState === ConnectionState.DISCONNECTED;
  }

  isConnecting(): boolean {
    return this.connectionState === ConnectionState.CONNECTING;
  }

  isConnected(): boolean {
    return this.connectionState === ConnectionState.CONNECTED;
  }

  disconnect(): void {
    this.authService.disconnect();
    this.router.navigateByUrl('/login');
  }

}
