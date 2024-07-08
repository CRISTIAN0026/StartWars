import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeciesListComponent } from './species-list/species-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SpeciesListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: SpeciesListComponent }
    ]),
     FormsModule
  ]
})
export class SpeciesModule { }
