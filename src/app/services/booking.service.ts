import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../environments/environment';

const CREATE_BOOKING_ENDPOINT = (eventUUID: string, userUUID: string) => `${API_URL}/events/${eventUUID}/bookings/${userUUID}`;

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  createBooking(eventUUID: string, userUUID: string, force?: boolean) {
    return this.http.post<{eventUUID: string, userUUID: string}>(
      CREATE_BOOKING_ENDPOINT(eventUUID, userUUID),
      { force }
    );
  }

}
