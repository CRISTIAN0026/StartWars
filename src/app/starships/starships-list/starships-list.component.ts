import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../../swapi.service';

@Component({
  selector: 'app-starships-list',
  templateUrl: './starships-list.component.html',
  styleUrls: ['./starships-list.component.css']
})
export class StarshipsListComponent implements OnInit {
  starships: any[] = [];
  filteredStarships: any[] = [];
  searchTerm: string = '';

  constructor(private swapiService: SwapiService) { }

  ngOnInit(): void {
    this.fetchStarships();
  }

  fetchStarships() {
    this.swapiService.getStarships().subscribe(data => {
      this.starships = data.results;
      this.filteredStarships = this.starships;
    });
  }

  filterStarships() {
    this.filteredStarships = this.starships.filter(starship =>
      starship.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
