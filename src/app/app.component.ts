import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

import { CityWeatherComponent } from './components/city-weather/city-weather.component';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CityService } from './services/city.service';
import { CitiesResponse } from './models/city.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CityWeatherComponent, ReactiveFormsModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  form: FormGroup;
  currentLocation?: {lat: number, lon: number};
  cities: string[] = [];
  searchResults: CitiesResponse = [];
  cityService = inject(CityService);
  unit = 'metric';
  
  constructor() {
    this.form = new FormGroup({
      city: new FormControl(''),
    });
  }

  ngOnInit(): void {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }
      });
      this.form.controls['city'].valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((searchString: string) => 
          this.cityService.getCitiesFromSearch(searchString)
        )
      ).subscribe((results) => {
        this.searchResults = results;
      })
  }

  onSelectOption(city: string) {
    this.form.controls['city'].setValue(city);
    this.onSubmit();
  }

  onSubmit() {
    const city = this.form.value.city;
    if (!this.cities.includes(city)) {
      this.cities.push(city);
    }
    this.form.reset();
  }

  removeCity(index: number) {
    this.cities.splice(index, 1);
  }

  convertUnit(unit: string) {
    this.unit = unit;
  }
}
