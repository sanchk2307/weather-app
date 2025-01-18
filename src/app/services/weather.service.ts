import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { WeatherData, WeatherResponse } from '../models/weather.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
  API_KEY = '';

  http = inject(HttpClient);

  getWeatherData(cityName: string): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(this.BASE_URL, {
      params: new HttpParams()
        .set('q', cityName)
        .set('units','metric')
        .set('APPID', this.API_KEY)
    })
  }

  getWeatherDataFromCoordinates(location: {lat: number, lon: number}): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(this.BASE_URL, {
      params: new HttpParams()
        .set('lat', location.lat)
        .set('lon', location.lon)
        .set('units','metric')
        .set('APPID', this.API_KEY)
    })
  }

  convertWeatherDataObj(weatherData: WeatherData, unit: string): WeatherData {
   weatherData.temp.current = this.convertTemp(weatherData.temp.current, unit);
   weatherData.temp.feels_like = this.convertTemp(weatherData.temp.feels_like, unit);
   weatherData.temp.max = this.convertTemp(weatherData.temp.max, unit);
   weatherData.temp.min = this.convertTemp(weatherData.temp.min, unit);
   weatherData.wind_speed = this.convertSpeed(weatherData.wind_speed, unit);
   return weatherData;
  }

  private convertTemp(temp: number, unit: string) {
   if (unit === 'metric') {
      return (temp - 32) * 5/9;
   } else {
      return (temp * 9/5) + 32;
   }
  }
  private convertSpeed(speed: number, unit: string) {
   if (unit === 'metric') {
      return speed * 1.609;
   } else {
      return speed / 1.609;
   }
  }
}
