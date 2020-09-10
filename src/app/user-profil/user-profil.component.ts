import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { User } from '../models';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit {

  user: User;

  constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      mergeMap(params => this.usersService.findUserByUUID(params.get('uuid')))
    ).subscribe(
      (user) => this.user = user as User,
      () => this.router.navigateByUrl('/')
    );
  }

  formatPermissions(permissions: string[]) {
    return permissions.reduce((c, n) => c.toLowerCase() + ', ' + n.toLowerCase());
  }

}
