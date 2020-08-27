import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Event } from '../models';
import { DateTime } from 'luxon';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  events: Event[] = [];

  constructor(private eventsService: EventsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe((events) => this.events = events);
  }

  toHumanDate(date: string): string {
    return DateTime.fromISO(date).setLocale('fr').toLocaleString(DateTime.DATETIME_SHORT);
  }

  canBook(event: Event): boolean {
    if (event.bookingStart && DateTime.fromISO(event.bookingStart) > DateTime.local()) {
      return false;
    }

    if (event.bookingEnd && DateTime.fromISO(event.bookingEnd) < DateTime.local()) {
      return false;
    }

    return event.bookingStart !== undefined || event.bookingEnd !== undefined;
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

}
