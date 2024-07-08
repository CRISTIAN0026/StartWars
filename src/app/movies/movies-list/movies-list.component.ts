import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwapiService } from '../../swapi.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  selectedMovie: any = null;
  characters: any[] = [];
  starships: any[] = [];
  vehicles: any[] = [];
  species: any[] = [];
  activeDetail: string = '';

  constructor(private swapiService: SwapiService, private router: Router) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.swapiService.getMovies().subscribe(data => {
      console.log(data);
      this.movies = data.results;
      this.filteredMovies = this.movies;
    });
  }

  filterMovies(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.toLowerCase();
    this.filteredMovies = this.movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm)
    );
  }

  selectMovie(movie: any, detailType: string) {
    this.selectedMovie = movie;
    this.activeDetail = detailType;

    switch (detailType) {
      case 'characters':
        this.router.navigate(['/characters'], { state: { movie } });
        break;
      case 'starships':
        this.router.navigate(['/starships'], { state: { movie } });
        break;
      case 'vehicles':
        this.router.navigate(['/vehicles'], { state: { movie } });
        break;
      case 'species':
        this.router.navigate(['/species'], { state: { movie } });
        break;
    }
  }
}
