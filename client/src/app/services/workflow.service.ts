import { Injectable } from '@angular/core';
import { SsoAuthService } from './ssoauth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class WorkflowService {

  options;
  domain = this.ssoAuthService.domain;

  constructor(
    private ssoAuthService: SsoAuthService,
    private http: Http
  ) { }

  createAuthenticationHeaders() {
    this.ssoAuthService.loadTokenAndOtherData(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.ssoAuthService.authToken // Attach token
      })
    });
  }
  // Function to create headers, add token, to be used in HTTP requests

  // Function to create a new workflow post
  newworkflow(workflow) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'workflows/newworkflow', workflow, this.options).map(res => res.json());
  }

  getAllworkflows(){
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'workflows/getAllworkflows',this.options).map(res => res.json());
  }

  getSingleWorkflow(id) {
    this.createAuthenticationHeaders();// Create headers
    return this.http.get(this.domain + 'workflows/singleWorkflow/' + id, this.options).map(res => res.json());
  }

  editWorkflow(workflow) {
     this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'workflows/updateWorkflow/', workflow, this.options).map(res => res.json());
  }

  deleteWorkflow(id) {
     this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.domain + 'workflows/deleteWorkflow/'+id, this.options).map(res => res.json());
  }

  newstep(id, step){
     this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'steps/newstep/'+id, step, this.options).map(res => res.json());
  
  }

  getAllSteps(){
     this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'steps/getAllsteps',this.options).map(res => res.json());
 
  }

}
