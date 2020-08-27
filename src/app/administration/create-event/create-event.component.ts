import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppValidators } from '../../validators/app-validators';
import { EventsService } from '../../services/events.service';
import { DateTime } from 'luxon';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  static readonly DATE_FORMAT: string = 'dd/MM/yyyy hh:mm';

  error = '';
  sending = false;

  createEventForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    bookingStart: new FormControl('', [AppValidators.datetime(CreateEventComponent.DATE_FORMAT)]),
    bookingEnd: new FormControl('', [AppValidators.datetime(CreateEventComponent.DATE_FORMAT)]),
    eventDate: new FormControl('', [AppValidators.datetime(CreateEventComponent.DATE_FORMAT)]),
    isDraft: new FormControl(false, [Validators.required]),
  });

  get name() {
    return this.createEventForm.get('name');
  }

  get bookingStart() {
    return this.createEventForm.get('bookingStart');
  }

  get bookingEnd() {
    return this.createEventForm.get('bookingEnd');
  }

  get eventDate() {
    return this.createEventForm.get('eventDate');
  }

  constructor(private eventsService: EventsService, private router: Router) {}

  ngOnInit(): void {
  }

  createEvent() {
    this.sending = true;
    this.error = undefined;
    const { name, bookingStart, bookingEnd, eventDate, isDraft } = this.createEventForm.value;
    this.eventsService.createEvent(
      name,
      isDraft,
      bookingStart ? DateTime.fromFormat(bookingStart, CreateEventComponent.DATE_FORMAT, { locale: 'fr' }).toISO() : undefined,
      bookingEnd ? DateTime.fromFormat(bookingEnd, CreateEventComponent.DATE_FORMAT, { locale: 'fr' }).toISO() : undefined,
      eventDate ? DateTime.fromFormat(eventDate, CreateEventComponent.DATE_FORMAT, { locale: 'fr' }).toISO() : undefined
    ).subscribe(
      (data) => this.router.navigate(['bde', 'events', data.eventUUID]),
      (err: HttpErrorResponse) => {
        this.sending = false;
        if (err.status === 400) {
          this.error = 'Une donnée renseignée n\'est pas valide.';
        } else if (err.status === 500) {
          this.error = 'Impossible de créer l\'événement. Contactez un administrateur ou ré-essayez plus tard.';
        } else {
          this.error = 'Erreur inconnue';
        }
      });
  }

}
