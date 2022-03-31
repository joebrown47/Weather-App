// Init Storage
const storage = new Storage();

// Get stored location data
const weatherLocation = storage.getLocationData();

// Init weather object
const weather = new Weather(weatherLocation.city, weatherLocation.state, weatherLocation.country);

// Init UI
const ui = new UI();

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

// Change Location Event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const country = 'US';

  // Chang location
  weather.changeLocation(city, state, country);

  // Set location in LS
  storage.setLocationData(city, state, country);

  // Get and Display weather
  getWeather();

  // Close Modal
  const myModal = document.getElementById('locModal');
  
  setTimeout(() => {
    const modal = bootstrap.Modal.getInstance(myModal);
    modal.hide();
  }, 500);
  
});

function getWeather() {
  weather.getWeather()
    .then(results => {
      console.log(results);
      ui.paint(results);
    })
    .catch(err => console.log(err));
}
