import { Component, OnInit } from '@angular/core';
import { BdeService } from '../services/bde.service';
import { UsersService } from '../services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { AppValidators } from '../validators/app-validators';

function minLengthIfNotEmpty(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const actualLength: number = control.value.trim().length;
    return actualLength > 0 && actualLength < minLength ? { min: { min: minLength, actual: actualLength } } : null;
  };
}

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent implements OnInit {

  bdes: { name: string, uuid: string }[] = [];

  createUserForm = new FormGroup({
    bde: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    firstname: new FormControl('', [minLengthIfNotEmpty(2), Validators.maxLength(15)]),
    lastname: new FormControl('', [minLengthIfNotEmpty(2), Validators.maxLength(15)]),
  });

  get bde() {
    return this.createUserForm.get('bde');
  }

  get email() {
    return this.createUserForm.get('email');
  }

  get firstname() {
    return this.createUserForm.get('firstname');
  }

  get lastname() {
    return this.createUserForm.get('lastname');
  }

  error?: string;
  success?: string;
  sending = false;

  constructor(private bdeService: BdeService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.bdeService.listAllBDEs().subscribe(
      (bdes) => this.bdes = bdes
    );
  }

  createUser() {
    this.sending = true;
    this.error = undefined;
    this.success = undefined;

    this.usersService.createUser(
      this.createUserForm.value.bde,
      this.createUserForm.value.bde.email,
      this.createUserForm.value.bde.firstname.trim(),
      this.createUserForm.value.bde.lastnameµ.trim()
    ).subscribe(
      () => {
        this.success = 'Compté créé !';
        this.sending = false;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.error = 'L\'email indiqué est déjà utilisé.';
        } else {
          this.error = 'Impossible de créer l\'utilisateur. Contactez un administrateur ou ré-essayez plus tard.';
        }
        this.sending = false;
      }
    );
  }

}
