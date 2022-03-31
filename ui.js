class UI {

  constructor() {
    // Retrieving/Assigning all html DOM elements to be used and manipulated in the UI based on weather
    this.todaysDay = document.getElementById('day');
    this.monthYear = document.getElementById('month-year');
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.string = document.getElementById('w-string');
    this.icon = document.getElementById('w-icon');
    this.details = document.getElementById('w-details');
    this.temps = document.getElementById('w-temp-max-min');
    this.feelsLike = document.getElementById('w-feels-like');
    this.sun = document.getElementById('w-sun');
    this.sunHeader = document.getElementById('sun');
    this.sunDesc = document.getElementById('sun-desc');
    this.humidity = document.getElementById('w-humidity');
    this.humDesc = document.getElementById('humidity-desc');
    this.pressure = document.getElementById('w-pressure');
    this.pressDesc = document.getElementById('pressure-desc');
    this.wind = document.getElementById('w-wind');
    this.windDesc = document.getElementById('wind-desc');
    this.visibility = document.getElementById('w-vis');
    this.visDesc = document.getElementById('vis-desc');
    this.body = document.getElementById('body-bg');
    this.box = document.getElementById('info-box');
    this.card = document.getElementById('info-card');
  }

  paint(weather) {
    // Get Timezone Difference (Local Host is on EST)
    const zoneDiff = weather[0].timezone;
    const timeDiff = new Date(zoneDiff*1000);
    const hourDiff = timeDiff.getHours() - 14;

    // Get Sunrise and Sunset Times (12 hour time)
    const sunrise = new Date(weather[0].sys.sunrise*1000);
    const sunriseTime = sunrise.getHours() + hourDiff + ":" + sunrise.getMinutes();
    const sunriseHour = sunrise.getHours() + hourDiff;

    const sunset = new Date(weather[0].sys.sunset*1000);
    const sunsetTime = sunset.getHours() - 12 + hourDiff + ":" + sunset.getMinutes();
    const sunsetHour = sunset.getHours() + hourDiff;

    // Get current date, time, and day
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const today = new Date();
    let day = weekday[today.getDay()];
    let month = months[today.getMonth()];
    const numDay = today.getDate();
    const year = today.getFullYear();
    const hourTime = today.getHours() + hourDiff;

    // Convert F to C and find the Dew Point in F
    const relH = weather[0].main.humidity;
    const tempF = weather[0].main.temp;
    const tempC = ((tempF - 32)*(5/9));
    const dewpC = tempC - ((100 - relH)/5);
    const dewpF = Math.round((dewpC*(9/5)) + 32);

    // Convert Pressure from mb to inHg, set low, normal, high desc
    const pressHg = (weather[0].main.pressure/33.864);

    if(pressHg >= 30.20){
      this.pressDesc.textContent = 'High';

    } else if(pressHg <= 29.80){
      this.pressDesc.textContent = 'Low';

    } else {
      this.pressDesc.textContent = 'Normal';
    }

    // Get the visibility in miles scaled 1-10 and set basic description
    const vis = Math.round((weather[0].visibility)*0.001);

    if(vis === 10){
      this.visDesc.textContent = 'It is perfectly clear out right now';
    } else if(vis <= 8 && vis >= 7){
      this.visDesc.textContent =   `It's clear out right now`;
    } else if(vis <= 6 && vis >= 4){
      this.visDesc.textContent = 'Low';
    } else if(vis <= 3 && vis >= 1){
      this.visDesc.textContent = 'Very low';
    }

    /* Append weather description to visibility description based on weather description ID and low visibility scale 1-6 miles

    Clouds IDs: 801-804 (All cloud conditions)

    Atmosphere IDs: 701-781 (All hazy conditions)

    Snow IDs: 600-622 (All snow conditions)

    Rain/Thunderstorm IDs: 200-531 (All rain conditions)

    */
    const did = weather[0].weather[0].id;

    if((vis <= 6 && vis >= 1) && (did <= 804 && did >= 801)){
      this.visDesc.textContent += ', cloudy conditions could be affecting visibility'
    } else if((vis <= 6 && vis >= 1) && (did <= 781 && did >= 701 )){
      this.visDesc.textContent += ', hazy conditions are affecting visibility';
    } else if((vis <= 6 && vis >= 1) && (did <= 622 && did >= 600)){
      this.visDesc.textContent += ', snowy weather is affecting visibility';
    } else if((vis <= 6 && vis >= 1) && (did <= 531 && did >= 200)){
      this.visDesc.textContent += ', rainy weather is affecting visibility';
    }

    // Set the info for the Sunrise/Sunset UI card
    if(hourTime > sunsetHour || hourTime <= sunriseHour){
      this.sunHeader.textContent = 'Sunrise';
      this.sun.textContent = `${sunriseTime} am`;
      this.sunDesc.textContent = `Sunset will be at ${sunsetTime} pm`;

    } else {
      this.sunHeader.textContent = 'Sunset';
      this.sun.textContent = `${sunsetTime} pm`;
      this.sunDesc.textContent = `Sunrise will be at ${sunriseTime} am`;
    }

    // Get Wind Cardinal Direction from degrees 0-360
    let windDeg = weather[0].wind.deg;

    if (windDeg === 0 || windDeg === 360) {
      this.windDesc.textContent = 'Wind direction is North';
    } else if (windDeg >= 1 && windDeg <= 89  ) {
      this.windDesc.textContent = `Wind direction is ${windDeg}\xB0 NE`
    } else if (windDeg === 90) {
      this.windDesc.textContent = 'Wind direction is East'
    } else if (windDeg >= 91 && windDeg <= 179) {
      this.windDesc.textContent = `Wind direction is ${windDeg - 90}\xB0 SE`
    } else if (windDeg === 180) {
      this.windDesc.textContent = 'Wind direction is South'
    } else if (windDeg >= 181 && windDeg <= 269) {
      this.windDesc.textContent = `Wind direction is ${windDeg - 180}\xB0 SW`
    } else if (windDeg === 270) {
      this.windDesc.textContent = 'Wind direction is West'
    } else if(windDeg >= 271 && windDeg <= 359){
      this.windDesc.textContent = `Wind direction is ${windDeg - 270}\xB0 NW`
    }

    // Change the UI based on weather description
    let weathDesc = weather[0].weather[0].description;

    if(weathDesc === 'clear sky'){
      this.desc.style.color = 'rgb(255, 255, 255)';

    } else{
      this.desc.style.color = 'rgb(165, 165, 165)';
    }

    // Change the UI based on weather temp
    let weathTemp = Math.round(weather[0].main.temp);

    if(weathTemp <= 39){
      this.string.style.color = 'rgb(41, 165, 248)';

    } else if(weathTemp >= 60){
      this.string.style.color = 'rgb(247, 154, 101)';

    } else {
      this.string.style.color = 'white';
    }
    
    // Change the UI based on time of day light and dark
    if(hourTime > sunriseHour && hourTime < sunsetHour){
      // Set Daytime UI style
      this.body.style.backgroundColor = 'rgb(90, 150, 200)';
      this.box.style.backgroundColor = 'rgb(18, 83, 136, 0.8)';

    } else {
      // Set Nighttime UI style
      this.body.style.backgroundColor = 'rgb(31, 54, 73)';
      this.box.style.backgroundColor = 'rgb(54, 54, 54, 0.8)';
    }

    // Painting the UI
    this.todaysDay.textContent = `${numDay} ${day}`;
    this.monthYear.textContent = `${month} ${year}`;
    this.location.textContent = `${weather[0].name}, ${weather[1][0].state}`;
    this.desc.textContent = `${weather[0].weather[0].description}`;
    this.string.textContent = `${Math.round(weather[0].main.temp)} \xB0F`;
    this.icon.setAttribute('src', `http://openweathermap.org/img/wn/${weather[0].weather[0].icon}@2x.png`);
    this.temps.textContent = `H: ${Math.round(weather[0].main.temp_max)}\xB0 | L: ${Math.round(weather[0].main.temp_min)}\xB0`;
    this.feelsLike.textContent = `${Math.round(weather[0].main.feels_like)}\xB0`;
    this.humidity.textContent = `${weather[0].main.humidity}%`;
    this.humDesc.textContent = `The dew point is ${dewpF}\xB0`;
    this.pressure.textContent = `${pressHg.toFixed(2)} inHg`;
    this.wind.textContent = `${Math.round(weather[0].wind.speed)} mph`;
    this.visibility.textContent = `${vis} mi`;
  }
}