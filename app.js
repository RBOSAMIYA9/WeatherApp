const express = require('express')
const path = require('path')
const hbs = require('hbs')
const axios = require('axios');
const geoCode = require('./utils/geoCode')
const forcast = require('./utils/forcast');


// paths for express
const publicDirPath = path.join(__dirname, "/public");
const viewsPath = path.join(__dirname, "/templates/views");
const partialPath = path.join(__dirname, "/templates/partials");

const app = express()
const port = process.env.PORT || 3000;


app.set('view engine', 'hbs');
app.set('views', viewsPath);


app.use(express.static(publicDirPath));
hbs.registerPartials(partialPath);
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/weather', function (req, res) {

    if (req.query.address) {
        geoCode.geoCodeLocation(req.query.address, (error, data) => {
            if (error) {
                // return console.log("some error occured");
                return res.send({
                    "error":"some error occured" 
                });
            }
            forcast.getWeatherForcast(data.lat, data.lon, (errorInForcast, forcastData) => {
                if (errorInForcast) {
                    // return console.log("some error  occured while getting weather forcast", errorInForcast);
                    return res.send({
                        "error":"some error  occured while getting weather forcast"+errorInForcast
                    });
                }
                // console.log(`Showing data for ${data.place},whose temperature is ${forcastData.temp} and feel like temp is ${forcastData.feelLikeTemp}`);
                // console.log(forcastData.humidity,forcastData.windSpeed, forcastData.degree);
                res.send({
                  "place":  data.place,
                  "temp": forcastData.temp,
                  "feelLikeTemp":forcastData.feelLikeTemp,
                  "humidity":forcastData.humidity,
                  "windSpeed": forcastData.windSpeed,
                  "deg":forcastData.degree
                });

            })
        })


        // return res.send({
        //     "res": "ok",
        //     "place": req.query.address

        // });

    }
    else {
        res.send({
            "error": "please provide some place"
        })

    }

});

// code to run project on provided port

app.listen(port, () => {
    console.log("server started at" + port);
})