const axios = require('axios');

const getWeatherForcast = (lat,lon,callback) => {
    // https://api.openweathermap.org/data/2.5/weather?lat=22.3039&lon=70.8022&units=metric&appid=9ce5bd42ff9eec31afcff8d114be6ad7
    const url = "https://api.openweathermap.org/data/2.5/weather?"
    var otherPart = "units=metric&appid=9ce5bd42ff9eec31afcff8d114be6ad7"
    const completeUrl = url + "lat=" + lat + "&lon=" + lon + "&" + otherPart;

    axios.get(completeUrl)
        .then(function (response) {
            // handle success
            // console.log(response);
            var temp = response.data.main.temp;
            var feelLikeTemp =response.data.main.feels_like;
            var feelLikeTemp =response.data.main.feels_like;
            var humidity =response.data.main.humidity;
            var windSpeed =response.data.wind.speed;
            var degree =response.data.wind.deg;
            callback(undefined,{temp,feelLikeTemp,humidity,windSpeed,degree})
            
        })
        .catch(function (error) {
            callback("some error occured while fetching forcast data","undefined");
        });
}


module.exports = {
    getWeatherForcast: getWeatherForcast
}