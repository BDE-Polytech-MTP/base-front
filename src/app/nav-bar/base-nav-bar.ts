import { ConnectionState, AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export class BaseNavBar {

    constructor(private authService: AuthService, private router: Router) { }

    get userUUID() {
      return this.authService.userUUID;
    }

    isDisconnected(): boolean {
      return this.authService.is(ConnectionState.DISCONNECTED);
    }

    isConnecting(): boolean {
      return this.authService.is(ConnectionState.CONNECTING);
    }

    isConnected(): boolean {
      return this.authService.is(ConnectionState.CONNECTED);
    }

    disconnect(): void {
      this.authService.disconnect();
      this.router.navigateByUrl('/login');
    }

    hasOneOf(permissions: string[]): boolean {
      return this.isConnected() && permissions.some(perm => this.authService.hasPermission(perm));
    }

}
