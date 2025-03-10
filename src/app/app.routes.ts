import { Routes } from '@angular/router';
import { SignUpComponent } from '@pages/(auth)/sign-up/sign-up.component';
import { SignInComponent } from '@pages/(auth)/sign-in/sign-in.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    // canActivate: [isSignedInAuthGuard],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    // canActivate: [isSignedInAuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
];
