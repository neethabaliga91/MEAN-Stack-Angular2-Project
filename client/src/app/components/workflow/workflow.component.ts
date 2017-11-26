import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { workflowService } from '../../services/workflow.service';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {

  messageClass;
  message;
  newPost = false;
  loadingworkflows = false;
  form;
  processing = false;
  username;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private workflowService: workflowService
  ) {
    this.createNewworkflowForm(); // Create new workflow form on start up
  }

  // Function to create new workflow form
  createNewworkflowForm() {
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
  enableFormNewworkflowForm() {
    this.form.get('title').enable(); // Enable title field
    this.form.get('body').enable(); // Enable body field
  }

  // Disable new workflow form
  disableFormNewworkflowForm() {
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

  // Function to display new workflow form
  newworkflowForm() {
    this.newPost = true; // Show new workflow form
  }

  // Reload workflows on current page
  reloadworkflows() {
    this.loadingworkflows = true; // Used to lock button
    // Get All workflows
    setTimeout(() => {
      this.loadingworkflows = false; // Release button lock after four seconds
    }, 4000);
  }

  // Function to post a new comment on workflow post
  draftComment() {

  }

  // Function to submit a new workflow post
  onworkflowSubmit() {
    this.processing = true; // Disable submit button
    this.disableFormNewworkflowForm(); // Lock form

    // Create workflow object from form fields
    const workflow = {
      title: this.form.get('title').value, // Title field
      body: this.form.get('body').value, // Body field
      createdBy: this.username // CreatedBy field
    }

    // Function to save workflow into database
    this.workflowService.newworkflow(workflow).subscribe(data => {
      // Check if workflow was saved to database or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error class
        this.message = data.message; // Return error message
        this.processing = false; // Enable submit button
        this.enableFormNewworkflowForm(); // Enable form
      } else {
        this.messageClass = 'alert alert-success'; // Return success class
        this.message = data.message; // Return success message
        // Clear form data after two seconds
        setTimeout(() => {
          this.newPost = false; // Hide form
          this.processing = false; // Enable submit button
          this.message = false; // Erase error/success message
          this.form.reset(); // Reset all form fields
          this.enableFormNewworkflowForm(); // Enable the form fields
        }, 2000);
      }
    });
  }

  // Function to go back to previous page
  goBack() {
    window.location.reload(); // Clear all variable states
  }

  ngOnInit() {
    // Get profile username on page load
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new workflow posts and comments
    });
  }

}