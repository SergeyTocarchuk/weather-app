import _ from 'lodash';
import './style.css';

const place = document.querySelector('.show-place');
const img = document.querySelector('img');

fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=4d936a4be60b9f7812c9ca32648afb00`, {mode: 'cors'})
.then(function(response) {
  return response.json();
})
.then(function(response) {
  console.log(response);
  place.innerHTML = `
  <span>${response.name}</span>
  <br>
  <span>${response.weather[0].description}</span>
  <br>
  <span>${response.main.temp} C</span>
  <br>
  <span>min: ${response.main.temp_min} C, max: ${response.main.temp_max} C</span>
  `;
})