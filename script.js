// Data => Done
// Variable to Store the Element => Done
// Function to get the data from weather app
// Manipluate the varibe of already created element

let data;
document.querySelector(".temp-container").style.display = "none";
const inputBox = document.getElementById("inputBox");
const countryName = document.getElementById("countryName");
const stateName = document.getElementById("stateName");
const cityName = document.querySelectorAll(".location");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const windDirection = document.getElementById("windDirection");
const temprature = document.getElementById("temprature");
const logoImage = document.getElementById("logoImage");
const weatherStatus = document.getElementById("weatherStatus");
const weatherBox = document.querySelector(".searchData");
const livetime = document.getElementById("livetime");
const livedate = document.getElementById("livedate");
const main = document.querySelector("main");
const timeZone = document.getElementById("timeZone");
const localTime = document.getElementById("time");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const hourlyTemp = document.querySelectorAll(".temp-degree");
const minTemp = document.querySelectorAll(".mintemp");
const maxTemp = document.querySelectorAll(".maxtemp");
const futureDate = document.querySelectorAll(".future-date");
const nextSunrise = document.querySelectorAll(".sunrise");
const nextSunset = document.querySelectorAll(".sunset");
const tempLoading = document.querySelectorAll(".loading");

const getData = async (event) => {
  try {
    event.preventDefault();
    if (!inputBox.value) {
      alert("Please Enter The City Name: ");
      return;
    }

    //
    const city = inputBox.value;

    // Fetch Details
    countryName.innerHTML = "Updating....";
    tempLoading.forEach((element) => {
      element.innerText = "Updating....";
    });
    const fetchData = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=3b6fa2ae2fef43e3bb5163813231102&q=${city}&days=6`
    );

    const orgData = await fetchData.json();
    data = orgData;
    console.log(data);
    if (weatherBox.submit) {
      document.querySelector(".temp-container").style.display = "block";
    } else {
      document.querySelector(".temp-container").style.display = "none";
    }
    // Displaying the data in HTML

    countryName.innerHTML = data.location.country;
    stateName.innerHTML = data.location.region;
    humidity.innerHTML = data.current.humidity;
    windSpeed.innerHTML = `${data.current.wind_kph} Km/h`;
    windDirection.innerHTML = data.current.wind_dir;
    temprature.innerHTML = data.current.temp_c;
    logoImage.src = data.current.condition.icon;
    weatherStatus.innerHTML = data.current.condition.text;
    timeZone.innerHTML = data.location.tz_id;
    localTime.innerHTML = data.location.localtime;
    sunrise.innerHTML = data.forecast.forecastday[0].astro.sunrise;
    sunset.innerHTML = data.forecast.forecastday[0].astro.sunset;

    //fetching location for each element
    cityName.forEach((element) => {
      element.innerHTML = data.location.name;
    });

    const getTemp = (num) => {
      return data.forecast.forecastday[0].hour[num].temp_c;
    };

    // fetching temprature based on certain hour
    const getHourlyTemp = () => {
      hourlyTemp[0].innerHTML = `${getTemp(0)}<sup>o</sup>`;
      hourlyTemp[1].innerHTML = `${getTemp(4)}<sup>o</sup>`;
      hourlyTemp[2].innerHTML = `${getTemp(8)}<sup>o</sup>`;
      hourlyTemp[3].innerHTML = `${getTemp(12)}<sup>o</sup>`;
      hourlyTemp[4].innerHTML = `${getTemp(16)}<sup>o</sup>`;
      hourlyTemp[5].innerHTML = `${getTemp(20)}<sup>o</sup>`;
      hourlyTemp[6].innerHTML = `${getTemp(23)}<sup>o</sup>`;
    };
    getHourlyTemp();
    const futureForcast = () => {
      for (let i = 0; i < 5; i++) {
        futureDate[i].innerText = data.forecast.forecastday[i + 1].date;
        minTemp[i].innerHTML = `${
          data.forecast.forecastday[i + 1].day.mintemp_c
        } <sup>o</sup>C`;
        maxTemp[i].innerHTML = `${
          data.forecast.forecastday[i + 1].day.maxtemp_c
        } <sup>o</sup>C`;
        nextSunrise[i].innerHTML =
          data.forecast.forecastday[i + 1].astro.sunrise;
        nextSunset[i].innerHTML = data.forecast.forecastday[i + 1].astro.sunset;
      }
    };

    futureForcast();
  } catch (error) {
    alert("Please check the spelling of the city you have entered");
    location.reload();
  }
};

let date = new Date();

const setdate = new Intl.DateTimeFormat(navigator.language, {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(date);
livedate.textContent = setdate;

setInterval(() => {
  date = new Date();
  const settime = new Intl.DateTimeFormat(navigator.language, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(date);
  livetime.textContent = settime;
}, 1000);
