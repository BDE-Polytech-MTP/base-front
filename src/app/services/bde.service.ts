import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../environments/environment';
import { BDE } from '../models';

const CREATE_BDE_ENDPOINT = `${API_URL}/bde`;
const LIST_BDES_ENDPOINT = `${API_URL}/bde`;
const GET_BDE_ENDPOINT = `${API_URL}/bde`;

@Injectable({
  providedIn: 'root'
})
export class BdeService {

  constructor(private http: HttpClient) { }

  createBDE(name: string, ownerEmail: string, specialties: { name: string, minYear: number, maxYear: number}[]) {
    return this.http.post(CREATE_BDE_ENDPOINT, {
      name,
      ownerEmail,
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
