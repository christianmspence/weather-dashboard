var getCityWeather = function(city){
    var apiKey = "dcbc862bcf16c64fe76c5467e987cbd0"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
.then((response) => response.json())
.then((data) => console.log(data));
};