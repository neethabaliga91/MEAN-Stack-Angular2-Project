import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { EditWorkflowComponent } from './components/workflow/edit-workflow/edit-workflow.component';
import { DeleteWorkflowComponent } from './components/workflow/delete-workflow/delete-workflow.component';
import { StepComponent } from './components/workflow/step/step.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

// Our Array of Angular 2 Routes
const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent // Default Route
  },
  {
    path: 'dashboard',
    component: DashboardComponent, // Dashboard Route,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'register',
    component: RegisterComponent, // Register Route
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },
  {
    path: 'login',
    component: LoginComponent, // Login Route
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },
  {
    path: 'profile',
    component: ProfileComponent, // Profile Route
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'workflow',
    component: WorkflowComponent, // workflow Route,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'edit-workflow/:id',
    component: EditWorkflowComponent, // Edit workflow Route,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'delete-workflow/:id',
    component: DeleteWorkflowComponent, // delete workflow Route,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'step/:workflowId',
    component: StepComponent, // Step Route,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  { path: '**', component: HomeComponent } // "Catch-All" Route
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
