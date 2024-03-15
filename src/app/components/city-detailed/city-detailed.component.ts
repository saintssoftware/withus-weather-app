import { Component, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContextService } from '../../services/context.service';
import { DateTime } from 'luxon';
import { City } from '../../models/city';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-detailed',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatTableModule],
  templateUrl: './city-detailed.component.html',
  styleUrl: './city-detailed.component.scss',
})
export class CityDetailedComponent {
  @Input() city?: City;
  displayedColumns: string[] = [
    'date',
    'temperature',
    'rainingStatus',
    'networkPower',
    'altitude',
  ];

  constructor(private context: ContextService) {}

  getDateLocaleString(date?: DateTime) {
    return date
      ?.setLocale(this.context.selectedLanguage)
      .toLocaleString(DateTime.DATETIME_SHORT);
  }
}
