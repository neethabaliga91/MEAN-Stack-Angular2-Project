import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowService } from '../../../services/workflow.service';
import { SsoAuthService } from 'app/services/ssoauth.service';

@Component({
  selector: 'app-delete-workflow',
  templateUrl: './delete-workflow.component.html',
  styleUrls: ['./delete-workflow.component.css']
})
export class DeleteWorkflowComponent implements OnInit {

  message;
  messageClass;
  foundWorkflow = false;
  processing = false;
  workflow;
  currentUrl;
  username;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private workflowService : WorkflowService,
    private ssoAuthService : SsoAuthService,
    private router: Router) { }

  deleteWorkflow(){
    this.processing = true; // Disable buttons
    // Function for DELETE request
    this.workflowService.deleteWorkflow(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; 
        this.message = data.message; 
      } else {
        this.messageClass = 'alert alert-success'; 
        this.message = data.message; 
        setTimeout(() => {
          this.router.navigate(['/workflow']);
        }, 2000);
      }
    });
  }
  
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.workflowService.getSingleWorkflow(this.currentUrl.id).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = 'Workflow not found.'; // Set error message
      } else {
        this.workflow = {
          title: data.workflow.title, // Set title
          body: data.workflow.body, // Set body
          createdBy:  this.ssoAuthService.user._Id, // Set created_by field
          createdAt: data.workflow.createdAt // Set created_at field
        }
        this.foundWorkflow = true;
      }
    });
    
  }

}
