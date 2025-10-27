import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { HomeComponent } from '../home/home.component';
import { registerRoutes } from '../register/register.routes';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent, // wrapper with navbar + sidebar
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      ...registerRoutes
      // you can add more child routes here
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}