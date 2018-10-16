// 1. give user input to type in city name 
// 2. user submits there city 
// 3. brings city weather data back from OW api based on city value
// 4. show user the city data in the html with icons
// 5. clear the input value after submitted
// 6. if input is empty and user submits then show user theres an error
$(document).ready(function(){
    let URL = "http://api.openweathermap.org/data/2.5/weather?q=dallas&APPID=7307cd677e83e88b9129d98065459b1e";
    let key = "7307cd677e83e88b9129d98065459b1e";
    let units = "units=imperial";

    $("#cityForm").submit(function(e){
        $(".error").empty();
        e.preventDefault();
        let cityInput = $(".cityInput").val();
        // clears input value
        $(".cityInput").val("");
        console.log(cityInput);
        $.ajax({
            url: `http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&${units}&APPID=${key}`,
            type: "GET",
            dataType:"json",
            success: function(data){
                weatherResults(data);
            },
            error: function(xhr, ajaxOptions, thrownError){
                if(xhr.status == 404){
                    errorResult(thrownError); 
                }
            }
        })
    });

    function errorResult(message){
        $(".error").html("city not found");
    }

    function weatherResults(data){
       console.log(data);
        let results = `
                        <h2>Weather Now for ${data.name}</h2>
                        <h3>Weather: ${data.weather[0].main}<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"></h3>
                        <h3>Description: ${data.weather[0].description}</h3>
                        <h3>Temperature: ${data.main.temp} &deg;</h3>
                        <h3>Pressure: ${data.main.pressure} hpa</h3>
                        <h3>Humidity: ${data.main.humidity} %</h3>
                        <h3>Wind Speed: ${data.wind.speed} m/s</h3>
                        <h3>Wind Direction: ${data.wind.deg} &deg;</h3>
                    `;
        $(".showWeatherResults").html(results);
    }
});

   