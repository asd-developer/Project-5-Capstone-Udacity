//import pixabay Js file
import { getPixImg } from './pixImg.js'
//require moment for date countdown
var moment = require('moment');
moment().format();
//calculate days left for trip
function calculateTimeTo(){
    
    const now = moment(new Date()); //todays date
    const end = moment(document.querySelector('#date_input').value); // Trip date
    const duration = moment.duration(now.diff(end));
    const days = duration.asDays();
    document.querySelector('#tripend').value = Math.round(Math.abs(days));
    return Math.round(Math.abs(days)); 
}
//Function that gets the city info
async function getCityInfo() {

    calculateTimeTo();
    let placeName = document.querySelector('#placename').value;
    cleanUI();

    if(placeName !== ''){
        let searchPlaceResult = await searchPlace(`/search?searchquery=${placeName}`);
        sendWeatherInformation(searchPlaceResult);
        updatePlaceUI(searchPlaceResult);
        return true;
    }
    else{
        alert('You need to type a place');
        return false;
    }
};
//Gets Weather data from server
async function getServerWeatherData(lat, lng){

 const getWeatherData = async(url = '')=>{

    try{
        const weatherDataResult = await fetch(url);
        const weatherData = await weatherDataResult.json();
        document.querySelector('#weatherforecast').innerHTML = `The temperature will be ${weatherData.data[0].temp}C`;
        return weatherDataResult;
    }
    catch(error){
        console.log(error);
   }
};
    getWeatherData(`/weatherdate?lat=${lat}&lon=${lng}`);
}

const searchPlace = async(url = '')=>{

    try{
        const searchResultResponse = await fetch(url);
        const searchResults = await searchResultResponse.json();
        return searchResults;
    }catch(error){
        console.log(error);
   }
};
//sends weather information to server
async function sendWeatherInformation(placeinfo){

    const lat = placeinfo.geonames[0].lat;
    const long =  placeinfo.geonames[0].lng;
    const weatherData = await getServerWeatherData(lat, long);
    return true;
}

//Update Ui by interacting with The DOM
function updatePlaceUI(place){

    document.querySelector('#placeinfotitle').innerHTML = 'Information about the place you choosed:';
    document.querySelector('#placenameprint').innerHTML = `Place searched: ${place.geonames[0].toponymName}`;
    document.querySelector('#countrynameprint').innerHTML = `Country: ${place.geonames[0].countryName}`;
    document.querySelector('#placelatprint').innerHTML = `Lat ${place.geonames[0].lat}`;
    document.querySelector('#placelonprint').innerHTML = `Lon ${place.geonames[0].lng}`;
    getPixImg(place.geonames[0].toponymName);
    return true;
}
//Cleans image on button press
function cleanUI(){

    document.getElementById("piximage").src = '';
}

//initiates button event listener
function initializePage(){

    document.getElementById('generate').addEventListener('click', getCityInfo);
}

//initializes the page
initializePage();
//exports for index.js and for testing
export { getCityInfo }
export { sendWeatherInformation }
export { initializePage }