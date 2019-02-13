// ajaxInteractions.js

// Walter Johnson
// CS290 Week 6 Activity: Ajax Interactions

var req = new XMLHttpRequest();
req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Corvallis,us&appid=" + appid, false);
req.send(null);
console.log(JSON.parse(req.responseText));


// The HTML page(s) should have two forms.
// The first is the form you will construct in the activity that connect to Open Weather Map,
// lets a user input a city or a zip code and asynchronously shows the weather information retrieved from Open Weather Map (via a GET).

// The other should be a form that submits to http://httpbin.org/post.

// This from should submit asynchronously via a POST.
// It needs to send a content-type of application/json (you can also experiment with other content-types like application/x-www-form-urlencoded).
// You should display the data you get back (which should match the data you send).
// It will be stored as a string in the data field of the JSON encoded string returned from the server.