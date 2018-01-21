import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SsoAuthService {

  domain = "https://localhost:8080/"; // Development Domain - Not Needed in Production
  options;
  authToken;
  refreshToken;
  expiresAt;
  user;
  res1;
  
   constructor(
    private http: Http
  ) { }

  createAuthenticationHeaders() {
    this.loadTokenAndOtherData(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authToken
      })
    });
  }

  getSSOLogin() { 
   return this.http.post(this.domain + 'sso/loginSSO', this.options).map(res => res.json());
  }
  getSSOLoginCallBack(dc){
    return this.http.post(this.domain + 'sso/loginSSOCallback/'+ dc , this.options).map(res => res.json());
  }


  // Function to get token from client local storage
  loadTokenAndOtherData() {
    this.expiresAt = localStorage.getItem('expiresAt');
    this.authToken = localStorage.getItem('token');
    this.user = localStorage.getItem('user');
  }

  getProfile() {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + 'sso/profile', this.options).map(res => res.json());
  }


  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    this.expiresAt = null;
    this.refreshToken = null;
    localStorage.clear(); // Clear local storage
  }

  storeUserData(token, user, expiresAt) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user)); 
   localStorage.setItem('expiresAt', expiresAt);
    this.authToken = token; 
    this.user = user; 
    this.expiresAt = expiresAt;
  }

  loggedIn(){
    this.loadTokenAndOtherData();
    if(this.authToken !== null)
    return true;
    else
    return false;
  }

  getUser(){
   this.loadTokenAndOtherData();
   var userobj = JSON.parse(this.user);
   return userobj;
  }

}
