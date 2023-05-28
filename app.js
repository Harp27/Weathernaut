$(document).ready(() => {
    const apiKey = "30331a8fd0d5806e0c3503b6a59497d5";
    const $searchForm = $(".Search");
    const $weatherInfo = $("#weatherInfo");
  
    $searchForm.on("submit", (event) => {
      event.preventDefault();
      const location = $searchForm.find("input[name='city name']").prop ("value");
      location && getWeatherInfo(location);
    });
  
    const getWeatherInfo = (location) => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  
      $.ajax({
        url: apiUrl,
        method: "GET"
      })
        .then((data) => {
          const celsiusTemperature = data.main.temp;
          const fahrenheitTemperature = convertToFarhenheit(celsiusTemperature);
          const weatherInfo = {
            temperature: fahrenheitTemperature,
            description: data.weather[0].description
          };
          displayWeatherInfo(weatherInfo);
        })
        .catch(() => {
          $weatherInfo.text("Error retrieving weather information.");
        });
    };
  
    const convertToFarhenheit = (celsiusTemperature) => {
      return (celsiusTemperature * 9 / 5) + 32;
    };
  
    const displayWeatherInfo = (weatherInfo) => {
      const { temperature, description } = weatherInfo;
  
      const weatherInfoHTML = `
        <h2>Current Weather</h2>
        <p>Temperature: ${temperature}°F</p>
        <p>Description: ${description}</p>
      `;
  
      $weatherInfo.html(weatherInfoHTML);
    };
  });