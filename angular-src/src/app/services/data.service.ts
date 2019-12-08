import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    environment.production
      ? (this.baseUrl = 'http://mylaww.herokuapp.com//api/v1')
      : (this.baseUrl = 'http://localhost:3000/api/v1');
  }

  addAttendee(obj) {
    return this.http.post(this.baseUrl + '/attendee/add', obj);
  }

  addTalk(obj) {
    return this.http.post(this.baseUrl + '/talk/add', obj);
  }

  fetchAllAttendees() {
    return this.http.get(this.baseUrl + '/attendee/all');
  }

  fetchAllTalks() {
    return this.http.get(this.baseUrl + '/talk/all');
  }

  addAttendeeToTalk(obj) {
    return this.http.post(this.baseUrl + '/talk/attendee', obj);
  }

  deleteTalk(id) {
    return this.http.delete(this.baseUrl + '/talk/delete/' + id);
  }
}
