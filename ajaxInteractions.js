// ajaxInteractions.js

// Walter Johnson
// CS290 Week 6 Activity: Ajax Interactions

// one global constant to rule them all
const AIG = {
    city: document.getElementById("city"),
    citySubmit: document.getElementById("citySubmit"),
    image: document.getElementById("image"),
    cityName: document.getElementById("cityName"),
    currWeather: document.getElementById("currWeather"),
    currTemp: document.getElementById("currTemp"),
    minTemp: document.getElementById("minTemp"),
    maxTemp: document.getElementById("maxTemp"),
    parseValue: null,
    bindCitySubmit: null,
    aboutYou: document.getElementById("aboutYou"),
    youSubmit: document.getElementById("youSubmit"),
    aboutMe: document.getElementById("aboutMe"),
    bindYouSubmit: null,
    response: ""
};

AIG.parseValue = function (value) {
    var query = '';
    if (parseInt(value)) {
        query = 'zip=' + value;
    } else {
        query = 'q=' + value;
    }
    return query;
};

AIG.bindCitySubmit = function () {
    AIG.citySubmit.addEventListener('click', function (event){
        var req, query, reqUrl, response, source;
        req = new XMLHttpRequest();
        query = AIG.parseValue(AIG.city.value);
        reqUrl = "http://api.openweathermap.org/data/2.5/weather?" + query + "&units=imperial&appid=" + appid;
        req.open('GET', reqUrl, true);
        req.addEventListener('load', function () {
            if (req.status >= 200 && req.status < 400) {
                response = JSON.parse(req.responseText);
                source = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
                AIG.image.setAttribute("src", source);
                AIG.cityName.innerHTML = response.name;
                AIG.currWeather.innerHTML = (response.weather[0].main.toUpperCase() + " (" + response.weather[0].description + ")");
                AIG.currTemp.innerHTML = response.main.temp + '&#8457;';
                AIG.minTemp.innerHTML = response.main.temp_min + '&#8457';
                AIG.maxTemp.innerHTML = response.main.temp_max + '&#8457';
            } else {
                console.log("Error in network request: " + req.statusText);
                AIG.cityName.innerHTML = "Error in network request: " + req.statusText;
                AIG.currWeather.innerHTML = "";
                AIG.currTemp.innerHTML = "";
                AIG.minTemp.innerHTML = "";
                AIG.maxTemp.innerHTML = "";
            }
        });
        req.send();
        event.preventDefault();
    });
};

document.addEventListener('DOMContentLoaded', AIG.bindCitySubmit);

AIG.bindYouSubmit = function () {
    AIG.youSubmit.addEventListener('click', function (event){
        var req, payload, response, meText;
        req = new XMLHttpRequest();
        payload = AIG.aboutYou.value;
        req.open('POST', 'http://httpbin.org/post', true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function () {
            if (req.status >= 200 && req.status < 400) {
                AIG.response = JSON.parse(req.responseText);
                meText = "Wow! What a coincidence! " + AIG.response.data.slice(1, -1) + ", too.";
                AIG.aboutMe.innerHTML = meText;
            } else {
                console.log("Error in network request: " + req.statusText);
                AIG.aboutMe.innerHTML = "Error in network request: " + req.statusText;
            }
        });
        req.send(JSON.stringify(payload));
        event.preventDefault();
    });

};

document.addEventListener('DOMContentLoaded', AIG.bindYouSubmit);


// The HTML page(s) should have two forms.
// The first is the form you will construct in the activity that connect to Open Weather Map,
// lets a user input a city or a zip code and asynchronously shows the weather information retrieved from Open Weather Map (via a GET).

// The other should be a form that submits to http://httpbin.org/post.

// This from should submit asynchronously via a POST.
// It needs to send a content-type of application/json (you can also experiment with other content-types like application/x-www-form-urlencoded).
// You should display the data you get back (which should match the data you send).
// It will be stored as a string in the data field of the JSON encoded string returned from the server.