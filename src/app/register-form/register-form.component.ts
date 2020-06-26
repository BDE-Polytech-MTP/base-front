import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, tap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { BdeService } from '../services/bde.service';
import { BDE } from '../models';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

const passwordsMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.root.get('password');

  return password && control && password.value !== control.value ? { passMatch: false } : null;
};

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  confirmForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
    specialty: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
    passwordConfirm: new FormControl('', [Validators.required, passwordsMatch]),
  });

  userUUID: string;
  bde: BDE = {
    name: '',
    specialties: [],
    uuid: '',
  };

  error?: string;
  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private bdeService: BdeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.confirmForm.get('email').disable();
    this.route.queryParams.pipe(
      mergeMap((params) => this.usersService.getUnregisteredUser(params.uuid)),
      tap((user) => {
        this.confirmForm.get('email').setValue(user.email);
        this.confirmForm.get('firstname').setValue(user.firstname);
        this.confirmForm.get('lastname').setValue(user.lastname);
        this.userUUID = user.uuid;
      }),
      mergeMap((user) => this.bdeService.getBDE(user.bdeUUID)),
      tap((bde) =>  this.bde = bde)
    ).subscribe();
  }

  finishRegitration() {
    this.submitting = true;
    this.error = undefined;

    this.usersService.finishRegistration(
      this.userUUID,
      this.confirmForm.value.firstname,
      this.confirmForm.value.lastname,
      this.confirmForm.value.specialty,
      this.confirmForm.value.password,
    ).subscribe(
      () => {
        this.router.navigate(['login']);
      },
      (e: HttpErrorResponse) => {
        if (e.status === 401) {
          this.error = 'Les données rentrées dans le formulaire sont erronées. Chargez à nouveau le formulaire et ré-essayez.';
        } else {
          this.error = 'Impossible de finaliser l\'inscription. Contactez un administrateur ou ré-essayez plus tard.';
        }
        this.submitting = false;
      }
    );
  }

}
