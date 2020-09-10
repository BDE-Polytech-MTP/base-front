import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { mergeMap } from 'rxjs/operators';
import { Booking, Event, User } from '../models';
import { combineLatest, Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { DateTime } from 'luxon';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource = new MatTableDataSource<User>([]);

  booking: Booking & Event;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingsService: BookingService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.route.paramMap
    .pipe(mergeMap((params) => {
      const eventUUID = params.get('event_id');
      const userUUID = params.get('user_id');

      this.bookingsService.getBookingsForEvent(eventUUID).subscribe(
        (users) => this.dataSource.data = users
      );

      return combineLatest([
        this.bookingsService.getBooking(eventUUID, userUUID),
        // this.eventsService.getEvent(eventUUID), // TODO Uncomment later ?
        this.usersService.findUserByUUID(userUUID)
      ]);
    })).subscribe(
      ([booking, user]) => {
        this.booking = booking;
        this.user = user as User;
      },
      () => this.router.navigateByUrl('/')
    );
  }

  toHumanDate(date: string): string {
    return DateTime.fromISO(date).setLocale('fr').toLocaleString(DateTime.DATETIME_SHORT);
  }

  onSearchChange(newValue: string) {
    this.dataSource.filter = newValue;
  }

}
