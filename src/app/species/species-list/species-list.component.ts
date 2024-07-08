import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwapiService } from '../../swapi.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.css']
})
export class SpeciesListComponent implements OnInit {
  species: any[] = [];
  filteredSpecies: any[] = [];
  searchTerm: string = '';
  movie: any;
  loading: boolean = false;

  constructor(private swapiService: SwapiService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.movie = navigation.extras.state['movie'];
    }
  }

  ngOnInit() {
    if (this.movie) {
      this.fetchSpecies(this.movie.species);
    }
  }

  fetchSpecies(urls: string[]) {
    this.loading = true;
    const speciesRequests = urls.map(url => this.swapiService.getFromUrl(url));

    forkJoin(speciesRequests).subscribe(
      responses => {
        this.species = responses;
        this.filteredSpecies = this.species;
        this.loading = false; 
      },
      error => {
        console.error('Error fetching species', error);
        this.loading = false; 
      }
    );
  }

  filterSpecies() {
    this.filteredSpecies = this.species.filter(species =>
      species.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
