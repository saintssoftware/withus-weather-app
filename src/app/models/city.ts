import { Weather } from './weather';

export class City {
  id: number = 0;
  name: string;
  weathers: Weather[] = [];

  constructor(name: string) {
    this.name = name;
  }

  toJson() {
    return {
      name: this.name,
      weathers: this.weathers.map((weather) => weather.toJson()),
    };
  }
}
