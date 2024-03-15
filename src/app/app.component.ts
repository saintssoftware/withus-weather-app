import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Weather } from './models/weather';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CityWeatherCardComponent } from './components/city-weather-card/city-weather-card.component';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import { City } from './models/city';
import { ContextService } from './services/context.service';
import { ApiService } from './services/api.service';
import { MatSelectModule } from '@angular/material/select';
import { AppModule } from './app.module';
import { TranslateModule } from '@ngx-translate/core';
import { CityDetailedComponent } from './components/city-detailed/city-detailed.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CityWeatherCardComponent,
    CityDetailedComponent,
    MatSelectModule,
    AppModule,
    TranslateModule,
  ],
  providers: [ContextService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  cities: City[] = [];
  weatherForm: FormGroup = new FormGroup({
    city: new FormControl('', Validators.required),
    temperature: new FormControl('', Validators.required),
    rainingStatus: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    date: new FormControl(
      DateTime.now().startOf('minute').toISO({
        includeOffset: false,
      }),
      Validators.required
    ),
    networkPower: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
    altitude: new FormControl('', Validators.required),
  });
  selectedLanguage: string = 'pt';

  constructor(private context: ContextService, private api: ApiService) {}

  ngOnInit(): void {
    this.selectedLanguage = this.context.selectedLanguage;
    this.api.getAllCities().subscribe((savedCities) => {
      this.cities = savedCities;
    });
  }

  addWeather() {
    if (this.weatherForm.valid) {
      const city = this.weatherForm.get('city')?.value;
      const temperature = this.weatherForm.get('temperature')?.value;
      const date = this.weatherForm.get('date')?.value;
      const altitude = this.weatherForm.get('altitude')?.value;
      const foundCity = this.cities.find(
        (c) => c.name.toLowerCase() == city.toLowerCase()
      );

      if (foundCity) {
        foundCity.weathers.push(
          new Weather(
            temperature,
            this.rainingStatus?.value,
            date,
            this.networkPower?.value,
            altitude
          )
        );
        this.api.updateCity(foundCity).subscribe();
      } else {
        const newCity = new City(city);
        newCity.weathers.push(
          new Weather(
            temperature,
            this.rainingStatus?.value,
            date,
            this.networkPower?.value,
            altitude
          )
        );
        this.api.createCity(newCity).subscribe(() => {
          this.cities.push(newCity);
        });
        this.api.getAllCities().subscribe((savedCities) => {
          this.cities = savedCities;
        });
      }
    }
  }

  get citiesSorted() {
    return this.cities.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  get rainingStatus() {
    return this.weatherForm.get('rainingStatus');
  }

  get networkPower() {
    return this.weatherForm.get('networkPower');
  }

  get selectedCity() {
    return this.context.selectedCity;
  }

  getDateLocaleString(date?: DateTime) {
    return date
      ?.setLocale(this.context.selectedLanguage)
      .toLocaleString(DateTime.DATETIME_SHORT);
  }

  changeLanguage() {
    this.context.changeLanguage(this.selectedLanguage);
  }
}
