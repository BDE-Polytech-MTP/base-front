import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService, ConnectionState } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.connectionState.value === ConnectionState.CONNECTED) {
            req = req.clone({ setHeaders: { Authorization: this.authService.token.value } });
        }
        return next.handle(req);
    }

}
