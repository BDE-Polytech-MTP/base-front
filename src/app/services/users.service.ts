import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './constants';
import { UnregisteredUser } from '../models';

const CREATE_USER_ENDPOINT = `${BASE_URL}/users/unregistered`;
const GET_UNREGISTERED_USER_ENDPOINT = `${BASE_URL}/users/unregistered`;
const CONFIRM_ACCOUNT_ENDPOINT = `${BASE_URL}/register`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  createUser(bdeUUID: string, userEmail: string, firstname?: string, lastname?: string) {
    return this.http.post(CREATE_USER_ENDPOINT, {
      bde: bdeUUID,
      email: userEmail,
      firstname: firstname && firstname.trim().length ? firstname : undefined,
      lastname: lastname && lastname.trim().length ? lastname : undefined,
    });
  }

  getUnregisteredUser(uuid: string) {
    return this.http.get<UnregisteredUser>(`${GET_UNREGISTERED_USER_ENDPOINT}/${uuid}`);
  }

  finishRegistration(uuid: string, firstname: string, lastname: string, specialty: string, password: string) {
    return this.http.post(CONFIRM_ACCOUNT_ENDPOINT, {
      uuid,
      firstname,
      lastname,
      specialty,
      password,
    });
  }

}
