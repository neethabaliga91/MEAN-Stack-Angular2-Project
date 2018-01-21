//import { Component, OnInit, ElementRef} from '@angular/core';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SsoAuthService } from '../../services/ssoauth.service';
import { WorkflowService } from '../../services/workflow.service';
declare var $: any;

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
  workflows;
  subprocesses;
  id;
  isSteps = false;

  constructor(
    private formBuilder: FormBuilder,
    private ssoAuthService: SsoAuthService,
    private workflowService: WorkflowService,
    private location : Location/*,
    private _elmRef: ElementRef*/
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
    this.username = this.ssoAuthService.user;
    this.newPost = true; // Show new workflow form
  }

  // Reload workflows on current page
  reloadworkflows() {
    this.loadingworkflows = true; // Used to lock button
   this.getAllworkflows();
    setTimeout(() => {
      this.loadingworkflows = false; // Release button lock after four seconds
    }, 4000);
  }


  // Function to submit a new workflow post
  onworkflowSubmit() {
    this.processing = true; // Disable submit button
    this.disableFormNewworkflowForm(); // Lock form
    let now = new Date();
    // Create workflow object from form fields
    const workflow = {
      title: this.form.get('title').value, // Title field
      body: this.form.get('body').value, // Body field
      createdBy: this.workflowService.username,
      createdAt : now
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
        this.getAllworkflows();
        
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
    this.location.back(); // Clear all variable states
  }

  getAllworkflows(){
  this.workflowService.getAllworkflows().subscribe(data =>{
    this.workflows = data.workflows;
    this.isSteps = true;
   this.getAllSteps();
    });
  }

  getAllSteps(){
    this.workflowService.getAllSteps().subscribe(data =>{
      this.subprocesses = data.steps;
    });
  }
 
 ngOnInit() {

/*  $(this._elmRef.nativeElement).ready(function(){
      
      // Step show event 
      $("#smartwizard").on("showStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
         alert("You are on step "+stepPosition+" now "+ stepNumber);
         if(stepPosition === 'first'){
             $("#prev-btn").addClass('disabled');
         }else if(stepPosition === 'final'){
             $("#next-btn").addClass('disabled');
         }else{
             $("#prev-btn").removeClass('disabled');
             $("#next-btn").removeClass('disabled');
         }
      });
      
      // Toolbar extra buttons
      var btnFinish = $('<button></button>').text('Finish')
                                       .addClass('btn btn-info')
                                       .on('click', function(){ alert('Finish Clicked'); });
      var btnCancel = $('<button></button>').text('Cancel')
                                       .addClass('btn btn-danger')
                                       .on('click', function(){ $('#smartwizard').smartWizard("reset"); });                         
      
      
      // Smart Wizard
      $('#smartwizard').smartWizard({ 
              selected: 0, 
              theme: 'default',
              transitionEffect:'fade',
              showStepURLhash: true,
              toolbarSettings: {toolbarPosition: 'both',
                                toolbarExtraButtons: [btnFinish, btnCancel]
                              }
      });
                                   
      
      // External Button Events
      $("#reset-btn").on("click", function() {
          // Reset wizard
          $('#smartwizard').smartWizard("reset");
          return true;
      });
      
      $("#prev-btn").on("click", function() {
          // Navigate previous
          $('#smartwizard').smartWizard("prev");
          return true;
      });
      
      $("#next-btn").on("click", function() {
          // Navigate next
          $('#smartwizard').smartWizard("next");
          return true;
      });
      
      $("#theme_selector").on("change", function() {
          // Change theme
          $('#smartwizard').smartWizard("theme", $(this).val());
          return true;
      });
      
      // Set selected theme on page refresh
      $("#theme_selector").change();
  });  */ 
  this.ssoAuthService.getProfile().subscribe(profile => {
    this.username = profile.user; // Used when creating new workflow posts and comments
  });
    this.getAllworkflows();
  }

}
