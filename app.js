
$(document).ready(() => {
  // Store api key for weather API
    const apiKey = "30331a8fd0d5806e0c3503b6a59497d5";
  // get search from html
    const $searchForm = $(".search");
  // get weather info from html
    const $weatherInfo = $("#weatherInfo");
  // Need an event listener, make sure to include prevent default to stop page from refreshing
    $searchForm.on("submit", (event) => {
      event.preventDefault();
  // make it so we can search by city name and output the data from weatherInfo
      const location = $searchForm.find("input[name='city name']").prop ("value");
      location && getWeatherInfo(location);
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
          const weatherInfo = {
            temperature: fahrenheitTemperature,
            description: data.weather[0].description
          };
  // store weatherInfo into displayWeatherInfo
          displayWeatherInfo(weatherInfo);
        })
  // display an error if city name not correct
        .catch(() => {
          $weatherInfo.text("Error retrieving weather information.");
        });
    };
  // convert from celsius to fahrenheit
    const displayWeatherInfo = (weatherInfo) => {
      const { temperature, description } = weatherInfo;
      const fahrenheitTemperature = convertToFarhenheit(temperature);
  // display the temp, and current description of the weather
      const weatherInfoHTML = `
        <h2>Current Weather</h2>
        <p>Temperature: ${temperature}°F</p>
        <p>Description: ${description}</p>
      `;
  // display the weather information on the page
      $weatherInfo.html(weatherInfoHTML);
    };

  // convert from celsius to fahrenheit
    const convertToFarhenheit = (celsiusTemperature) => {
      return (celsiusTemperature * 9 / 5) + 32;
    };
  });