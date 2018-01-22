import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowService } from '../../../services/workflow.service';

@Component({
  selector: 'app-view-workflow',
  templateUrl: './view-workflow.component.html',
  styleUrls: ['./view-workflow.component.css']
})
export class ViewWorkflowComponent implements OnInit {

  constructor(private location : Location,
    private activatedRoute: ActivatedRoute,
    private workflowService: WorkflowService,
    private router: Router) { }

  currentUrl;
  messageClass;
  message;
  workflow;
  subprocesses;
  loading;

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; 
    this.workflowService.getSingleWorkflowAndSteps(this.currentUrl.id).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = 'Workflow not found.'; // Set error message
      } else {
        this.workflow = data.workflow; // Save workflow object for use in HTML
        this.subprocesses = data.steps;
        this.loading = false; // Allow loading of workflow form
      }
    });
  }

}
