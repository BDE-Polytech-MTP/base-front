import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { fromEvent, combineLatest, concat, BehaviorSubject, merge, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UnregisteredUser } from 'src/app/models';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  columnsToDisplay = ['email', 'firstname', 'lastname', 'permissions', 'action'];

  usersCount = 0;
  users: (User | UnregisteredUser)[] = [];
  pageSize: BehaviorSubject<number> = new BehaviorSubject(50);
  pageIndex: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private authService: AuthService, private usersService: UsersService) { }

  ngOnInit(): void {
    const searchChange = concat(
      of(''),
      fromEvent(document.getElementById('searchBar'), 'input').pipe(
        map(search => (search.target as HTMLInputElement).value.toLowerCase())
      )
    );
    const fetchUsers = this.usersService.findUsersForBDE(this.authService.bdeUUID);
    const searchAndUser = combineLatest([fetchUsers, searchChange]);

    const filteredUsers = searchAndUser.pipe(map(([fetchedUsers, search]) => fetchedUsers.filter(user =>
        user.email.toLowerCase().includes(search) ||
        user.firstname && user.firstname.toLowerCase().includes(search) ||
        user.lastname && user.lastname.toLowerCase().includes(search)
    )));

    const paginationChange = merge(this.pageIndex, this.pageSize);

    combineLatest([filteredUsers, paginationChange]).subscribe(([pagedUsers, _]) => {
      this.usersCount = pagedUsers.length;
      this.users = pagedUsers.slice(this.pageIndex.value * this.pageSize.value, (this.pageIndex.value + 1) * this.pageSize.value);
    });

  }

  onPageChange(event: PageEvent) {
    this.pageSize.next(event.pageSize);
    this.pageIndex.next(event.pageIndex);
  }

  formatPermission(permissions: string[]) {
    return permissions.length ? permissions.reduce((prev, curr) => prev.toLowerCase() + ', ' + curr.toLowerCase()) : 'Aucune permission';
  }

}
