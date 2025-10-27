import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterListComponent } from './features/dashboards/register/register-list/register-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', loadChildren: () => import('./features/dashboards/dashboard-layout/dashboard-routing.module').then(m => m.DashboardRoutingModule) },
  // { path: 'register', component: RegisterListComponent }
];