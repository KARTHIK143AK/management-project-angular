import { Routes } from '@angular/router';
import { RegisterListComponent } from './register-list/register-list.component';
import { RegisterCreateComponent } from './register-create/register-create.component';

export const registerRoutes: Routes = [
  {
    path: 'register',
    children: [
      { path: '', component: RegisterListComponent },
      { path: 'create', component: RegisterCreateComponent }
    ]
  }
];