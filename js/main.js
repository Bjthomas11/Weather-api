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
        $(".error").css("display", "block").fadeOut(4000);
        // take error div and put in a message
        $(".error").html("City Not Found");
    }

    function weatherResults(data){
        console.log(data);
        let results =   `   
                            <div class="results">
                                <h3>Weather Now for ${data.name},${data.sys.country}</h3>
                                <p>Weather: ${data.weather[0].main}<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"></p>
                                <p>Description: ${data.weather[0].description}</p>
                                <p>Temperature: ${data.main.temp} &deg;</p>
                                <p>Pressure: ${data.main.pressure} hpa</p>
                                <p>Humidity: ${data.main.humidity} %</p>
                                <p>Wind Speed: ${data.wind.speed} m/s</p>
                                <p>Wind Direction: ${data.wind.deg} &deg;</p> 
                            </div>

                        `;  
        // show the results dynamically in showWeatherResults div
        $(".showWeatherResults").html(results); 
    }
});