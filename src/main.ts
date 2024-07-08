import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      RouterModule.forRoot([
        { path: 'movies', loadChildren: () => import('./app/movies/movies.module').then(m => m.MoviesModule) },
        { path: 'characters', loadChildren: () => import('./app/characters/characters.module').then(m => m.CharactersModule) },
        { path: 'starships', loadChildren: () => import('./app/starships/starships.module').then(m => m.StarshipsModule) },
        { path: 'vehicles', loadChildren: () => import('./app/vehicles/vehicles.module').then(m => m.VehiclesModule) },
        { path: 'species', loadChildren: () => import('./app/species/species.module').then(m => m.SpeciesModule) },
        { path: '', redirectTo: '/movies', pathMatch: 'full' },
        { path: '**', redirectTo: '/movies' }
      ])
    )
  ]
})
  .catch(err => console.error(err));
