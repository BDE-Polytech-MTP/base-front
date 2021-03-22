import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { BdeService } from '../services/bde.service';
import { BDE } from '../models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-request',
  templateUrl: './account-request.component.html',
  styleUrls: ['./account-request.component.scss'],
})
export class AccountRequestFormComponent implements OnInit, OnDestroy {
  confirmForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(15),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(15),
    ]),
    bde: new FormControl('', [Validators.required]),
    specialty: new FormControl('', [Validators.required]),
    year: new FormControl(undefined, [Validators.required]),
  });

  get email() {
    return this.confirmForm.get('email');
  }

  get firstname() {
    return this.confirmForm.get('firstname');
  }

  get lastname() {
    return this.confirmForm.get('lastname');
  }

  get bde() {
    return this.confirmForm.get('bde');
  }

  get specialty() {
    return this.confirmForm.get('specialty');
  }

  get year() {
    return this.confirmForm.get('year');
  }

  bdes: BDE[] = [];
  $bdeSub: Subscription;
  $speSub: Subscription;
  specialties: { name: string; minYear: number; maxYear: number }[] = [];
  years: number[] = [];

  error?: string;
  submitting = false;
  success = false;

  constructor(
    private usersService: UsersService,
    private bdeService: BdeService
  ) {}

  ngOnInit(): void {
    this.confirmForm.get('specialty').disable();
    this.confirmForm.get('year').disable();

    this.$bdeSub = this.bde.valueChanges
      .pipe(
        tap((value) => {
          const selected = this.bdes.filter((bde) => bde.bdeUUID === value);
          if (selected.length) {
            this.specialties = selected[0].specialties;
            this.specialty.enable();
          } else {
            this.specialties = [];
            this.specialty.disable();
          }
        })
      )
      .subscribe();

    this.$speSub = this.specialty.valueChanges
      .pipe(
        tap((value) => {
          const selected = this.specialties.filter((spe) => spe.name === value);
          if (selected.length) {
            for (let i = selected[0].minYear; i <= selected[0].maxYear; i++) {
              if (!this.years.includes(i)) {
                this.years.push(i);
              }
            }
            this.year.enable();
          } else {
            this.years = [];
            this.year.disable();
          }
        })
      )
      .subscribe();

    this.bdeService.listAllBDEs().subscribe((allBDEs) => {
      this.bdes = allBDEs;
    });
  }

  ngOnDestroy(): void {
    this.$bdeSub.unsubscribe();
    this.$speSub.unsubscribe();
  }

  askAccount() {
    this.submitting = true;
    this.error = undefined;
    this.usersService
      .requestAccount({
        bde: this.bde.value,
        email: this.email.value,
        firstname: this.firstname.value,
        lastname: this.lastname.value,
        specialty: this.specialty.value,
        year: +this.year.value | 0,
      })
      .subscribe(
        () => {
          this.success = true;
        },
        (e: HttpErrorResponse) => {
          if (e.status === 400) {
            this.error =
              'Le mail indiqué est déjà utilisé. Avez-vous déjà un compte ?';
          } else {
            this.error =
              'Impossible de demander la création de compte. Contactez un administrateur ou ré-essayez plus tard.';
          }
          this.submitting = false;
        }
      );
  }
}
