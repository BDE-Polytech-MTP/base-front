import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Event } from '../models';
import { DateTime } from 'luxon';
import { AuthService } from '../services/auth.service';
import { Subject, Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookingService } from '../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnDestroy {

  events: (Event & { notBookable: Observable<boolean>, booked: boolean })[] = [];

  private timeIntervalSub: number;
  private timerSubject: Subject<DateTime>;

  constructor(
    private eventsService: EventsService,
    private authService: AuthService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.timerSubject = new Subject();
    this.timeIntervalSub = setInterval(() => {
      this.timerSubject.next(DateTime.local());
    });

    const eventsAndBookings = combineLatest(
      [this.eventsService.getEvents(), this.bookingService.getBookingsForUser(this.authService.userUUID)]
    );

    eventsAndBookings.subscribe(
      ([events, bookings]) => {
        this.events = events.map(event => {
          const booked = bookings.some(booking => booking.eventUUID === event.eventUUID);
          const notBookable = booked ? of(false) : this.timerSubject.pipe(map(currentDate => !this.canBook(event, currentDate)));
          return {
            ... event,
            notBookable,
            booked,
          };
        });
      }
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.timeIntervalSub);
  }

  get userUUID() {
    return this.authService.userUUID;
  }

  toHumanDate(date: string): string {
    return DateTime.fromISO(date).setLocale('fr').toLocaleString(DateTime.DATETIME_SHORT);
  }

  canBook(event: Event, currentDate: DateTime): boolean {
    if (event.bookingStart && DateTime.fromISO(event.bookingStart) > currentDate) {
      return false;
    }

    if (event.bookingEnd && DateTime.fromISO(event.bookingEnd) < currentDate) {
      return false;
    }

    return true;
  }

  canCreateEvent(): boolean {
    return this.authService.hasPermission('all') || this.authService.hasPermission('manage_events');
  }

  canManageEvent(event: Event): boolean {
    if (this.authService.hasPermission('all')) {
      return true;
    }
    return this.authService.hasPermission('manage_events') && event.bdeUUID === this.authService.bdeUUID;
  }

  book(event: Event) {
    this.bookingService.createBooking(event.eventUUID, this.authService.userUUID).subscribe(
      () => this.router.navigate(['events', event.eventUUID, 'bookings', this.authService.userUUID]),
      () => console.error('Got an error')
    );
  }

}
