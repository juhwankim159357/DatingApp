import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // note httpClient should be from HttpClient
import { Observable } from 'rxjs';
import { User } from '../_models/user';

// once JwtModule is defined in app.module, then it does not need to be set.
// It means it is automatically set

// set bearer token
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl; // get data from environment.ts (it is also applied with auth.Service)

  constructor(private http: HttpClient) {}

  // return observable
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');// , httpOptions);
  }

  getUser(id:any): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id); //, httpOptions);
  }
}