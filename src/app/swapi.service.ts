import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  private baseUrl: string = 'https://swapi.dev/api/';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}films/`);
  }

  getCharacters(): Observable<any> {
    return this.http.get(`${this.baseUrl}people/`);
  }

  getStarships(): Observable<any> {
    return this.http.get(`${this.baseUrl}starships/`);
  }

  getVehicles(): Observable<any> {
    return this.http.get(`${this.baseUrl}vehicles/`);
  }

  getSpecies(): Observable<any> {
    return this.http.get(`${this.baseUrl}species/`);
  }

  getFromUrl(url: string): Observable<any> {
    return this.http.get(url);
  }
}
