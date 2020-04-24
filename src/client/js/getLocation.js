import { getPixImg } from './pixImg.js'
var moment = require('moment');
moment().format();

/* Global Variables */


function calculateTimeTo(){
    
    const now = moment(new Date()); //todays date
    const end = moment(document.querySelector('#date_input').value); // another date
    const duration = moment.duration(now.diff(end));
    const days = duration.asDays();
    document.querySelector('#tripend').value = Math.round(Math.abs(days));

    // const tripStartDate = moment(document.querySelector('#date_input').value).format('DD-MM-YYYY');
    // const today = moment().format('DD-MMM-YYYY');
    // console.log('interval', moment.duration(tripStartDate.diff(today)));

    // console.log('tripstartdate', tripStartDate.newDate());
    // console.log('now', date.now());
    return; 

}

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

function checkForError(response)  {
    if (response.status >= 200 && response.status <= 299) {
        return response
    } else {
        throw Error(response.statusText)
    }
}

async function getServerWeatherData(latitude, longitude){

    try{
        return await fetch(`/weatherdate?lat=${lat}&lon=${lng}`).then(checkForError).then(response => {return response.json()})
    }
    catch(error){
        console.log(error);
   }
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

async function sendWeatherInformation(placeinfo){

    const lat = placeinfo.geonames[0].lat;
    const long =  placeinfo.geonames[0].lng;
    const weatherData = await getServerWeatherData(lat, lng);
}


function updatePlaceUI(place){
    document.querySelector('#placeinfotitle').innerHTML = 'Information about the place you choosed:';
    document.querySelector('#placenameprint').innerHTML = `Place searched: ${place.geonames[0].toponymName}`;
    document.querySelector('#countrynameprint').innerHTML = `Country: ${place.geonames[0].countryName}`;
    document.querySelector('#placelatprint').innerHTML = `Lat ${place.geonames[0].lat}`;
    document.querySelector('#placelonprint').innerHTML = `Lon ${place.geonames[0].lng}`;
    getPixImg(place.geonames[0].toponymName);

}

function cleanUI(){
    document.getElementById("piximage").src = '';
}


function initializePage(){
    document.getElementById('generate').addEventListener('click', getCityInfo);
}


initializePage();
export { getCityInfo }

