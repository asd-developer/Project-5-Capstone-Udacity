const app = require('./server') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

const expectedResponse = JSON.stringify({"totalResultsCount":7820,"geonames":[{"adminCode1":"ENG","lng":"-0.12574","geonameId":2643743,"toponymName":"London","countryId":"2635167","fcl":"P","population":7556900,"countryCode":"GB","name":"London","fclName":"city, village,...","adminCodes1":{"ISO3166_2":"ENG"},"countryName":"United Kingdom","fcodeName":"capital of a political entity","adminName1":"England","lat":"51.50853","fcode":"PPLC"}]});

it('tests the guest greeting', async done =>{
    fetchMock.mockResponseOnce(expectedResponse);
    const response = await request.get('/search').query({searchquery: 'london'})
    console.log(response.body);
    expect(response.body).toStrictEqual(JSON.parse(expectedResponse))
    done()
})
