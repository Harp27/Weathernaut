
$(document).ready(() => {
  // Store api key for weather API
    const apiKey = "2e4a3eb25a6a8ea367ff9fb0852e3f6c";
  // get search from html
    const $searchForm = $(".search");
  // get weather info from html
    const $weatherInfo = $("#weatherInfo");
  // Need an event listener, make sure to include prevent default to stop page from refreshing
    $searchForm.on("submit", (event) => {
      event.preventDefault();
  // make it so we can search by city name and output the data from weatherInfo
      const location = $searchForm.find("input[name='city name']").prop("value");
      location && getWeatherInfo(location);
    // resets search bar after input
      $searchForm.trigger("reset");
    });
  // create a function for location for city name:
    const getWeatherInfo = (location) => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  
      $.ajax({
        url: apiUrl,
        method: "GET"
      })
  // convert celsius to fahrenheit
        .then((data) => {
          const celsiusTemperature = data.main.temp;
          const fahrenheitTemperature = convertToFarheneit(celsiusTemperature);
          const weatherInfo = {
            cityName: location,
            temperature: fahrenheitTemperature,
            description: data.weather[0].description
          };
  // store weatherInfo into displayWeatherInfo
          displayWeatherInfo(weatherInfo);
        })
  // display an error if city name not correct
        .catch((error) => {
          if (error.responseJSON && error.responseJSON.cod === "404") {
            displayErrorModal();
          }
        });
    };
  // convert from celsius to fahrenheit
    const displayWeatherInfo = (weatherInfo) => {
      const { cityName, temperature, description } = weatherInfo;

  // display the temp, and current description of the weather; added current weather in "City Name"
      const weatherInfoHTML = `
        <h2>Current Weather in ${cityName}</h2>
        <div class="weather-details">
        <img src="${weatherImg(description)}" alt="${description}">
        <div class="weather-info">
        <p>Temperature: ${temperature}°F</p>
        <p>Description: ${description}</p>
        </div>
        </div>
      `;
  // display weather information on the page
      $weatherInfo.html(weatherInfoHTML);
    };

    const weatherImg = (description) => {
      const imageMapping = {
        "clear sky": "./images/clearsky.png",
        "shower rain": "./images/rain.png",
        "rain": "./images/rain.png",
        "few clouds": "./images/fewclouds.png",
        "broken clouds": "./images/fewclouds.png",
        "scattered clouds": "./images/fewclouds.png",
        "thunderstorm": "./images/thunderstorm.png",
        "snow": "./images/snow.png",
        "mist": "./images/mist.png",
        "overcast clouds": "./images/fewclouds.png"
      };
      if (description.toLowerCase() in imageMapping) {
        return imageMapping[description.toLowerCase()];
      }
      return "./images/clearsky.png";
    };
  // convert from celsius to fahrenheit using equation
    const convertToFarheneit = (celsiusTemperature) => {
  // remove decimals, print only whole number
      return Math.round(celsiusTemperature * 9 / 5) + 32;
    };
    // page starts with weather in New York
    getWeatherInfo("New York");
    // add event listener for modal
    const displayErrorModal = () => {
      const modal = document.getElementById("errorModal");
      modal.style.display = "block"
    };
  });

  const $errorModal = $("#errorModal");
  const $closeButton = $(".close");
  $closeButton.on("click", () => {
    $errorModal.hide();
  });



