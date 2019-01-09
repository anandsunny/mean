import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
