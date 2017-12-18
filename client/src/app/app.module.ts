import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { WorkflowService } from './services/workflow.service';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { EditWorkflowComponent } from './components/workflow/edit-workflow/edit-workflow.component';
import { DeleteWorkflowComponent } from './components/workflow/delete-workflow/delete-workflow.component';
import { StepComponent } from './components/workflow/step/step.component';
import { ArchwizardModule } from 'ng2-archwizard/dist';
import { RwthssoComponent } from './components/rwthsso/rwthsso.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    WorkflowComponent,
    EditWorkflowComponent,
    DeleteWorkflowComponent,
    StepComponent,
    RwthssoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FlashMessagesModule,
    ArchwizardModule
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard, WorkflowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
