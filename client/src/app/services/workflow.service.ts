import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class WorkflowService {

  options;
  domain = this.authService.domain;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }

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
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'workflows/singleWorkflow/' + id, this.options).map(res => res.json());
  }

  editWorkflow(workflow) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'workflows/updateWorkflow/', workflow, this.options).map(res => res.json());
  }


}
