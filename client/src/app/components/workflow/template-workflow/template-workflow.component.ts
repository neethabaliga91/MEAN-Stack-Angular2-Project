import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SsoAuthService } from '../../../services/ssoauth.service';
import { WorkflowService } from '../../../services/workflow.service';

@Component({
  selector: 'app-template-workflow',
  templateUrl: './template-workflow.component.html',
  styleUrls: ['./template-workflow.component.css']
})
export class TemplateWorkflowComponent implements OnInit {

  constructor(
    private ssoAuthService: SsoAuthService,
    private workflowService: WorkflowService
  ) {
  }

  admin_id;
  messageClass;
  message;
  newPost = false;
  loadingworkflows = false;
  processing = false;
  username;
  workflows;
  steps;
  isSteps = false;
  
  getAllworkflows(){
    this.workflowService.getAllworkflows().subscribe(data =>{
      this.workflows = data.workflows;
      this.isSteps = true;
     this.getAllSteps();
      });
    }
  
    getAllSteps(){
      this.workflowService.getAllSteps().subscribe(data =>{
        this.steps = data.steps;
      });
    }

  ngOnInit() {
    this.admin_id = "5a63d668707f7a36a405dfe9";
    this.getAllworkflows();
  }

}
