import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowService } from '../../../services/workflow.service';

@Component({
  selector: 'app-edit-workflow',
  templateUrl: './edit-workflow.component.html',
  styleUrls: ['./edit-workflow.component.css']
})
export class EditWorkflowComponent implements OnInit {

  message;
  messageClass;
  username;
  loading = true;
  workflow = {
    title : String,
    body : String
  }
  processing = false;
  currentUrl;
  constructor(private location : Location,
    private activatedRoute: ActivatedRoute,
    private workflowService: WorkflowService,
    private router: Router) { 
    
  }

  updateWorkflowSubmit(){

    this.processing = true; // Lock form fields
    // Function to send workflow object to backend
    this.workflowService.editWorkflow(this.workflow).subscribe(data => {
      // Check if PUT request was a success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = 'alert alert-success'; // Set success bootstrap class
        this.message = data.message; // Set success message
        // After two seconds, navigate back to workflow page
        setTimeout(() => {
          this.router.navigate(['/workflow']); // Navigate back to route page
        }, 2000);
      }
    });
  }

  goBack(){
  this.location.back();
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    // Function to GET current workflow with id in params
    this.workflowService.getSingleWorkflow(this.currentUrl.id).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = 'Workflow not found.'; // Set error message
      } else {
        this.workflow = data.workflow; // Save workflow object for use in HTML
        this.loading = false; // Allow loading of workflow form
      }
    });
  }

}
