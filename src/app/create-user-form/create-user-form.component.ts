import { Component, OnInit } from '@angular/core';
import { BdeService } from '../services/bde.service';
import { UsersService } from '../services/users.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent implements OnInit {

  bdes: { name: string, uuid: string }[] = [];

  data = {
    bde: '',
    email: '',
    firstname: '',
    lastname: '',
  };

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
    this.usersService.createUser(this.data.bde, this.data.email, this.data.firstname, this.data.lastname).subscribe(
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
