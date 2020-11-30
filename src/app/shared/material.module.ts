import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ]
})
export class MaterialModule { }
