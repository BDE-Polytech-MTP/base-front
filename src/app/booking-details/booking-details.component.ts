import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { mergeMap } from 'rxjs/operators';
import { Booking, Event } from '../models';
import { EventsService } from '../services/events.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {

  booking: Booking;
  event: Event;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingsService: BookingService,
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(mergeMap((params) => {
      const eventUUID = params.get('event_id');
      const userUUID = params.get('user_id');
      return combineLatest([this.bookingsService.getBooking(eventUUID, userUUID), this.eventsService.getEvent(eventUUID)]);
    })).subscribe(
      ([booking, event]) => {
        this.booking = booking;
        this.event = event;
      },
      () => this.router.navigateByUrl('/')
    );
  }

}
