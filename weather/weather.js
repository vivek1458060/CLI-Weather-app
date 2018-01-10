var request = require('request');

var getWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/b4d5a9d1d33febd5f7d01765b2cde92f/${latitude},${longitude}`,
    json: true
  }, (err, response, body) => {
     if(!err && response.statusCode === 200) {
       callback(undefined, {
         temperature: body.currently.temperature,
         apparentTemperature: body.currently.apparentTemperature
       });
     }else{
       callback('Unable to fetch weather');
     }
  });
};

module.exports = {getWeather};
