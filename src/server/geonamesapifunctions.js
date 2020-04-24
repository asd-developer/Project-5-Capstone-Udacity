const Geonames = require('geonames.js')
var Promise = require('es6-promise').Promise;

const getCity = (input) => {
    const geonames = new Geonames({
      username: `${process.env.geonamesAPI_USERNAME}`,
      lan: 'en',
      encoding: 'JSON'
    });
}

async function getContinents(country){
try{
    const continents = await geonames.search({q: `${country}`}) //get continents
    console.log(continents[0])
  }catch(err){
    console.error(err);
  }
}

