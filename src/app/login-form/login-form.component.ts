import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, ConnectionState } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  error?: string;
  connecting = false;

  connectionSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.connectionSubscription = this.authService.connectionState.subscribe(
      (value) => this.connecting = value === ConnectionState.CONNECTING
    );
  }

  ngOnDestroy(): void {
    this.connectionSubscription.unsubscribe();
  }

  submit() {
    this.error = undefined;

    this.authService.connect(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      () => this.router.navigate(['']),
      (e: HttpErrorResponse) => {
        console.log(e);
        if (e.status === 400) {
          this.error = 'Mauvaise combinaison email/mot de passe';
        } else {
          this.error = 'Impossible de se connecter. Contactez un administrateur ou ré-essayez plus tard.';
        }
      }
    );
  }

}
