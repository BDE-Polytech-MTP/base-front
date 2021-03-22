import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-requests-list',
  templateUrl: './user-requests-list.component.html',
  styleUrls: ['./user-requests-list.component.scss']
})
export class UserRequestsListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['firstname', 'lastname', 'specialty', 'email', 'action']

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this.usersService.findAllAccountRequestsForBde(this.authService.bdeUUID).subscribe(value => {
      this.dataSource.data = value;
    })
  }
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

}
