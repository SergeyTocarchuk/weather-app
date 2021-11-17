import _ from 'lodash';
import './style.css';

const place = document.querySelector('.show-place');
const selectedPlaceInput = document.getElementById('search-place');

const searchPlaceBtn = document.getElementById('search');
searchPlaceBtn.addEventListener('click', showWeather);

function showWeather() {
  let selectedPlace = selectedPlaceInput.value
  fetch(`https://api.openweathermap.org/data/2.5/find?q=${selectedPlace}&units=metric&appid=4d936a4be60b9f7812c9ca32648afb00`, {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    console.log(response);
    place.innerHTML = `
    <span>${response.list[0].name}</span>
    <br>
    <span>${response.list[0].weather[0].description}</span>
    <br>
    <span>${response.list[0].main.temp} C</span>
    <br>
    <span>min: ${response.list[0].main.temp_min} C, max: ${response.list[0].main.temp_max} C</span>`;
  })
}