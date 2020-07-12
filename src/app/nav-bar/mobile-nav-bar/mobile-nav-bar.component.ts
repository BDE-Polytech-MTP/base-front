import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, ConnectionState } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-nav-bar',
  templateUrl: './mobile-nav-bar.component.html',
  styleUrls: ['./mobile-nav-bar.component.scss']
})
export class MobileNavBarComponent implements OnInit, OnDestroy {

  private connectionState = ConnectionState.CONNECTING;
  private connectionStateSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.connectionStateSubscription = this.authService.connectionState.subscribe(
      (value) => this.connectionState = value
    );
  }

  ngOnDestroy(): void {
    this.connectionStateSubscription.unsubscribe();
  }

  isConnected(): boolean {
    return this.connectionState === ConnectionState.CONNECTED;
  }

  isConnecting(): boolean {
    return this.connectionState === ConnectionState.CONNECTING;
  }

  isDisconnected(): boolean {
    return this.connectionState === ConnectionState.DISCONNECTED;
  }

  disconnect(): void {
    this.authService.disconnect();
    this.router.navigateByUrl('/login');
  }

}
