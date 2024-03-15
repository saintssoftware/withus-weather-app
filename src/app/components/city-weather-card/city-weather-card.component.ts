import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { City } from '../../models/city';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContextService } from '../../services/context.service';
import { DateTime } from 'luxon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-city-weather-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, TranslateModule],
  templateUrl: './city-weather-card.component.html',
  styleUrl: './city-weather-card.component.scss',
})
export class CityWeatherCardComponent {
  @Input() city?: City;

  constructor(private context: ContextService) {}

  get lastestWeather() {
    return this.city?.weathers.length
      ? this.city?.weathers.sort((a, b) => (a.date > b.date ? -1 : 1))[0]
      : undefined;
  }

  selectCity() {
    this.context.selectedCity = new City('');
    this.context.selectedCity = this.city;
  }

  getDateLocaleString(date?: DateTime) {
    return date
      ?.setLocale(this.context.selectedLanguage)
      .toLocaleString(DateTime.DATETIME_SHORT);
  }
}
