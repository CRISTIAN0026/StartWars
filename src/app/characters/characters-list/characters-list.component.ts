import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwapiService } from '../../swapi.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];
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
      this.fetchCharacters(this.movie.characters);
    }
  }

  fetchCharacters(urls: string[]) {
    this.loading = true; 
    const characterRequests = urls.map(url => this.swapiService.getFromUrl(url));

    forkJoin(characterRequests).subscribe(
      responses => {
        this.characters = responses;
        this.filteredCharacters = this.characters;
        this.loading = false; 
      },
      error => {
        console.error('Error fetching characters', error);
        this.loading = false; 
      }
    );
  }

  filterCharacters() {
    this.filteredCharacters = this.characters.filter(character =>
      character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
