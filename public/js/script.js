console.log("client side js");

document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector(
            "body").style.visibility = "hidden";

        const myPlaces = ["delhi", "mumbai", "kolkata", "Rajkot", "goa"];
        var randomPlaceId = Math.random() * (myPlaces.length - 0) + 0;
        console.log(Math.floor(randomPlaceId));
        var randomLocation = myPlaces[Math.floor(randomPlaceId)];
        apiCall(randomLocation);

        document.querySelector(
            "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
            "#loader").style.display = "none";
        document.querySelector(
            "body").style.visibility = "visible";
    }
};


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const temp = document.querySelector('#temp');
const feelLikeTemp = document.querySelector('#feel_like');
const place = document.querySelector('#place');
const windSpeed = document.querySelector('#windSpeed');
const degree = document.querySelector('#degree');
const humidity = document.querySelector('#humidity');
const errorMsg = document.querySelector('#error');

// window.onload = (event) => {
//     const myPlaces = ["delhi", "mumbai", "kolkata", "Rajkot", "goa"];
//     var randomPlaceId = Math.random() * (myPlaces.length - 0) + 0;
//     console.log(Math.floor(randomPlaceId));
//     var randomLocation = myPlaces[Math.floor(randomPlaceId)];
//     apiCall(randomLocation);
// };

weatherForm.addEventListener('submit', (e) => {
    console.log("submit clicked");
    const location = search.value;
    console.log(location);
    e.preventDefault();
    place.textContent = "loading...";
    errorMsg.textContent = '';
    apiCall(location);
})

function apiCall(location) {



    // var url = "http://localhost:3000/weather?address="+location;
    var url = "/weather?address=" + location;

    fetch(url)
        .then(response => response.json())
        .then(result => {
            /* process result */
            if (result.error) {
                console.log("some error occured", result.error);
                place.textContent = " ";
                errorMsg.textContent = result.error;
            }
            else {
                console.log("Place:",result.place);
                console.log("temp:",result.temp);
                console.log("feel:",result.feelLikeTemp);
                console.log("windSpeed:",result.windSpeed);
                console.log("deg:",result.deg);
                console.log("humidity:",result.humidity);
                temp.textContent = result.temp;
                feelLikeTemp.textContent = result.feelLikeTemp;
                place.textContent = result.place;
                windSpeed.textContent = result.windSpeed;
                degree.textContent = result.deg;
                humidity.textContent = result.humidity;

            }

        })
    console.log(location);

}