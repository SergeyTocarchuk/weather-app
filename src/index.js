import _ from 'lodash';
import './style.css';

const currWeather = document.querySelector('.cur-weather');

const searchPlaceBtn = document.getElementById('search');
searchPlaceBtn.addEventListener('click', showWeather);

const selectedPlaceInput = document.getElementById('search-place');
selectedPlaceInput.addEventListener('keypress', handleSearchInput);

function handleSearchInput(e) {
  if (e.key === 'Enter') {
    showWeather();
  }
}

function showWeather() {
  let selectedPlace = selectedPlaceInput.value
  fetch(`https://api.openweathermap.org/data/2.5/find?q=${selectedPlace}&units=metric&appid=4d936a4be60b9f7812c9ca32648afb00`, {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    console.log(response);
    currWeather.innerHTML = `
    <span class="place">${response.list[0].name}</span>
    <div class="weather-img">
      <span class="current-temp">${Math.floor(response.list[0].main.temp)} °</span>
      <img src="http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png">
    </div>
    <span>${response.list[0].weather[0].description}</span>
    <span>min: ${Math.floor(response.list[0].main.temp_min)} °, max: ${Math.floor(response.list[0].main.temp_max)} °</span>`;
  })
}