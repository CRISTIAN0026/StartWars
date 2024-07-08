import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwapiService } from '../../swapi.service';

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
    urls.forEach(url => {
      this.swapiService.getFromUrl(url).subscribe(response => {
        console.log(response)
        this.characters.push(response);
        this.filteredCharacters = this.characters;
      });
    });
  }

  filterCharacters() {
    this.filteredCharacters = this.characters.filter(character =>
      character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

