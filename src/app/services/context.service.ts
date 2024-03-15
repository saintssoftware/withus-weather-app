import { Injectable, LOCALE_ID } from '@angular/core';
import { City } from '../models/city';
import { TranslateService } from '@ngx-translate/core';
import { Settings } from 'luxon';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  selectedCity?: City;
  selectedLanguage: string = 'pt';

  constructor(private translate: TranslateService) {}

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.translate.use(lang);
    Settings.defaultLocale = lang;
  }
}
