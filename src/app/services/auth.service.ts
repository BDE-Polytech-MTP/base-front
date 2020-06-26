import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './constants';
import { BehaviorSubject } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

const LOGIN_ENDPOINT = `${BASE_URL}/login`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public connectionState = new BehaviorSubject<ConnectionState>(ConnectionState.DISCONNECTED);
  private token = new BehaviorSubject<string | undefined>(undefined);

  constructor(private http: HttpClient) {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      this.token.next(jwt);
      this.connectionState.next(ConnectionState.CONNECTED); // TODO: Check token expiration date
    }
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
