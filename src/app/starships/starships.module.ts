import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarshipsListComponent } from './starships-list/starships-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StarshipsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: StarshipsListComponent }
    ]),
    FormsModule
  ]
})
export class StarshipsModule { }
