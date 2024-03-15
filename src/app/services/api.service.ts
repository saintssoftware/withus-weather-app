import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city';
import { Observable, map } from 'rxjs';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly crudEndpoint: string =
    'https://crudcrud.com/api/3b4163e66c964517bfb16484091b998d';
  private readonly resource: string = '/cities';

  constructor(private http: HttpClient) {}

  getAllCities(): Observable<City[]> {
    return this.http.get(this.crudEndpoint + this.resource).pipe(
      map((cities: any) => {
        const savedCities: City[] = [];

        if (cities) {
          cities.forEach((city: any) => {
            const newCity = new City(city?.name);
            newCity.id = city._id;

            if (city?.weathers?.length) {
              city.weathers.forEach((weather: any) => {
                newCity.weathers.push(
                  new Weather(
                    weather.temperature,
                    weather.rainingStatus,
                    weather.date,
                    weather.networkPower,
                    weather.altitude
                  )
                );
              });

              savedCities.push(newCity);
            }
          });
        }

        return savedCities;
      })
    );
  }

  createCity(city: City) {
    return this.http.post(this.crudEndpoint + this.resource, city.toJson());
  }

  updateCity(city: City) {
    return this.http.put(
      this.crudEndpoint + this.resource + '/' + city.id,
      city.toJson()
    );
  }
}
