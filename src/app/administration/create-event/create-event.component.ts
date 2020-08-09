import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { Moment } from 'moment';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  error = '';
  sending = false;

  createEventForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    bookingStart: new FormControl(''),
    bookingEnd: new FormControl(''),
    eventDate: new FormControl(''),
    isDraft: new FormControl(false, [Validators.required]),
  });

  get name() {
    return this.createEventForm.get('name');
  }

  constructor(private eventsService: EventsService, private router: Router) { }

  ngOnInit(): void {
  }

  createEvent() {
    this.sending = true;
    this.error = undefined;
    const { name, bookingStart, bookingEnd, eventDate, isDraft } = this.createEventForm.value;
    this.eventsService.createEvent(
      name,
      isDraft,
      bookingStart ? (bookingStart as Moment).toISOString() : undefined,
      bookingEnd ? (bookingEnd as Moment).toISOString() : undefined,
      eventDate ? (eventDate as Moment).toISOString() : undefined
    ).subscribe(
      (data) => this.router.navigate(['bde', 'events', data.uuid]),
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
