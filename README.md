Weather App

Welcome to the Weather App! This is a simple, user-friendly application built with Angular to display current weather conditions and forecasts for any location. It utilizes APIs from OpenWeatherMap and RapidAPI to fetch weather data and provide accurate, up-to-date information.

Features

Search by City: Get weather details by entering the city name.

Current Weather: View real-time temperature, humidity, wind speed, and weather conditions.

Technologies Used

Framework: Angular

APIs:

OpenWeatherMap

RapidAPI

Styling: CSS for a clean and responsive UI

Deployment: Firebase

Getting Started

Follow these instructions to set up and run the project locally.

Prerequisites

Node.js and npm installed on your machine

Angular CLI installed globally

Installation

Clone the repository:

git clone <repository-url>

Navigate to the project directory:

cd weather-app

Install dependencies:

npm install

Usage

Obtain API keys from:

OpenWeatherMap

RapidAPI

Add your API keys in the environment file:

export const environment = {
production: false,
openWeatherMapApiKey: 'your-openweathermap-api-key',
rapidApiKey: 'your-rapidapi-key'
};

Run the application:

ng serve

Open your browser and navigate to http://localhost:4200 to view the app.

Live Demo

Check out the live version of the app here: https://weather-app-1c089.web.app/
