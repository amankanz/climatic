// weather API Key
// 54730632bf3873e3879ae4a3a5351e06

const date = document.getElementById("date");
const city = document.getElementById("city");
const tempImg = document.getElementById("tempImg");
const description = document.getElementById("description");
const temp = document.getElementById("temp");
const tempMax = document.getElementById("tempMax");
const tempMin = document.getElementById("tempMin");
const loaderState = (document.getElementById("loader").hidden = true);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let dateObj = new Date();
let month = months.at(dateObj.getUTCMonth());
let dayDate = dateObj.getUTCDate();
let day = daysOfWeek.at(dateObj.getUTCDay());
let year = dateObj.getUTCFullYear();
console.log(dateObj);
console.log(month, day, dayDate, year);

date.textContent = `${day}, ${dayDate} ${month} ${year}`;

const app = document.getElementById("app");

const img = document.createElement("img");

function loading() {
  document.getElementById("info").hidden = true;
  document.getElementById("loader").hidden = false;
}

function completeLoading() {
  document.getElementById("info").hidden = false;
  document.getElementById("loader").hidden = true;
}

async function getWeather() {
  const apiKey = "54730632bf3873e3879ae4a3a5351e06";

  const cityName = document.getElementById("searchBarInput").value;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  !cityName ? loaderState : loading();

  try {
    if (!cityName) {
      {
        city.textContent = `No city given`;
        return;
      }
    }

    const weatherDataFetched = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    const weatherData = await weatherDataFetched.json();
    console.log(weatherData);

    city.textContent = `${weatherData.name}`;

    img.src = `https://openweathermap.org/img/wn/${
      weatherData.weather.at(0).icon
    }@2x.png`;
    img.alt = "Weather Icon";

    tempImg.appendChild(img);

    description.textContent = `${weatherData.weather.at(0).main}`;

    temp.textContent = `${Math.round(weatherData.main.temp)}°C`;
    tempMax.textContent = `${weatherData.main.temp_max}°C`;
    tempMin.textContent = `${weatherData.main.temp_min}°C`;

    completeLoading();
  } catch (error) {
    "Error: ", error;
  }
}

document.getElementById("searchIcon").addEventListener("click", getWeather);
