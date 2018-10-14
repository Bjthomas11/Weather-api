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

        $.ajax({
            url: `http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&APPID=${key}`,
            type: "GET",
            dataType:"json",
            success: function(data){

                weatherResults(data);
                // clears input value
                $(".cityInput").val("");
            }


        });
        
    });


    function weatherResults(data){
        console.log(data);

    }

   });

