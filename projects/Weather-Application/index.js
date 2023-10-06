let weather = {
    apiKey : "34d3939b753ba71c97b543fc850f642c",
    fetchWeather: function(city){
        fetch ("https://api.openweathermap.org/data/2.5/weather?q=" +city+ "&appid="  +this.apiKey+ "&units=metric")
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data){
        const{ name } = data;
        const{ icon, description } = data.weather[0];
        const{ temp, humidity } = data.main;
        const{ speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".ICON").src = "https://openweathermap.org/img/wn/" +icon+ "@2x.png";
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".Description").innerText = description;
        document.querySelector(".Humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".Wind").innerText = "Wind Speed: " + speed + " km/h" ;
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function(){
        this.fetchWeather(document.querySelector("#new-city").value);
    }
};

document.querySelector("#submitButton").addEventListener("click", () => {
    weather.search();
})


//for pressing Enter-Key
document.querySelector("#new-city").addEventListener("keyup", function(event){      //function taking "event" as parameter
    if(event.key == "Enter"){
        weather.search();
    }
})

weather.fetchWeather("Mumbai");
