import { Routes } from '@angular/router';
import { SignUpComponent } from '@pages/(auth)/sign-up/sign-up.component';
import { SignInComponent } from '@pages/(auth)/sign-in/sign-in.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent,  },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];
