// Weather API

var getCityWeather = function(city){
    
    var apiKey = "cd6ebd3bf1014520af94c5286636bc87"
    var apiURL = `https://api.openweathermap.org/data/2.5/onecall?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

var formSubmitHandler = function(event){
    event.preventDefault();
    var city = cityInputEl.value.trim();

    if(city){
        getCityWeather(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city");
    }
}

var saveSearch = function(){
    
    localStorage.setItem("cities", JSON.stringify(cities));
};

var displayWeather = function(weather, searchCity){
    // clear old content
    forecastContainerEl.textContent = "";
    currentContainerEl.textContent = "";

    // format date
    var currentDate = moment().format("M/D/YYYY");

    // create html content for current weather
    var currentWeatherEl = document.createElement("div");
    currentWeatherEl.classList = "card bg-primary text-light m-4";

    var cardBodyEl = document.createElement("div");
    cardBodyEl.classList = "card-body";

    var cityEl = document.createElement("h3");
    cityEl.classList = "card-title";
    cityEl.textContent = searchCity + " (" + currentDate + ")";

    var temperatureEl = document.createElement("p");
    temperatureEl.classList = "card-text";
    temperatureEl.textContent = "Temperature: " + weather.current.temp + " °F";

    var humidityEl = document.createElement("p");
    humidityEl.classList = "card-text";
    humidityEl.textContent = "Humidity: " + weather.current.humidity + "%";

    var windSpeedEl = document.createElement("p");
    windSpeedEl.classList = "card-text";
    windSpeedEl.textContent = "Wind Speed: " + weather.current.wind_speed + " MPH";

    
    // append to page
    cityEl.appendChild(weatherIcon);
    cardBodyEl.appendChild(cityEl);
    cardBodyEl.appendChild(temperatureEl);
    cardBodyEl.appendChild(humidityEl);
    cardBodyEl.appendChild(windSpeedEl);
    currentWeatherEl.appendChild(cardBodyEl);
    currentContainerEl.appendChild(currentWeatherEl);

    // call future forecast
    getForecast(searchCity);
}
