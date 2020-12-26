const axios = require('axios');

// https://api.mapbox.com/geocoding/v5/mapbox.places/rajkot.json?access_token=pk.eyJ1IjoicG9saWQ2ODg3MiIsImEiOiJja2g2ZXlraXUwM2cyMnFuMnRyYTRvcmo5In0.IqfHTDlBfr-JKyd7cTbasA
const tempUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
var place = "rarj"
var restUrl = ".json?access_token=pk.eyJ1IjoicG9saWQ2ODg3MiIsImEiOiJja2g2ZXlraXUwM2cyMnFuMnRyYTRvcmo5In0.IqfHTDlBfr-JKyd7cTbasA"

const geoCodeLocation = (place, callback) => {
    var completeSerachUrl = tempUrl + place + restUrl
    axios.get(completeSerachUrl)
        .then(function (response) {
            // handle success
            // const data = JSON.parse(response.data);
            var lon = response.data.features[0].geometry.coordinates[0];
            var lat = response.data.features[0].geometry.coordinates[1];
            var place = response.data.features[0].place_name;
            // console.log(response.data.features[0].geometry);
            callback(undefined,{lon,lat,place})
            // apiCall(lat, lon);
            // console.log(response.data.features[0].geometry.coordinates[0]);
            // console.log(response.data.features[0].geometry.coordinates[1]);
        })
        .catch(function (error) {
            // handle error
            // console.log(error);
            // console.log("some error occured");
            callback("Some error occured",undefined)
        });
}


module.exports = {
    geoCodeLocation: geoCodeLocation
}