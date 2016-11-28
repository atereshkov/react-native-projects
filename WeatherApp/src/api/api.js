const api = {
    baseUrl: "http://api.openweathermap.org/data/2.5/",
    dailyForecastUrl: "forecast/daily",
    currentWeatherUrl: "weather",
    key: 'cb85953ec6364da78961c7c593b7f0c9', // Put Your API key here
    getDailyForecastUrl() {
        return this.baseUrl + this.dailyForecastUrl;
    },
    getCurrentWeatherUrl() {
        return this.baseUrl + this.currentWeatherUrl;
    }
};

module.exports = api;