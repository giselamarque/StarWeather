// Weather API

var getCityWeather = function(city){
    
    var apiKey = "cd6ebd3bf1014520af94c5286636bc87"
    var apiURL = `https://api.openweathermap.org/data/2.5/onecall?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    
    function getWeatherForecast() {
        // Get the city input from the user
        var city = document.getElementById("city").value;
        
        // Call the weather API using fetch
        fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=cd6ebd3bf1014520af94c5286636bc87')
          .then(response => response.json())
          .then(data => {
            // Clear the current forecast
            document.getElementById("forecast").innerHTML = "";
            
            // Loop through the forecast data and display the results
            for (var i = 0; i < data.list.length; i++) {
              var forecast = data.list[i];
              var date = new Date(forecast.dt * 1000);
              var day = date.toLocaleDateString();
              var weather = forecast.weather[0].main;
              var temp = forecast.main.temp;
              var minTemp = forecast.main.temp_min;
              var maxTemp = forecast.main.temp_max;
              
              // Add a new row to the forecast table
              var table = document.getElementById("forecast");
              var row = table.insertRow();
              var dayCell = row.insertCell(0);
              var weatherCell = row.insertCell(1);
              var tempCell = row.insertCell(2);
              var minTempCell = row.insertCell(3);
              var maxTempCell = row.insertCell(4);
              dayCell.innerHTML = day;
              weatherCell.innerHTML = weather;
              tempCell.innerHTML = temp;
              minTempCell.innerHTML = minTemp;
              maxTempCell.innerHTML = maxTemp;
            }
          });
      }

}