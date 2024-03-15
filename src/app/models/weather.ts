import { DateTime } from 'luxon';

export class Weather {
  temperature: number;
  rainingStatus: number;
  date: DateTime;
  networkPower: number; // Value 1 to 5
  altitude: number;

  constructor(
    temperature: number,
    rainingStatus: number,
    date: string,
    networkPower: number,
    altitude: number
  ) {
    this.temperature = temperature;
    this.rainingStatus = rainingStatus;
    this.date = DateTime.fromISO(date);
    this.networkPower = networkPower;
    this.altitude = altitude;
  }

  toJson() {
    return {
      temperature: this.temperature,
      rainingStatus: this.rainingStatus,
      date: this.date.toISO(),
      networkPower: this.networkPower,
      altitude: this.altitude,
    };
  }
}
