class Weather {
  constructor(city, state, country) {
    this.apikey = '*********************************';
    this.city = city;
    this.state = state;
    this.country = country;
  }

  // Fetch weather from API
  async getWeather() {
    const weathResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state},${this.country},&appid=${this.apikey}&units=imperial`);

    const locResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${this.city},${this.state},${this.country}&appid=${this.apikey}`);

    const weathData = await weathResponse.json();
    const locData = await locResponse.json();

    return [weathData, locData];
  }


  // Change weather location
  changeLocation(city, state, country) {
    this.city = city;
    this.state = state;
    this.country = country;

  }

}
