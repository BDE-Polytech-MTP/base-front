import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../environments/environment';

const VOTES_ENDPOINT = `${API_URL}/vote`;

@Injectable({
  providedIn: 'root',
})
export class VotesService {
  constructor(private http: HttpClient) {}

  getCurrentVote() {
    return this.http.get<{ vote: string | null }>(VOTES_ENDPOINT);
  }

  vote(liste: string | null) {
    return this.http.post(VOTES_ENDPOINT, {
      liste: liste ? liste : '',
    });
  }
}
