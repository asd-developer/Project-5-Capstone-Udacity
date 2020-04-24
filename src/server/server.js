// Setup empty JS object to act as endpoint for all routes

// Require Express to run server and routes
const express = require('express');
const fetch = require("node-fetch");
const app = express();
app.use(express.static('dist'))

/* Middleware*/
var bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


 //Require GeoNames
 const Geonames = require('geonames.js')
 var Promise = require('es6-promise').Promise;
 
//Server method to expose the geonames api


app.get('/search', searchString);
function searchString(req, res){

    let url = `http://api.geonames.org/searchJSON?q=${req.query.searchquery}&maxRows=1&username=jukexx`;
  
    const geonamesSearch = async (endpoint) => {

        // console.log('geonamesearch test');
        const searchResultResponse = await fetch(endpoint);
        try{
        const searchResults = await searchResultResponse.json();
        // console.log(searchResults.geonames[0].lat);
        // console.log(searchResults.geonames[0].lng);
        // console.log(searchResults.geonames[0].countryName);
        res.send(searchResults);
        }
        catch(error){
            console.log('error: '+ error);
        }
    }

    geonamesSearch(url);
}

app.get('/locationimg', pixImg);
function pixImg(req, res){

    let url = `https://pixabay.com/api/?key=16196342-e582949eba041d8436f8f71f1&q=${req.query.countryname}`;
  
    const getImgFromPix = async (endpoint) => {

        const searchResultResponse = await fetch(endpoint);
        try{
        const imgLinks = await searchResultResponse.json();
        // console.log('url',url);
        // console.log('imglinks', imgLinks);
        // console.log('imageurl', imgLinks.hits[0].imageUrl);
        console.log(imgLinks);
        res.send(imgLinks);
        }
        catch(error){
            console.log('error: '+ error);
        }
    }

    getImgFromPix(url);
}

app.get('/weatherdate', getLocationForWeatherForecast);
function getLocationForWeatherForecast(req, res){

    let url = `http://api.weatherbit.io/v2.0/current?&lat=${req.query.lat}&lon=${req.query.lon}&key=48fbcce4b8304227840c6ea7431129bd`;
  
    const weatherSearch = async (endpoint) => {

        console.log('start ansync', endpoint);
        const searchResultResponse = await fetch(endpoint);

        try{
            const weatherResults = await searchResultResponse.json();
            console.log('xxxx: ', weatherResults.data);
            res.send(weatherResults);
        }
        catch(error){
            res.status(400).send();
            console.log('error: '+ error);
        }
    }

    weatherSearch(url);
}

const port = 4000;
const server = app.listen(port,listening);
function listening(){
    
    console.log('Server running');
    console.log(`Running on localhost:${port}`);
};

// TO TEST JEST REMOVE COMMENTS BELLOW designates what port the app will listen to for incoming requests

// app.get(`/test`, async (req, res) => {
//   res.status(200).json({ message: 'pass!' })
// })

// module.exports = app
