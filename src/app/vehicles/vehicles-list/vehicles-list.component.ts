import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwapiService } from '../../swapi.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {
  vehicles: any[] = [];
  filteredVehicles: any[] = [];
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
      this.fetchVehicles(this.movie.vehicles);
    }
  }

  fetchVehicles(urls: string[]) {
    this.loading = true;
    const vehicleRequests = urls.map(url => this.swapiService.getFromUrl(url));

    forkJoin(vehicleRequests).subscribe(
      responses => {
        this.vehicles = responses;
        this.filteredVehicles = this.vehicles;
        this.loading = false;
      },
      error => {
        console.error('Error fetching vehicles:', error);
        this.loading = false;
      }
    );
  }

  filterVehicles() {
    this.filteredVehicles = this.vehicles.filter(vehicle =>
      vehicle.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
