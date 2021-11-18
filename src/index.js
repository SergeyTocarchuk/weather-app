import _ from 'lodash';
import './style.css';

const currWeather = document.querySelector('.cur-weather');
const forecast = document.querySelector('.forecast');

const searchPlaceBtn = document.getElementById('search');
searchPlaceBtn.addEventListener('click', showWeather);

const selectedPlaceInput = document.getElementById('search-place');
selectedPlaceInput.addEventListener('keypress', handleSearchInput);

function handleSearchInput(e) {
  if (e.key === 'Enter') {
    showWeather();
  }
}

function clearInput() {
  selectedPlaceInput.value = "";
  }

function showWeather() {
  let selectedPlace = selectedPlaceInput.value;
  fetch(`https://api.openweathermap.org/data/2.5/find?q=${selectedPlace}&units=metric&appid=4d936a4be60b9f7812c9ca32648afb00`, {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    currWeather.innerHTML = `
      <span class="place">${response.list[0].name}</span>
      <div class="weather-img">
        <span class="current-temp">${Math.floor(response.list[0].main.temp)} °</span>
        <img src="http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png">
      </div>
      <span class="font-color">${response.list[0].weather[0].description}</span>
      <span class="font-color">min: ${Math.floor(response.list[0].main.temp_min)} °, max: ${Math.floor(response.list[0].main.temp_max)} °</span>`;
  })
  .catch(error => {
    console.error('There has been a problem with selected place:', error);
  })
  showForecast();
  clearInput();
}

function showForecast() {
  let selectedPlace = selectedPlaceInput.value;
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedPlace}&units=metric&appid=4d936a4be60b9f7812c9ca32648afb00`, {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    console.log(response);
    forecast.innerHTML = `
      <div class="daily-forecast">
        <span class="day">${convertDateToDay(response.list[0].dt_txt)}</span>
        <span class="day-temp">${Math.floor(response.list[0].main.temp_max)} °</span>
        <span class="night-temp">${Math.floor(response.list[4].main.temp_min)} °</span>
        <img src="http://openweathermap.org/img/wn/${response.list[4].weather[0].icon}@2x.png">
      </div>
      <div class="daily-forecast">
        <span class="day">${convertDateToDay(response.list[8].dt_txt)}</span>
        <span class="day-temp">${Math.floor(response.list[8].main.temp_max)} °</span>
        <span class="night-temp">${Math.floor(response.list[12].main.temp_min)} °</span>
        <img src="http://openweathermap.org/img/wn/${response.list[12].weather[0].icon}@2x.png">
      </div>
      <div class="daily-forecast">
        <span class="day">${convertDateToDay(response.list[16].dt_txt)}</span>
        <span class="day-temp">${Math.floor(response.list[16].main.temp_max)} °</span>
        <span class="night-temp">${Math.floor(response.list[20].main.temp_min)} °</span>
        <img src="http://openweathermap.org/img/wn/${response.list[20].weather[0].icon}@2x.png">
      </div>
      <div class="daily-forecast">
        <span class="day">${convertDateToDay(response.list[24].dt_txt)}</span>
        <span class="day-temp">${Math.floor(response.list[24].main.temp_max)} °</span>
        <span class="night-temp">${Math.floor(response.list[28].main.temp_min)} °</span>
        <img src="http://openweathermap.org/img/wn/${response.list[28].weather[0].icon}@2x.png">
      </div>
      <div class="daily-forecast">
        <span class="day">${convertDateToDay(response.list[32].dt_txt)}</span>
        <span class="day-temp">${Math.floor(response.list[32].main.temp_max)} °</span>
        <span class="night-temp">${Math.floor(response.list[36].main.temp_min)} °</span>
        <img src="http://openweathermap.org/img/wn/${response.list[36].weather[0].icon}@2x.png">
      </div>`;
  })
}

function convertDateToDay(date) {
  let day = new Date(date).toString().split(' ')[0];

  if (day === 'Mon') {
    day = 'Monday';
  } else if (day === 'Tue') {
    day = 'Tuesday';
  } else if (day === 'Wed') {
    day = 'Wednesday';
  } else if (day === 'Thu') {
    day = 'Thursday';
  } else if (day === 'Fri') {
    day = 'Friday';
  } else if (day === 'Sat') {
    day = 'Saturday';
  } else if (day === 'Sun') {
    day = 'Sunday';
  }
  return day;
}