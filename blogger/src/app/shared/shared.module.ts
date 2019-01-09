import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../modules/app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [],
  exports: [
    CommonModule,
    AppMaterialModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
