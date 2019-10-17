/*
- when making a GET to the `/` endpoint 
  the API should respond with status code 200 
  and the following JSON object: `{ api: 'running' }`.
*/
const request = require('supertest'); // calling it "request" is a common practice

const server = require('./api/server.js');//this is our first red, file doesn't exist yet

describe('server.js', () => {
 // http calls made with supertest return promises, we can use async/await if desired
  describe('GET /', () => {
    //returns the promise
    it('returns 200 OK', () => {
        //make a GET request to the / endpoint on the server
        return request(server)
        .get('/')
        .then(res => {
            //assert that we get a http status code 200
            expect(res.status).toBe(200);
        });    
    });

    //using async and await
    it("should return {api: 'running'}", async ()=> {
        const res = await request(server).get('/');

        expect(res.body.api).toBe('running');
        expect(res.body).toEqual({ api: 'running' });
    });

  });

});
