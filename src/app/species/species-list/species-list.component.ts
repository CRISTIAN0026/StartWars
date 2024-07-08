import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwapiService } from '../../swapi.service';

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
    urls.forEach(url => {
      this.swapiService.getFromUrl(url).subscribe(response => {
        console.log(response);
        this.species.push(response);
        this.filteredSpecies = this.species;
      });
    });
  }

  filterSpecies() {
    this.filteredSpecies = this.species.filter(species =>
      species.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
