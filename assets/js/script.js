var weatherContainerEl = document.querySelector("#current-container");
var citySearchInputEl = document.querySelector("#current-city");
var fiveDayContainerEl = document.querySelector("#five-day-container");


var getCityWeather = function (city) {
    var apiKey = "dcbc862bcf16c64fe76c5467e987cbd0"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
        .catch((error) => console.log(error));

}

var displayWeather = function (weather) {

    weatherContainerEl.textContent = "";
    citySearchInputEl.textContent = "";

    var currentCity = document.createElement("span")
    currentCity.textContent = (document.querySelector("#city-search-value").value);

    citySearchInputEl.appendChild(currentCity);

    var currentDate = document.createElement("span")
    currentDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";

    citySearchInputEl.appendChild(currentDate);

    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);

    citySearchInputEl.appendChild(weatherIcon);

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

var getFiveDay = function (city) {
    var apiKey = "dcbc862bcf16c64fe76c5467e987cbd0"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => displayFiveWeather(data))
        .catch((error) => console.log(error));

}

var displayFiveWeather = function (weather) {

    var weather = weather.list;
    for (var i = 5; i < weather.length; i = i + 8) {
        var dailyWeather = weather[i];

        var fiveDayWeatherEl = document.createElement("div");

        var fiveDayDate = document.createElement("h5")
        fiveDayDate.textContent = moment.unix(dailyWeather.dt).format("MMM D, YYYY");
        fiveDayDate.classList = "card-body text-center"

        fiveDayWeatherEl.appendChild(fiveDayDate);

        var weatherIcon = document.createElement("img")
        weatherIcon.classList = "card-body text-center";
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyWeather.weather[0].icon}@2x.png`);

        fiveDayWeatherEl.appendChild(weatherIcon);

        var fiveDayTempEl = document.createElement("span");
        fiveDayTempEl.classList = "card-body text-center";
        fiveDayTempEl.textContent = dailyWeather.main.temp + " °F";

        fiveDayWeatherEl.appendChild(fiveDayTempEl);

        fiveDayContainerEl.appendChild(fiveDayWeatherEl);
    }
}

var citySearch = function () {
    getCityWeather(document.querySelector("#city-search-value").value);
}

document.querySelector("#city-search-btn").addEventListener("click", function () {
    citySearch();
});


