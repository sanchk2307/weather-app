import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DecimalPipe, NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';

import { WeatherService } from '../../services/weather.service';
import { WeatherData, WeatherResponse } from '../../models/weather.model';

@Component({
  selector: 'app-city-weather',
  imports: [DecimalPipe, NgClass, FontAwesomeModule],
  templateUrl: './city-weather.component.html',
  styleUrl: './city-weather.component.css'
})
export class CityWeatherComponent implements OnInit, OnChanges {
  @Input() cityName?: string;
  @Input() location?: {lat: number, lon: number};
  @Input() disableRemove = false;
  @Input({ required: true }) unit!: string;
  @Output() remove = new EventEmitter<void>();
  weatherService = inject(WeatherService);
  weatherData?: WeatherData;
  isCollapsed = true;
  removeIcon = faCircleMinus;
  

  ngOnInit(): void {
    if (this.location) {
      this.getWeatherDataFromCoordinates(this.location)
    } else 
    if (this.cityName) {
      this.getWeatherData(this.cityName);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['unit'].firstChange && changes['unit'].currentValue !== changes['unit'].previousValue && this.weatherData) {
      this.weatherData = this.weatherService.convertWeatherDataObj(this.weatherData, changes['unit'].currentValue);
    }
  }

  toggleExpandCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  removeCity() {
    this.remove.emit();
  }

  private getWeatherData(cityName: string) {
    this.weatherService.getWeatherData(cityName).subscribe({
      next: (response) => {
        this.weatherData = this.setWeatherDataObj(response);
      }
    })
  }
  private getWeatherDataFromCoordinates(location: {lat: number, lon: number}) {
    this.weatherService.getWeatherDataFromCoordinates(location).subscribe({
      next: (response) => {
        this.weatherData = this.setWeatherDataObj(response);
      }
    })
  }
  private setWeatherDataObj(response: WeatherResponse): WeatherData {
    const weatherDataObj = {
      location: '',
      temp: {
        current: 0,
        feels_like: 0,
        min: 0,
        max: 0
      },
      wind_speed: 0,
      humidity: 0,
      time: {
        current: 0,
        sunrise: 0,
        sunset: 0
      }
    };
    weatherDataObj.location = response.name;
    weatherDataObj.temp = {
      current: response.main.temp,
      feels_like: response.main.feels_like,
      min: response.main.temp_min,
      max: response.main.temp_max
    };
    weatherDataObj.wind_speed = response.wind.speed * 3.6;
    weatherDataObj.humidity = response.main.humidity;
    weatherDataObj.time = {
      current: response.dt,
      sunrise: response.sys.sunrise,
      sunset: response.sys.sunset
    }
    return weatherDataObj;
  }
}
