/* Global Variables */

function getWeatherForZipCode() {

    clearUI();
    updateDateToday();

    let zipCode = getZipCode();
    let isFeelingPopulated = checkFeeling();

    if (!zipCode || !checkFeeling()) {
        return;
    }

    let zipCodeUrl = getZipCodeUrl(zipCode);

    let weatherUrl = getWeatherUrl(zipCode);
    getWeatherFromServer(weatherUrl).json;
};

//#region server calls
//decided to try to use another api
const validateZipCode = async (zipCodeUrl = '') => {
    try {
        const request = await fetch(zipCodeUrl);
        const isValidUrl = await request.json();
        
        if(request.body.status === 400){
            setFieldClassToError('zip');
            document.querySelector("#invalidzipwarning").setAttribute('class', 'invalidzipwarning');
            return false;
        }
        setFieldClassToValid('zip');
        document.querySelector("#invalidzipwarning").setAttribute('class', 'hide');
    }
    catch (error) {
        setFieldClassToError('zip');
        document.querySelector("#invalidzipwarning").setAttribute('class', 'invalidzipwarning');
    }
};

const getWeatherFromServer = async (url = '') => {

    const request = await fetch(url);
    let weatherForZipCodeResponse;
    try {
        weatherForZipCodeResponse = await request.json();
        if(weatherForZipCodeResponse.cod === '404'){
            document.querySelector('#zip').setAttribute('class', 'wrongfieldinput');
            return;
        }
        else{
        //Writes in the HTML the location, sky and temperature of the zip code added
        document.querySelector('#cityweather').innerHTML = `Weather in : ${weatherForZipCodeResponse.sys.country}, ${weatherForZipCodeResponse.name}`;
        document.querySelector('#currentweather').innerHTML = `There is ${weatherForZipCodeResponse.weather[0].main} and the temperature is : ${Math.round(weatherForZipCodeResponse.main.temp)}°C`;            
        document.querySelector('#zip').setAttribute('class', 'rightfieldinput');
    }
    }
    catch (error) {

        if (TypeError !== 'SpecificError') {
            console.log("error", error);
        }
        
        document.querySelector('#zip').setAttribute('class', 'wrongfieldinput');

    }

    try {
        postFeelingToServer(weatherForZipCodeResponse.main.temp);
    }
    catch (error) {

    }
};

const getRecentFeeling = async (url = '') => {

    const request = await fetch('/recentFeeling');
    try {
        const allData = await request.json();
    }
    catch (error) {
        console.log("error", error);
    }
};

const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    }
    catch (error) {
        console.log("error", error);
    }
};


//#endregion

//#region helper methods
function getWeatherUrl(zipCode) {

    let url = `/all?zipCode=${zipCode}`;
    return url;
};

function getZipCodeUrl(zipCode) {

    return `/checkzipcode?zipCode=${zipCode}`;
};

function checkZipCode() {

    let zipCodeField = document.querySelector('#zip').value;
};

function clearUI() {
    //write this
    document.querySelector('#cityweather').innerHTML = ``;
    document.querySelector('#currentweather').innerHTML = ``;
};


function postFeelingToServer(temp) {

    let feelingsText = document.querySelector('#feelings').value;
    var response = postData('/postrecentfeeling', { feelings: `${feelingsText}`, newDate: `${getCurrentDate()}`, temperature: `${temp}` });
    var feelings = getFeelingsFromServer('/getfeelings');
};

const getFeelingsFromServer = async (url = '') => {

    const request = await fetch(url);
    try {
        // Transform into JSON
        const getFeelingsResponse = await request.json();
        document.querySelector('#date').innerHTML = getCurrentDate();
        document.querySelector('#temp').innerHTML = `${Math.round(getFeelingsResponse[0].temperature)}°C`;
        document.querySelector('#content').innerHTML = getFeelingsResponse[0].feelings;
    }
    catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

function getCurrentDate() {

    let d = new Date();
    let newDate =`${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    return newDate;
}
const getDate = () => {

    const date = new Date();
    return date.toDateString();
}

//#endregion

//#region UI Manipulation
function initializePage() {

    document.querySelector('#generate').addEventListener('click', getWeatherForZipCode);
    document.getElementById("invalidzipwarning").setAttribute('class', 'hide');
    updateDateToday();
};

function updateDateToday() {

    document.querySelector('#datetoday').innerHTML = `Today is : ${getCurrentDate()}`;
}

function checkFeeling() {

    let feelingsField = document.querySelector('#feelings').value;

    if (feelingsField === '') {
        setFieldClassToError('feelings')
        return false;
    }
    else {
        setFieldClassToValid('feelings');
        return true;
    }
};

function setFieldClassToError(fieldName) {
    //Changes class of invalid input
    document.querySelector(`#${fieldName}`).setAttribute('class', 'error');
};

function setFieldClassToValid(fieldName) {
    //Changes class of valid input
    document.querySelector(`#${fieldName}`).setAttribute('class', 'valid');
};

//Tiago Antes de submeter
function getZipCode() {

    let zipCode = document.querySelector('#zip').value

    if (zipCode === '') {
        //set field to red
        document.querySelector('#zip').setAttribute('class', 'wrongfieldinput');
        return false;
    }
    else {
        
        return zipCode;
    }
};
//#endregion

initializePage();
export { getWeatherForZipCode }