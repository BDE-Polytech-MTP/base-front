import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, tap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { BdeService } from '../services/bde.service';
import { BDE } from '../models';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

const passwordsMatch: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  const password = group.get('password');
  const passwordConfirm = group.get('passwordConfirm');

  return password && passwordConfirm && password.value !== passwordConfirm.value ? { passMatch: true } : null;
};

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit, OnDestroy {

  confirmForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
    specialty: new FormControl('', [Validators.required]),
    year: new FormControl(undefined, [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
    passwordConfirm: new FormControl('', [Validators.required]),
  }, {
    validators: passwordsMatch
  });

  get firstname() {
    return this.confirmForm.get('firstname');
  }

  get lastname() {
    return this.confirmForm.get('lastname');
  }

  get specialty() {
    return this.confirmForm.get('specialty');
  }

  get year() {
    return this.confirmForm.get('year');
  }

  get password() {
    return this.confirmForm.get('password');
  }

  get passwordConfirm() {
    return this.confirmForm.get('passwordConfirm');
  }

  userUUID: string;
  bde: BDE = {
    bdeName: '',
    specialties: [],
    bdeUUID: '',
  };

  years: number[] = [];

  error?: string;
  submitting = false;

  private speChangeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private bdeService: BdeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.confirmForm.get('email').disable();
    const yearField = this.confirmForm.get('year');
    yearField.disable();
    this.speChangeSub = this.confirmForm.get('specialty').valueChanges.subscribe((value) => {
      const currentSpe = this.bde.specialties.find(spe => spe.specialtyName === value);
      if (currentSpe) {
        this.years = [... new Array(currentSpe.maxYear - currentSpe.minYear + 1).keys()].map(i => i + currentSpe.minYear);
        yearField.enable();
      } else {
        this.years = [];
        yearField.disable();
      }
    });
    this.route.queryParams.pipe(
      mergeMap((params) => this.usersService.getUnregisteredUser(params.uuid)),
      tap((user) => {
        this.confirmForm.get('email').setValue(user.email);
        this.confirmForm.get('firstname').setValue(user.firstname);
        this.confirmForm.get('lastname').setValue(user.lastname);
        this.userUUID = user.userUUID;
      }),
      mergeMap((user) => this.bdeService.getBDE(user.bdeUUID)),
      tap((bde) =>  this.bde = bde)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.speChangeSub.unsubscribe();
  }

  finishRegitration() {
    this.submitting = true;
    this.error = undefined;

    this.usersService.finishRegistration(
      this.userUUID,
      this.confirmForm.value.firstname,
      this.confirmForm.value.lastname,
      this.confirmForm.value.specialty,
      this.confirmForm.value.year,
      this.confirmForm.value.password,
    ).subscribe(
      () => {
        this.router.navigate(['login']);
      },
      (e: HttpErrorResponse) => {
        if (e.status === 400) {
          this.error = 'Les données rentrées dans le formulaire sont erronées. Chargez à nouveau le formulaire et ré-essayez.';
        } else {
          this.error = 'Impossible de finaliser l\'inscription. Contactez un administrateur ou ré-essayez plus tard.';
        }
        this.submitting = false;
      }
    );
  }

}
