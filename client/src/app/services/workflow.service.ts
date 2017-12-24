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

  // Function to create headers, add token, to be used in HTTP requests

  // Function to create a new workflow post
  newworkflow(workflow) {
    this.ssoAuthService.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'workflows/newworkflow', workflow, this.options).map(res => res.json());
  }

  getAllworkflows(){
    this.ssoAuthService.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'workflows/getAllworkflows',this.options).map(res => res.json());
  }

  getSingleWorkflow(id) {
    this.ssoAuthService.createAuthenticationHeaders();// Create headers
    return this.http.get(this.domain + 'workflows/singleWorkflow/' + id, this.options).map(res => res.json());
  }

  editWorkflow(workflow) {
     this.ssoAuthService.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'workflows/updateWorkflow/', workflow, this.options).map(res => res.json());
  }

  deleteWorkflow(id) {
     this.ssoAuthService.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.domain + 'workflows/deleteWorkflow/'+id, this.options).map(res => res.json());
  }

  newstep(id, step){
     this.ssoAuthService.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'steps/newstep/'+id, step, this.options).map(res => res.json());
  
  }

  getAllSteps(){
     this.ssoAuthService.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'steps/getAllsteps',this.options).map(res => res.json());
 
  }

}
