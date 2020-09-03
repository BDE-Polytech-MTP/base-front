import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Event } from '../models';
import { DateTime } from 'luxon';
import { AuthService } from '../services/auth.service';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnDestroy {

  events: (Event & { notBookable: Observable<boolean> })[] = [];

  private timeIntervalSub: number;
  private timerSubject: Subject<DateTime>;

  constructor(private eventsService: EventsService, private authService: AuthService, private bookingService: BookingService) { }

  ngOnInit(): void {
    this.timerSubject = new Subject();
    this.timeIntervalSub = setInterval(() => {
      this.timerSubject.next(DateTime.local());
    });
    this.eventsService.getEvents().subscribe((events) => this.events = events.map(event => ({
      ... event,
      notBookable: this.timerSubject.pipe(map(currentDate => !this.canBook(event, currentDate))),
    })));
  }

  ngOnDestroy(): void {
    clearInterval(this.timeIntervalSub);
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
      () => console.log('Created'),
      () => console.error('Got an error')
    );
  }

}
