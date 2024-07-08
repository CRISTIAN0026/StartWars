import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../../swapi.service';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {
  vehicles: any[] = [];
  filteredVehicles: any[] = [];
  searchTerm: string = '';

  constructor(private swapiService: SwapiService) { }

  ngOnInit(): void {
    this.fetchVehicles();
  }

  fetchVehicles() {
    this.swapiService.getVehicles().subscribe(data => {
      this.vehicles = data.results;
      this.filteredVehicles = this.vehicles;
    });
  }

  filterVehicles() {
    this.filteredVehicles = this.vehicles.filter(vehicle =>
      vehicle.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
