let weather = {
    apiKey: "8c244396f3323200bedab81e9308a33a",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=8c244396f3323200bedab81e9308a33a"
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
            .catch((error) => console.error("Error fetching weather:", error));
    },
    displayWeather: function (data) {
        const weatherInfo = data.weather && data.weather[0];

        if (weatherInfo) {
            const { icon, description } = weatherInfo;
            const iconElement = document.querySelector(".icon");

            if (iconElement) {
                iconElement.src = "WeatherIcon.jpeg";
            } else {
                console.error("Element with class 'icon' not found.");
            }

            const { name } = data;
            const { temp, humidity } = data.main;
            const { speed } = data.wind;

            document.querySelector(".city").innerText = "Weather in " + name;
            document.querySelector(".description").innerText = description;
            document.querySelector(".temp").innerText = temp + "°C";
            document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
            document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/hr";
            document.querySelector(".weather").classList.remove("loading");
        } else {
            console.error("Weather information not available.");
        }
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document
    .querySelector(".search button")
    .addEventListener("click", function () {
        weather.search();
    });

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });
