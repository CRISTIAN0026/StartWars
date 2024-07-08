import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwapiService } from '../../swapi.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-starships-list',
  templateUrl: './starships-list.component.html',
  styleUrls: ['./starships-list.component.css']
})
export class StarshipsListComponent implements OnInit {
  starships: any[] = [];
  filteredStarships: any[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  movie: any;

  constructor(private swapiService: SwapiService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.movie = navigation.extras.state['movie'];
    }
  }

  ngOnInit(): void {
    if (this.movie) {
      this.fetchStarships(this.movie.starships);
    }
  }

  fetchStarships(urls: string[]) {
    this.loading = true;
    const starshipRequests = urls.map(url => this.swapiService.getFromUrl(url));

    forkJoin(starshipRequests).subscribe(
      responses => {
        this.starships = responses;
        this.filteredStarships = this.starships;
        this.loading = false;
      },
      error => {
        console.error('Error fetching starships:', error);
        this.loading = false;
      }
    );
  }

  filterStarships() {
    this.filteredStarships = this.starships.filter(starship =>
      starship.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
