# PRODIGY_WD_05
Weather web application

# Weather Web Application

## Overview

This Weather Web Application provides users with real-time weather information based on their location or any city they search for. It is built using HTML, CSS, and JavaScript, offering an intuitive and responsive user interface.

## Features

- **Current Weather Data:** Displays temperature, humidity, wind speed, and weather conditions.
- **Search Functionality:** Users can search for weather information by city name.
- **Geolocation:** Automatically fetches weather data based on the user's current location.
- **Responsive Design:** Works seamlessly on both desktop and mobile devices.

## Technologies Used

- **HTML:** For structuring the web application.
- **CSS:** For styling the web application.
- **JavaScript:** For fetching and displaying weather data using APIs.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-web-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-web-app
   ```

## Usage

1. Open `index.html` in your web browser.
2. Allow location access to enable geolocation functionality.
3. Use the search bar to find weather information for a specific city.

## API Integration

This application uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data. You need to sign up and obtain an API key.

1. Sign up on [OpenWeatherMap](https://openweathermap.org/api).
2. Replace `YOUR_API_KEY` in the JavaScript file with your actual API key:
   ```javascript
   const apiKey = 'YOUR_API_KEY';
   ```

## Contributing

Contributions are welcome! If you have any ideas or suggestions, please open an issue or create a pull request.

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather data API.
