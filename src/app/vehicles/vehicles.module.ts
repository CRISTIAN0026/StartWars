import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    VehiclesListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: VehiclesListComponent }
    ]),
    FormsModule
  ]
})
export class VehiclesModule { }
