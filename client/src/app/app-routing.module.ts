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
import { NotAuthGuard } from './guards/notAuth.guard';
import { AuthGuard } from './guards/auth.guard';
import { RwthssoComponent } from 'app/components/rwthsso/rwthsso.component';

// Our Array of Angular 2 Routes
const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'workflow',
    component: WorkflowComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'loginSSO',
    component: RwthssoComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'edit-workflow/:id',
    component: EditWorkflowComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'delete-workflow/:id',
    component: DeleteWorkflowComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'step/:workflowId',
    component: StepComponent,
    canActivate: [AuthGuard]
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
