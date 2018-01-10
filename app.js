var yargs = require('yargs');
var request = require('request');

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
.argv

var encodedAddress = encodeURIComponent(argv.address);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
  json: true
}, (err, response, body) => {
   if(err) {
     console.log(err);
   }else if(body.status === 'ZERO_RESULTS') {
     console.log('Enter a valid address')
   }else if (body.status === 'OK') {
     console.log(body.results[0].formatted_address);
     console.log(body.results[0].geometry.location.lat);
     console.log(body.results[0].geometry.location.lng);
   }
});
