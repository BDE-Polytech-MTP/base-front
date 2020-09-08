import { Event } from './event.model';

export interface Booking extends Event {
    userUUID: string;
}
