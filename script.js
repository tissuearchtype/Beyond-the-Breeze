const API_KEY = "c0bac421388841e5952142203250304"; // Replace with your actual WeatherAPI key

document.getElementById("search-btn").addEventListener("click", async () => {
    const city = document.getElementById("city-input").value.trim();
    if (!city) return alert("Please enter a city name!");

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`);
        if (!response.ok) throw new Error("Weather data not found!");

        const data = await response.json();
        console.log(data); // Debugging: Check the API response in console

        if (!data.location || !data.current || !data.forecast) {
            throw new Error("Invalid API response structure!");
        }

        // Update Main Weather Data
        document.getElementById("location").textContent = `${data.location.name}, ${data.location.country}`;
        document.getElementById("temperature").textContent = data.current.temp_c;
        document.getElementById("humidity").textContent = data.current.humidity;
        document.getElementById("wind-speed").textContent = data.current.wind_kph;

        // Update Weekly Forecast
        updateForecast(data.forecast.forecastday);

        // Update Outfit & Food Suggestions
        updateSuggestions(data.current.temp_c);

        // Update Background
        updateBackground(data.current.is_day);
    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("Failed to get weather data. Please check your city name or API key!");
    }
});

// Function to Update Weekly Forecast
function updateForecast(forecast) {
    const container = document.getElementById("forecast-container");
    container.innerHTML = "";
    forecast.forEach(day => {
        const dayBox = document.createElement("div");
        dayBox.classList.add("forecast-day");
        dayBox.innerHTML = `<p><strong>${day.date}</strong></p>
                            <p>${day.day.maxtemp_c}°C / ${day.day.mintemp_c}°C</p>`;
        container.appendChild(dayBox);
    });
}

// Function to Update Outfit & Food Suggestions
function updateSuggestions(temp) {
    document.getElementById("outfit-suggestion").textContent = temp > 20 ? "T-shirt and Shorts" : "Jacket and Pants";
    document.getElementById("food-suggestion").textContent = temp > 20 ? "Ice Cream" : "Hot Soup";
    updateFact();
}

// Fun Fact Rotation
const facts = [
    "Clouds can weigh over a million pounds!",
    "The highest temperature ever recorded was 56.7°C.",
    "Raindrops can fall at speeds of up to 22 mph.",
    "Lightning is five times hotter than the surface of the sun!",
    "The windiest place on Earth is Antarctica."
];

function updateFact() {
    document.getElementById("fact").textContent = facts[Math.floor(Math.random() * facts.length)];
}

// Rotate Fun Fact Every 10 Seconds
setInterval(updateFact, 10000);

// Function to Update Background
function updateBackground(isDay) {
    console.log("isDay value:", isDay); // Debugging

    let bg = "normal.jpg"; // Default fallback background

    if (isDay === 1 || isDay === true) { 
        bg = Math.random() > 0.5 ? "morning.jpg" : "afternoon.jpg";
    } else if (isDay === 0 || isDay === false) {
        bg = Math.random() > 0.5 ? "evening.jpg" : "night.jpg";
    } else {
        console.warn("Unexpected isDay value:", isDay);
    }

    document.body.style.backgroundImage = `url('${bg}')`;
}
