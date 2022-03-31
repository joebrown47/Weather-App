class Storage {
  constructor() {
    this.city;
    this.state;
    this.country;
    this.defaultCity = 'Syracuse';
    this.defaultState = 'NY';
    this.defaultCountry = 'US';
  }

  getLocationData() {
    if(localStorage.getItem('city') === null) {
      this.city = this.defaultCity;
    } else {
      this.city = localStorage.getItem('city');
    }

    if(localStorage.getItem('state') === null) {
      this.state = this.defaultState;
    } else {
      this.state = localStorage.getItem('state');
    }

    if(localStorage.getItem('country') === null) {
      this.country = this.defaultCountry;
    } else {
      this.country = localStorage.getItem('country');
    }

    return {
      city: this.city,
      state: this.state,
      country: this.country
    }

  }

  setLocationData(city, state, country) {
    localStorage.setItem('city', city);
    localStorage.setItem('state', state);
    localStorage.setItem('country', country);

  }
}