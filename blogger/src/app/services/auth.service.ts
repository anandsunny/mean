import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl: String = 'http://localhost:3000/';
  authToken: any;
  user: any;
  headers: any;

  constructor(
    private _http: HttpClient,
    private _jwtHelperService: JwtHelperService
  ) { }

  // check for doublicate email
  checkEmail(email: String) {
    return this._http.get(`${this.rootUrl}auth/checkemail/${email}`);
  }

  // check for doublicate username
  checkUsername(uname: String) {
    return this._http.get(`${this.rootUrl}auth/checkuname/${uname}`);
  }

  // new user registration
  userRegistration(user){
    return this._http.post(`${this.rootUrl}auth/register`, user);
  }

  // user login
  userLogin(user) {
    return this._http.post(`${this.rootUrl}auth/login`, user);
  }

  // function for store user data on client local storage
  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // get token to client localstorage
  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  // create headers for auth request's
  authHeaders() {
    this.loadToken();
    // headers.append('enctype', 'multipart/form-data');
    this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    // this.headers = this.headers.set('enctype', 'multipart/form-data');
    if(this.authToken)
      this.headers = this.headers.set('authtoken', this.authToken);
  }

  // get profile data for auth user
  getProfile() {
    this.authHeaders();
    return this._http.get(`${this.rootUrl}auth/getProfile`, {headers: this.headers});
  }

  // check user logged in or not
  isLoggedIn() {
    return !this._jwtHelperService.isTokenExpired(this.authToken);
  }

  // log-out user
  userLogout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }



}
