import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { SsoAuthService } from '../../../services/ssoauth.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowService } from '../../../services/workflow.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {
  message;
  messageClass;
  form;
  options
  newStep = false;
  username;
  loading = true;
  processing = false;
  currentUrl;
  authToken;
  user;
  expiresAt;
  refreshToken;

  workflow = {
    workflowId : String,
    title : String,
    body : String
  }
  step = {
    workflowId : String,
    title : String,
    body : String
  }
  constructor(
    private location : Location,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private workflowService: WorkflowService,
    private ssoAuthService : SsoAuthService,
    private router: Router) { 
      this.createNewstepForm();
  }

  // Function to create new workflow form
  createNewstepForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    })
  }

  // Enable new workflow form
  enableFormNewstepForm() {
    this.form.get('title').enable(); // Enable title field
    this.form.get('body').enable(); // Enable body field
  }

  // Disable new workflow form
  disableFormNewstepForm() {
    this.form.get('title').disable(); // Disable title field
    this.form.get('body').disable(); // Disable body field
  }

  // Validation for title
  alphaNumericValidation(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/); // Regular expression to perform test
    // Check if test returns false or true
    if (regExp.test(controls.value)) {
      return null; // Return valid
    } else {
      return { 'alphaNumericValidation': true } // Return error in validation
    }
  }


    
  goBack(){
      this.location.back();
 }
 onStepSubmit() {
  this.processing = true; // Disable submit button
  this.enableFormNewstepForm(); // Lock form
  // Create workflow object from form fields
  const step = {
    title: this.form.get('title').value, // Title field
    body: this.form.get('body').value, // Body field
    workflowId : this.workflow.workflowId
  }

  // Function to save workflow into database
  this.workflowService.newstep(this.workflow.workflowId, step).subscribe(data => {
    // Check if workflow was saved to database or not
    if (!data.success) {
      this.messageClass = 'alert alert-danger'; // Return error class
      this.message = data.message; // Return error message
      this.processing = false; // Enable submit button
      this.disableFormNewstepForm(); // Enable form
    } else {
      this.messageClass = 'alert alert-success'; // Return success class
      this.message = data.message; // Return success message
      // Clear form data after two seconds
      setTimeout(() => {
        this.newStep= false; // Hide form
        this.processing = false; // Enable submit button
        this.message = false; // Erase error/success message
        this.form.reset(); // Reset all form fields
        this.enableFormNewstepForm(); 
        this.router.navigate(['/workflow']);// Enable the form fields
      }, 2000);
    }
  });
}

  ngOnInit() {
    this.newStep = true;
    this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    // Function to GET current workflow with id in params
    this.workflowService.getSingleWorkflow(this.currentUrl.workflowId).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = 'Workflow not found.'; // Set error message
      } else {
        this.workflow.workflowId = data.workflow._id; // Save workflow object for use in HTML
        this.loading = false; // Allow loading of workflow form
      }
    });
  }

}
