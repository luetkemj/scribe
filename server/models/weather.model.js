const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WeatherSchema = new Schema({
  time: Number,
  forecast: {
    lowTemp: Number,
    highTemp: Number,
    highRH: Number,
    lowRH: Number,
    stormType: String,
    stormStartEstimate: String,
  },
  hourlyWeather: Array,
});

mongoose.model('Weather', WeatherSchema, 'weathers');
