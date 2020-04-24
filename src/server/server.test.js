
import 'regenerator-runtime/runtime'
const app = require('./server.js')
const supertest = require('supertest')

const request = supertest(app)


it('geonames search outputs value', async done =>{
    const response = await request.get('/search').query({searchQuery : 'lisbon'})
    
    expect(searchResultResponse.geonames[0].countryName).toMatch('Portugal')
    done()


})

// it('tests the captain greeting', async done =>{
//     const response = await request.get('/getwelcomings').query({name : 'Picard'})
    
//     expect(response.body.message).toMatch('Hello Captain!')
//     done()


// })
