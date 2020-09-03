import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

const LOGIN_ENDPOINT = `${API_URL}/login`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public connectionState = new BehaviorSubject<ConnectionState>(ConnectionState.DISCONNECTED);
  public token = new BehaviorSubject<string | undefined>(undefined);
  private claims?: JWTClaims;

  constructor(private http: HttpClient) {
    this.token.subscribe((token) => {
      try {
        this.claims = JSON.parse(atob(token.split('.')[1]));
      } catch (_) {
        this.claims = undefined;
      }
    }, () => this.claims === undefined);

    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      this.token.next(jwt);
      this.connectionState.next(ConnectionState.CONNECTED); // TODO: Check token expiration date
    }
  }

  get bdeUUID(): string {
    return this.claims.bde_uuid;
  }

  get userUUID(): string {
    return this.claims.uuid;
  }

  is(state: ConnectionState): boolean {
    return this.connectionState.value === state;
  }

  hasPermission(permission: string): boolean {
    return this.claims && this.claims.permissions.includes(permission);
  }

  connect(email: string, password: string) {
    this.connectionState.next(ConnectionState.CONNECTING);
    return this.http.post<{token: string}>(LOGIN_ENDPOINT, {
      email,
      password
    }).pipe(
      pluck('token'),
      tap(
        () => this.connectionState.next(ConnectionState.CONNECTED),
        () => this.connectionState.next(ConnectionState.DISCONNECTED),
      ),
      tap(
        (token) => {
          localStorage.setItem('jwt', token);
          this.token.next(token);
        },
        () => {
          localStorage.removeItem('jwt');
          this.token.next(undefined);
        }
      ),
    );
  }

  disconnect() {
    this.connectionState.next(ConnectionState.DISCONNECTED);
    this.token.next(undefined);
    localStorage.removeItem('jwt');
  }

}

export enum ConnectionState {
  DISCONNECTED,
  CONNECTING,
  CONNECTED,
}

interface JWTClaims {
  uuid: string;
  bde_uuid: string;
  firstname: string;
  lastname: string;
  permissions: string[];
}
