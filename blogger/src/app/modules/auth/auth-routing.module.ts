import { NgModule } from '@angular/core';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { AuthGuard } from '../../guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
