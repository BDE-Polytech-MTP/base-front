import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { fromEvent, combineLatest, concat, BehaviorSubject, merge, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UnregisteredUser } from 'src/app/models';
import { PageEvent } from '@angular/material/paginator';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  mobileQuery: MediaQueryList;
  ipadQuery: MediaQueryList;
  ipadLandQuery: MediaQueryList;
  private mediaQueryListener: () => void;

  columnsToDisplay = [];

  usersCount = 0;
  users: (User | UnregisteredUser)[] = [];
  pageSize: BehaviorSubject<number> = new BehaviorSubject(50);
  pageIndex: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.ipadQuery = media.matchMedia('(max-width: 800px)');
    this.ipadLandQuery = media.matchMedia('(max-width: 1050px');
    this.mediaQueryListener = () => {
      this.handleMediaChange();
      changeDetectorRef.detectChanges();
    };

    /* Using addListener instead of addEventListener because Safari does no support it */
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this.mediaQueryListener);
    // tslint:disable-next-line: deprecation
    this.ipadQuery.addListener(this.mediaQueryListener);
    // tslint:disable-next-line: deprecation
    this.ipadLandQuery.addListener(this.mediaQueryListener);
    this.handleMediaChange();
  }

  handleMediaChange() {
    if (this.mobileQuery.matches) {
      this.columnsToDisplay = ['firstname', 'lastname', 'action'];
    } else if (this.ipadQuery.matches) {
      this.columnsToDisplay = ['firstname', 'lastname', 'specialty', 'member', 'action'];
    } else if (this.ipadLandQuery.matches) {
      this.columnsToDisplay = ['email', 'firstname', 'lastname', 'specialty', 'member', 'action'];
    } else {
      this.columnsToDisplay = ['email', 'firstname', 'lastname', 'specialty', 'permissions', 'member', 'action'];
    }
  }

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
