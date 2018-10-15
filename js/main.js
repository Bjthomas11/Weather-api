// 1. give user input to type in city name 
// 2. user submits there city 
// 3. brings city weather data back from OW api based on city value
// 4. show user the city data in the html with icons
// 5. clear the input value after submitted
// 6. if input is empty and user submits then show user theres an error

let URL = "http://api.openweathermap.org/data/2.5/weather?q=dallas&APPID=7307cd677e83e88b9129d98065459b1e";
let key = "7307cd677e83e88b9129d98065459b1e";
   $(document).ready(function(){
        $(".submitButton").click(function(){
            let cityInput = $(".cityInput").val();
            console.log(cityInput);

            if(cityInput != ""){
                $.ajax({
                    url: `http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&APPID=${key}`,
                    type: "GET",
                    dataType:"json",
                    success: function(data){
        
                        let results = weatherResults(data);
        
                        $(".showWeatherResults").html(results);
                        // clears input value
                        $(".cityInput").val("");
                    }
        
        
                });
            } else {
                $(".error").html("<div>Please enter a city</div>")
                
            }
        });
 
   });


   function weatherResults(data){
    console.log(data);
    return `
                <h2>Weather Now for ${data.name}</h2>
                <h3>Weather: ${data.weather[0].main}</h3>
                <h3>Description: ${data.weather[0].description}</h3>
                <h3>Temperature: ${data.main.temp} &deg;</h3>
                <h3>Pressure: ${data.main.pressure} hpa</h3>
                <h3>Humidity: ${data.main.humidity} %</h3>
                <h3>Wind Speed: ${data.wind.speed} m/s</h3>
                <h3>Wind Direction: ${data.wind.deg} &deg;</h3>
            `;


}


//    "<h2 style='font-size:40px;font-weight:Bold;' class='text-center'>Current Weather for "+ data.name +"," + data.sys.country + "</h2>" + 
//             "<h3 style='padding-left;40px'><strong>Weather</strong>: "+ data.weather[0].main +"</h3>" +
//             "<h3 style='padding-left;40px'><strong>Description</strong>: <img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'> "+ data.weather[0].description +"</h3>" + 
//             "<h3 style='padding-left;40px'><strong>Temperature</strong>: "+ data.main.temp +"&deg;C</h3>" + 
//             "<h3 style='padding-left;40px'><strong>Pressure</strong>: "+ data.main.pressure +" hPa</h3>" + 
//             "<h3 style='padding-left;40px'><strong>Humidity</strong>: "+ data.main.humidity +"%</h3>" + 
//             "<h3 style='padding-left;40px'><strong>Minimum Temperature</strong>: "+ data.main.temp_min +"&deg;C</h3>" + 
//             "<h3 style='padding-left;40px'><strong>Maximum Temperature</strong>: "+ data.main.temp_max +"&deg;C</h3>" + 
//             "<h3 style='padding-left;40px'><strong>Wind Speed</strong>: "+ data.wind.speed +" m/s</h3>" + 
//             "<h3 style='padding-left;40px'><strong>Wind Direction</strong>: "+ data.wind.deg +"&deg;</h3>";
