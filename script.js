const API_KEY = "620c8e0158ed5f63fe5f76798a881f79"; 
let currentCity = ""; // keep track of active city

// Fetch weather by city name
function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  const request = new XMLHttpRequest();
  request.open("GET", url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      let obj = JSON.parse(this.response);
      console.log(obj);

      // update currentCity
      currentCity = obj.name;

      // update UI
      document.getElementById("city").innerHTML = `${obj.name}, ${obj.sys.country}`;
      document.getElementById("temperature").innerHTML =
        "🌡 " + Math.round(obj.main.temp - 273.15) + "<sup>°</sup>C";
      document.getElementById("humidity").innerHTML =
        "💧 Humidity: " + obj.main.humidity + "%";
      document.getElementById("wind").innerHTML =
        "🌬 Wind: " + obj.wind.speed + " m/s";
      document.getElementById("icon").src =
        "https://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";
    } else {
      document.getElementById("city").innerHTML = "City not found!";
    }
  };

  request.onerror = function () {
    console.log("Request failed!");
  };

  request.send();
}

// Fetch weather by geolocation
function fetchWeatherByLocation(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  const request = new XMLHttpRequest();
  request.open("GET", url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      let obj = JSON.parse(this.response);
      console.log(obj);

      // update currentCity
      currentCity = obj.name;

      // update UI
      document.getElementById("city").innerHTML = `${obj.name}, ${obj.sys.country}`;
      document.getElementById("temperature").innerHTML =
        "🌡 " + Math.round(obj.main.temp - 273.15) + "<sup>°</sup>C";
      document.getElementById("humidity").innerHTML =
        "💧 Humidity: " + obj.main.humidity + "%";
      document.getElementById("wind").innerHTML =
        "🌬 Wind: " + obj.wind.speed + " m/s";
      document.getElementById("icon").src =
        "https://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";
    } else {
      document.getElementById("city").innerHTML = "Location not available!";
    }
  };

  request.onerror = function () {
    console.log("Request failed!");
  };

  request.send();
}

// Get user location and fetch weather
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByLocation(position.coords.latitude, position.coords.longitude);
      },
      () => {
        // fallback = Ranchi
        fetchWeatherByCity("Ranchi");
      }
    );
  } else {
    fetchWeatherByCity("Ranchi");
  }
}

// Events
document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("searchCity").value.trim();
  if (city) {
    fetchWeatherByCity(city);
  }
});

document.getElementById("refresh").addEventListener("click", () => {
  if (currentCity) {
    fetchWeatherByCity(currentCity); // refresh current city
  } else {
    getUserLocation(); // fallback to user location
  }
});

// Load default weather on page load
window.onload = getUserLocation;
