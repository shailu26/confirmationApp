import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id) {
    return this.http.get(`${environment.BASE_URL}/api/user/getUserDetail/${id}`, HTTP_OPTIONS);
  }
  updateUserById(id, data) {
    return this.http.patch(`${environment.BASE_URL}/api/user/updateUserById/${id}`, data, HTTP_OPTIONS);
  }
}
