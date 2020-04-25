//gets IMG from API
async function getPixImg(getCountryImage){

    const destinationImgObj = await pixImgData(`/locationimg?countryname=${getCountryImage.toLowerCase()}`);
    
};

const pixImgData = async(url = '')=>{

    try{
        const pixImg = await fetch(url);
        const pixImgJson = await pixImg.json();
        if(pixImgJson.totalHits !== 0){
        document.getElementById("nopicturesavail").innerHTML = ''
        document.getElementById("piximage").src = pixImgJson.hits[0].largeImageURL;
        return pixImgJson;
        }else{
            document.getElementById("piximage").src = 'https://cdn.pixabay.com/photo/2013/11/12/16/20/hut-209466_960_720.jpg';
            document.getElementById("nopicturesavail").innerHTML = 'There are no images of that place.'
        }
    }catch(error){
        console.log(error);
   }
};
//Exports ti getLocation.Js

export { getPixImg }