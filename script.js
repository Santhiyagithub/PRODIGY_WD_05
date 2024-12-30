// Array of background image URLs
const images = [
    'images/image1.jpg', // Add the path to your first image
    'images/image2.jpg', // Add the path to your second image
    'images/image3.jpg', // Add the path to your third image
    // Add more images as needed
    'images/image4.jpg',
];

// Variable to keep track of the current background image
let currentImageIndex = 0;

// Function to change the background image
function changeBackgroundImage() {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0; // Loop back to the first image
    }
    document.body.style.backgroundImage = `url(${images[currentImageIndex]})`;
}

// Change background image every 5 seconds (5000 milliseconds)
setInterval(changeBackgroundImage, 5000);

//apikey

const apiKey = '7bc392c734c488b5a9f7849c4880ceba';

function getWeather() {
    const city = document.getElementById('cityInput').value;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayCurrentWeather(data))
        .catch(error => console.error('Error fetching current weather:', error));

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayHourlyForecast(data))
        .catch(error => console.error('Error fetching forecast:', error));

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}&units=metric&exclude=minutely,hourly`)
        .then(response => response.json())
        .then(data => {
            displayTenDayForecast(data);
            displayWeekendForecast(data);
            displayMonthlyForecast(data);
            displayAirQuality(data);
            displayFishingForecast(data);
            displayHealthTracker(data);
            displayAlerts(data);
            displayLifestyleUpdates(data);
        })
        .catch(error => console.error('Error fetching additional data:', error));
}

function displayCurrentWeather(data) {
    const weatherInfo = document.getElementById('currentWeather');
    weatherInfo.innerHTML = `
        <div><strong>City:</strong> ${data.name}</div>
        <div><strong>Temperature:</strong> ${data.main.temp} °C</div>
        <div><strong>Weather:</strong> ${data.weather[0].description} <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon"></div>
        <div><strong>Humidity:</strong> ${data.main.humidity} %</div>
        <div><strong>Wind Speed:</strong> ${data.wind.speed} m/s</div>
        <div><strong>Sunrise:</strong> ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</div>
        <div><strong>Sunset:</strong> ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</div>
    `;
}

function displayHourlyForecast(forecastData) {
    const hourlyInfo = document.getElementById('hourlyForecast');
    hourlyInfo.innerHTML = '<h2>Hourly Forecast</h2>';
    forecastData.list.slice(0, 24).forEach(forecast => {
        hourlyInfo.innerHTML += `
            <div>
                <strong>${new Date(forecast.dt * 1000).toLocaleTimeString()}</strong> - 
                ${forecast.main.temp} °C, 
                ${forecast.weather[0].description} 
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather icon">
            </div>
        `;
    });
}

function displayTenDayForecast(data) {
    const tenDayInfo = document.getElementById('tenDayForecast');
    tenDayInfo.innerHTML = '<h2>10-Day Forecast</h2>';
    data.daily.forEach((day, index) => {
        if (index < 10) {
            tenDayInfo.innerHTML += `
                <div>
                    <strong>${new Date(day.dt * 1000).toLocaleDateString()}</strong> - 
                    ${day.temp.day} °C, 
                    ${day.weather[0].description} 
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="Weather icon">
                </div>
            `;
        }
    });
}

function displayWeekendForecast(data) {
    const weekendInfo = document.getElementById('weekendForecast');
    weekendInfo.innerHTML = '<h2>Weekend Forecast</h2>';
    data.daily.forEach((day, index) => {
        const dayOfWeek = new Date(day.dt * 1000).getDay();
        if (dayOfWeek === 5 || dayOfWeek === 6) { // Friday or Saturday
            weekendInfo.innerHTML += `
                <div>
                    <strong>${new Date(day.dt * 1000).toLocaleDateString()}</strong> - 
                    ${day.temp.day} °C, 
                    ${day.weather[0].description} 
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="Weather icon">
                </div>
            `;
        }
    });
}

function displayMonthlyForecast(data) {
    const monthlyInfo = document.getElementById('monthlyForecast');
    monthlyInfo.innerHTML = '<h2>Monthly Forecast</h2>';
    data.daily.forEach((day, index) => {
        if (index % 5 === 0) { // Display every 5th day for a monthly overview
            monthlyInfo.innerHTML += `
                <div>
                    <strong>${new Date(day.dt * 1000).toLocaleDateString()}</strong> - 
                    ${day.temp.day} °C, 
                    ${day.weather[0].description} 
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="Weather icon">
                </div>
            `;
        }
    });
}

function displayAirQuality(data) {
    const airQualityInfo = document.getElementById('airQuality');
    airQualityInfo.innerHTML = `
        <h2>Air Quality</h2>
        <div><strong>Air Quality Index:</strong> ${data.current.air_quality}</div>
    `;
}

function displayFishingForecast(data) {
    const fishingInfo = document.getElementById('fishingForecast');
    const fishingConditions = data.current.weather[0].main === 'Clear' ? 'Good' : 'Poor';
    fishingInfo.innerHTML = `
        <h2>Fishing Forecast</h2>
        <div><strong>Fishing Conditions:</strong> ${fishingConditions}</div>
    `;
}

function displayHealthTracker(data) {
    const healthInfo = document.getElementById('healthTracker');
    const coldAndFluRisk = data.daily[0].temp.day < 15 ? 'High' : 'Low';
    const allergyRisk = data.daily[0].pollen_count > 50 ? 'High' : 'Low';
    healthInfo.innerHTML = `
        <h2>Health Tracker</h2>
        <div><strong>Cold and Flu Risk:</strong> ${coldAndFluRisk}</div>
        <div><strong>Allergy Risk:</strong> ${allergyRisk}</div>
    `;
}

function displayAlerts(data) {
    const alertsInfo = document.getElementById('alerts');
    if (data.alerts && data.alerts.length > 0) {
        alertsInfo.innerHTML = '<h2>Life-Saving Alerts</h2>';
        data.alerts.forEach(alert => {
            alertsInfo.innerHTML += `
                <div><strong>${alert.event}</strong>: ${alert.description}</div>
            `;
        });
    } else {
        alertsInfo.innerHTML = '<h2>No life-saving alerts at the moment.</h2>';
    }
}

function displayLifestyleUpdates(data) {
    const lifestyleInfo = document.getElementById('lifestyleUpdates');
    const travelConditions = data.daily[0].weather[0].main === 'Clear' ? 'Good for travel' : 'Poor for travel';
    const skiingConditions = data.daily[0].snow ? 'Suitable for skiing' : 'Not suitable for skiing';

    lifestyleInfo.innerHTML = `
        <h2>Lifestyle Updates</h2>
        <div><strong>Travel Conditions:</strong> ${travelConditions}</div>
        <div><strong>Skiing Conditions:</strong> ${skiingConditions}</div>
    `;
}

// Helper function to convert Unix timestamp to readable date
function unixToDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString();
}

// You can add more helper functions as needed for formatting other weather data


// Function to display the live date and time
function displayDateTime() {
    const dateTime = new Date();  // Create a new Date object
    const hours = dateTime.getHours();  // Get current hours
    const minutes = dateTime.getMinutes();  // Get current minutes
    const seconds = dateTime.getSeconds();  // Get current seconds
    const day = dateTime.getDate();  // Get current day of the month
    const month = dateTime.getMonth() + 1;  // Get current month (0-11, so add 1)
    const year = dateTime.getFullYear();  // Get current year

    // Add leading zero to minutes and seconds if necessary
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    // Format the time and date
    const currentTime = `${hours}:${formattedMinutes}:${formattedSeconds}`;
    const currentDate = `${month}/${day}/${year}`;

    // Combine date and time and update the content in the HTML
    document.getElementById('currentDateTime').innerHTML = `${currentDate} <br> ${currentTime}`;
}

// Update the date and time every 1000 milliseconds (1 second)
setInterval(displayDateTime, 1000);

// Call the function immediately to display time as soon as the page loads
displayDateTime();
