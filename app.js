var yargs = require('yargs');
var request = require('request');

var geocode = require('./geocode/geocode');
var weather = require('./weather/weather.js');

const argv = yargs
  .options({
     a: {
       demand: true,
       alias: 'address',
       describe: 'Address to fetch Weather for',
       string: true //tells yargs to always parse an address as a string
     }
})
.help()
.alias('help','h')
.argv;

geocode.geoCodeAddress(argv.address, (errorMessage, results) => {
  if(errorMessage){
    console.log(errorMessage);
  }else {
      console.log(`Address: ${results.address}`);
      weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
        if(errorMessage) {
          console.log(errorMessage);
        }else{
          console.log(`it's currently ${weatherResults.temperature}, it feels like ${weatherResults.apparentTemperature}`);
        }
      });
  }
});
