var weatherContainerEl = document.querySelector("#current-container");
var citySearchInputEl = document.querySelector("#current-city");
var fiveDayContainerEl = document.querySelector("#five-day-container");
var searchHistArray = JSON.parse(localStorage.getItem("last-city")) || [];

//fetch current weather conditions from API
var getCityWeather = function (city) {
    var apiKey = "dcbc862bcf16c64fe76c5467e987cbd0"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
        .catch((error) => console.log(error));

}

var displayWeather = function (weather) {
    //clear content upon new search
    weatherContainerEl.textContent = "";
    citySearchInputEl.textContent = "";

    //apending current weather info
    var currentCity = document.createElement("span")
    currentCity.textContent = weather.name;

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

    //needed lat and lon coordinates to search for UV Index
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    getUv(lat, lon)
};
//fetch 5day weather conditions from API
var getFiveDay = function (city) {
    var apiKey = "dcbc862bcf16c64fe76c5467e987cbd0"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => displayFiveWeather(data))
        .catch((error) => console.log(error));

}

var displayFiveWeather = function (weather) {
    //clear content upon new search
    fiveDayContainerEl.textContent = "";

    //loop thru 5day forecast
    var weather = weather.list;
    for (var i = 5; i < weather.length; i = i + 8) {
        var dailyWeather = weather[i];

        //apending 5day weather info
        var fiveDayWeatherEl = document.createElement("div");
        fiveDayWeatherEl.classList = "card bg-dark text-light m-1.5";

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

        var fiveDayWind = document.createElement("span");
        fiveDayWind.classList = "card-body text-center";
        fiveDayWind.textContent = dailyWeather.wind.speed + " MPH";

        fiveDayWeatherEl.appendChild(fiveDayWind);

        var fiveDayHum = document.createElement("span");
        fiveDayHum.classList = "card-body text-center";
        fiveDayHum.textContent = dailyWeather.main.humidity + "%";

        fiveDayWeatherEl.appendChild(fiveDayHum);

        fiveDayContainerEl.appendChild(fiveDayWeatherEl);
    }
}
//fetch current UV conditions from API
var getUv = function (lat, lon) {
    var apiKey = "dcbc862bcf16c64fe76c5467e987cbd0"
    var apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}`

    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => displayUv(data))
        .catch((error) => console.log(error));

}

var displayUv = function (index) {

    //appending UV index
    var uvEl = document.createElement("div")
    uvEl.textContent = "UV Index: " + index.current.uvi;
    uvEl.classList = "list-group-item"

    //change UV background color depending on value returned
    if (index.current.uvi <= 2) {
        uvEl.classList = "green"
    } else if (index.current.uvi > 2 && index.current.uvi <= 5) {
        uvEl.classList = "yellow "
    } else if (index.current.uvi > 5 && index.current.uvi <= 7) {
        uvEl.classList = "orange"
    } else if (index.current.uvi >= 8) {
        uvEl.classList = "red"
    };

    weatherContainerEl.appendChild(uvEl);
}

//save searched cities
function saveSearchHistory(city) {
    if (!searchHistArray.includes(city)) {
        searchHistArray.push(city);
        localStorage.setItem("last-city", JSON.stringify(searchHistArray));
        console.log(searchHistArray);
    }
}

//load searched cities upon opening/refreshing page
function loadCities() {
    var quickSearchList = document.querySelector(".past-cities");
    quickSearchList.innerHTML = '';

    //appending previously searched cities 
    searchHistArray.forEach(function (lastCity) {
        var searchHistoryEl = document.createElement("a");
        searchHistoryEl.setAttribute("href", "#!");
        searchHistoryEl.classList = "d-flex w-100 btn-dark border p-2";
        searchHistoryEl.textContent = lastCity;

        quickSearchList.appendChild(searchHistoryEl);
    });
}

//event listener for past cities
document.querySelector(".past-cities").addEventListener("click", function (e) {
    getCityWeather(e.target.textContent);
    getFiveDay(e.target.textContent);
});


var citySearch = function () {
    getCityWeather(document.querySelector("#city-search-value").value);
    getFiveDay(document.querySelector("#city-search-value").value);
    saveSearchHistory(document.querySelector("#city-search-value").value);
    loadCities();

}

//event listener for city search bar
document.querySelector("#city-search-btn").addEventListener("click", function () {
    citySearch();
});




