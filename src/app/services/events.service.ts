import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Event } from '../models';

const CREATE_EVENT_ENDPOINT = `${API_URL}/events`;
const FETCH_EVENT_ENDPOINT = `${API_URL}/events`;
const FETCH_ALL_EVENTS_ENDPOINT = `${API_URL}/events`;

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  createEvent(title: string, isDraft: boolean, bookingStart?: string, bookingEnd?: string, eventDate?: string) {
    return this.http.post<any>(CREATE_EVENT_ENDPOINT, {
      name: title,
      isDraft,
      bookingStart,
      bookingEnd,
      eventDate,
      bde: this.authService.bdeUUID
    });
  }

  getEvent(uuid: string) {
    return this.http.get<Event>(`${FETCH_EVENT_ENDPOINT}/${uuid}`);
  }

  getEvents() {
    return this.http.get<Event[]>(FETCH_ALL_EVENTS_ENDPOINT);
  }

}
