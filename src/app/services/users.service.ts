import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../environments/environment';
import { UnregisteredUser, User } from '../models';

const CREATE_USER_ENDPOINT = `${API_URL}/users/unregistered`;
const GET_UNREGISTERED_USER_ENDPOINT = `${API_URL}/users/unregistered`;
const CONFIRM_ACCOUNT_ENDPOINT = `${API_URL}/register`;
const GET_USERS_FOR_BDE_ENDPOINT = (bdeUUID: string) =>
  `${API_URL}/bde/${bdeUUID}/users`;
const GET_USER_ENDPOINT = (userUUID: string) => `${API_URL}/users/${userUUID}`;
const REQUEST_ACCOUNT_ENDPOINT = `${API_URL}/users/requests`;
const GET_ACCOUNT_REQUESTS_ENDPOINT = (bdeUUID: string) => `${API_URL}/users/requests/${bdeUUID}`;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  createUser(
    bdeUUID: string,
    userEmail: string,
    member: boolean,
    firstname?: string,
    lastname?: string
  ) {
    return this.http.post(CREATE_USER_ENDPOINT, {
      bde: bdeUUID,
      email: userEmail,
      firstname: firstname && firstname.trim().length ? firstname : undefined,
      lastname: lastname && lastname.trim().length ? lastname : undefined,
      member,
    });
  }

  getUnregisteredUser(uuid: string) {
    return this.http.get<UnregisteredUser>(
      `${GET_UNREGISTERED_USER_ENDPOINT}/${uuid}`
    );
  }

  finishRegistration(
    uuid: string,
    firstname: string,
    lastname: string,
    specialty: string,
    year: number,
    password: string
  ) {
    return this.http.post(CONFIRM_ACCOUNT_ENDPOINT, {
      uuid,
      firstname,
      lastname,
      specialty,
      year,
      password,
    });
  }

  findUsersForBDE(bdeUUID: string) {
    return this.http.get<(User | UnregisteredUser)[]>(
      GET_USERS_FOR_BDE_ENDPOINT(bdeUUID)
    );
  }

  findUserByUUID(userUUID: string) {
    return this.http.get<User | UnregisteredUser>(GET_USER_ENDPOINT(userUUID));
  }

  requestAccount(params: {
    email: string;
    firstname: string;
    lastname: string;
    bde: string;
    specialty: string;
    year: number;
  }) {
    return this.http.post(REQUEST_ACCOUNT_ENDPOINT, params);
  }

  findAllAccountRequestsForBde(bdeUUID: string) {
    return this.http.get<{
      firstname: string;
      lastname: string;
      email: string;
      specialtyName: string;
      specialtyYear: number;
    }[]>(GET_ACCOUNT_REQUESTS_ENDPOINT(bdeUUID));
  }
}
