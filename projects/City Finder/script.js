// script.js
const map = L.map('map').setView([0, 0], 2); // Default view

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function showCityMap() {
    const cityInput = document.getElementById('cityInput').value;
    getCoordinates(cityInput, function (coordinates) {
        map.setView(coordinates, 12);
    });
}

function getCoordinates(cityName, callback) {
    if (cityName.toLowerCase() === 'new york') {
        callback([40.7128, -74.006]); 
    } else {
        callback([0, 0]);
    }
}
