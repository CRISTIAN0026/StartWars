import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MoviesListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MoviesListComponent }
    ])
  ]
})
export class MoviesModule { }
