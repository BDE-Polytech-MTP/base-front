import { Component, OnInit } from '@angular/core';
import { BdeService } from 'src/app/services/bde.service';
import { AuthService } from 'src/app/services/auth.service';
import { BDE } from 'src/app/models';

@Component({
  selector: 'app-bde-profil',
  templateUrl: './bde-profil.component.html',
  styleUrls: ['./bde-profil.component.scss']
})
export class BdeProfilComponent implements OnInit {

  constructor(private bdeService: BdeService, private authService: AuthService) { }

  bde?: BDE;

  ngOnInit(): void {
    this.bdeService.getBDE(this.authService.bdeUUID).subscribe(
      (bde) => this.bde = bde,
      () => {
        // TODO: Handle error
      }
    );
  }

  canAddUser(): boolean {
    return this.authService.hasPermission('add_user');
  }

}
