import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './constants';
import { BDE } from '../models';

const CREATE_BDE_ENDPOINT = `${BASE_URL}/bde`;
const LIST_BDES_ENDPOINT = `${BASE_URL}/bde`;
const GET_BDE_ENDPOINT = `${BASE_URL}/bde`;

@Injectable({
  providedIn: 'root'
})
export class BdeService {

  constructor(private http: HttpClient) { }

  createBDE(name: string, specialties: string[]) {
    return this.http.post(CREATE_BDE_ENDPOINT, {
      name,
      specialties,
    });
  }

  listAllBDEs() {
    return this.http.get<BDE[]>(LIST_BDES_ENDPOINT);
  }

  getBDE(uuid: string) {
    return this.http.get<BDE>(`${GET_BDE_ENDPOINT}/${uuid}`);
  }

}
