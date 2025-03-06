import { Routes } from '@angular/router';
import { SignUpComponent } from '@pages/(auth)/sign-up/sign-up.component';
import { SignInComponent } from '@pages/(auth)/sign-in/sign-in.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
