import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {
  MatIconModule, 
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatGridListModule,
  MatInputModule,
  MatSnackBarModule,
  MatDividerModule,
  MatListModule,
  MatBadgeModule
} from '@angular/material';




@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatSnackBarModule,
    MatDividerModule,
    MatListModule,
    MatBadgeModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatSnackBarModule,
    MatDividerModule,
    MatListModule,
    MatBadgeModule
    
  ]
})
export class AppMaterialModule { }
