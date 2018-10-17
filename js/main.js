// 1. give user input to type in city name 
// 2. user submits there city 
// 3. brings city weather data back from OW api based on city value
// 4. show user the city data in the html with icons
// 5. clear the input value after submitted
// 6. if input is empty and user submits then show user theres an error

$(document).ready(function(){
    // key variables 
    let URL = "http://api.openweathermap.org/data/2.5/weather?q=dallas&units=imperial&APPID=7307cd677e83e88b9129d98065459b1e";
    let key = "7307cd677e83e88b9129d98065459b1e";
    let units = "units=imperial";

    $("#cityForm").submit(function(event){
        // stops the form from submitting
        event.preventDefault();
        // selects error span and empties the text in the error span
        $(".error").empty();
        // create a variable that stores the input value
        let cityInput = $(".cityInput").val();
        // Then clear the input value
        $(".cityInput").val("");
        console.log(cityInput);
        // START AJAX CALL 
        $.ajax({
            // ajax call takes url, type of connection, type of data we want to recieve from the api, then a callback function
            url:  `http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&${units}&APPID=${key}`,
            type: "GET",
            dataType: "json",
            success: function(data){
                // invoking (calling the function) the results from the api 
                weatherResults(data);
            },
            // if use submits a city thats not in the api it runs an error function
            error:function(xhr, ajaxOptions, thrownError){
                
                if(xhr.status == 404){
                    errorResults(thrownError);
                }
            }
        });
    });

    // Create a function for error when user submits a city that isnt in the api
    // pass in message as a para that will be called inside the function to display to the user
    function errorResults(message){
        // take error span and put in the html a message
        $(".error").html(alert("City Not Found"));
    }

    function weatherResults(data){
        console.log(data);
        let results =   `
                            <h2>Weather Now for ${data.name},${data.sys.country}</h2>
                            <h3>Weather: ${data.weather[0].main}<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"></h3>
                            <h3>Description: ${data.weather[0].description}</h3>
                            <h3>Temperature: ${data.main.temp} &deg;</h3>
                            <h3>Pressure: ${data.main.pressure} hpa</h3>
                            <h3>Humidity: ${data.main.humidity} %</h3>
                            <h3>Wind Speed: ${data.wind.speed} m/s</h3>
                            <h3>Wind Direction: ${data.wind.deg} &deg;</h3> 

                        `;  
        // show the results dynamically in showWeatherResults div
        $(".showWeatherResults").html(results); 
    }
});