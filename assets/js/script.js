var weatherContainerEl = document.querySelector("#current-container");


var getCityWeather = function (city) {
    var apiKey = "dcbc862bcf16c64fe76c5467e987cbd0"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
        .catch((error) => console.log(error));

}

var displayWeather = function (weather) {
    var temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
    temperatureEl.classList = "list-group-item";

    weatherContainerEl.appendChild(temperatureEl);

    var windEl = document.createElement("span");
    windEl.textContent = "Wind: " + weather.wind.speed + " MPH";
    windEl.classList = "list-group-item";

    weatherContainerEl.appendChild(windEl);

    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity " + weather.main.humidity + "%";
    humidityEl.classList = "list-group-item";

    weatherContainerEl.appendChild(humidityEl);


};

var citySearch = function () {
    getCityWeather(document.querySelector("#city-search-value").value);
}

document.querySelector("#city-search-btn").addEventListener("click", function () {
    console.log("search button works");
    citySearch();
});


