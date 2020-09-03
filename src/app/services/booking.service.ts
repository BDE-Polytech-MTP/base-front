import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../environments/environment';
import { Booking } from '../models';

const CREATE_BOOKING_ENDPOINT = (eventUUID: string, userUUID: string) => `${API_URL}/events/${eventUUID}/bookings/${userUUID}`;
const GET_USER_BOOKINGS_ENDPOINT = (userUUID: string) => `${API_URL}/users/registered/${userUUID}/bookings`;

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  createBooking(eventUUID: string, userUUID: string, force?: boolean) {
    return this.http.post<Booking>(
      CREATE_BOOKING_ENDPOINT(eventUUID, userUUID),
      { force }
    );
  }

  getBookingsForUser(userUUID: string) {
    return this.http.get<Booking[]>(GET_USER_BOOKINGS_ENDPOINT(userUUID));
  }

}
