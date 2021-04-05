import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "../../environments/environment";

// Make sure it is registered in app.module
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken : any;

  // dependency injection
  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          //console.log(user);
          localStorage.setItem('token', user.token); // save token to localstorage
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }
  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model); // it returns observable
  }
  //need to be fixed
  loggedIn(){
      let token:any = localStorage.getItem('token');
      // console.log(token);
      // return !this.jwtHelper.isTokenExpired('token');
      return !!token;
  }

}