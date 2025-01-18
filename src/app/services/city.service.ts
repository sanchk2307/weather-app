import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { CitiesResponse } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  BASE_URL = 'https://city-and-state-search-api.p.rapidapi.com/cities/search';
  RAPID_API_KEY = {
    name: 'x-rapidapi-key',
    value: ''
  }
  RAPID_API_HOST = {
    name: 'x-rapidapi-host',
    value: 'city-and-state-search-api.p.rapidapi.com'
  }

  http = inject(HttpClient);

  getCitiesFromSearch(searchString: string) {
   if (!searchString) {
     return of([])
   }
   return this.http.get<CitiesResponse>(this.BASE_URL, {
   headers: new HttpHeaders()
      .set(this.RAPID_API_KEY.name, this.RAPID_API_KEY.value)
      .set(this.RAPID_API_HOST.name, this.RAPID_API_HOST.value),
   params: new HttpParams().set('q', searchString)
   })
  }
}
