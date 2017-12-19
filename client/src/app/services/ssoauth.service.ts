import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SsoAuthService {

  domain = "http://localhost:8080/"; // Development Domain - Not Needed in Production
  options;
res1;
  constructor(
    private http: Http
  ) { }

  getSSOLogin() { 
   return this.http.post(this.domain + 'sso/loginSSO', this.options).map(res => res.json());
  }
  getSSOLoginCallBack(dc){
    return this.http.post(this.domain + 'sso/loginSSOCallback/'+ dc , this.options).map(res => res.json());
  }


}
