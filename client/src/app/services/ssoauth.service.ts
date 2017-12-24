import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SsoAuthService {

  domain = "http://localhost:8080/"; // Development Domain - Not Needed in Production
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
        'Authorization': this.authToken
        /*,
        'user' : this.user,
        'refreshToken' : this.refreshToken,
        'expiresAt' : this.expiresAt*/
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
 /* loadTokenAndOtherData() {
    if (localStorage.getItem("expiresAt") !== null) {
      this.expiresAt = localStorage.getItem('expiresAt');
      let now = new Date();
      if(this.expiresAt >= now){
        if (localStorage.getItem("refreshToken") !== null) {
          this.refreshToken = localStorage.getItem('refreshToken');
          this.http.post(this.domain + 'sso/getRefreshToken/'+ this.refreshToken , this.options);
         }
       }
      this.expiresAt = localStorage.getItem('expiresAt');
      this.authToken = localStorage.getItem('token');
      this.user = localStorage.getItem('user');
      this.refreshToken = localStorage.getItem('refreshToken');
    }
  }*/

  loadTokenAndOtherData() {
      this.expiresAt = window.localStorage.getItem('expiresAt');
      this.authToken = window.localStorage.getItem('token');
      this.refreshToken = window.localStorage.getItem('refreshToken');
    
  }

  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    this.expiresAt = null;
    this.refreshToken = null;
    window.localStorage.clear(); // Clear local storage
  }

  storeUserData(token, user, expiresAt, refreshToken) {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('user', JSON.stringify(user)); 
    window.localStorage.setItem('expiresAt', expiresAt);
    window.localStorage.setItem('refreshToken', refreshToken);
    this.authToken = token; 
    this.user = user; 
    this.expiresAt = expiresAt;
    this.refreshToken = refreshToken;
  }

  loggedIn(){
    let now = new Date();
    this.loadTokenAndOtherData();
    if(this.expiresAt !== null && this.expiresAt < now){
      return true;
    }
  }

}
