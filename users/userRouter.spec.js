const server = require('../api/server.js');
const request = require('supertest');
const UserModel = require('./userModel.js');
const db = require('../data/dbConfig.js');

//clean out users table before each test runs
beforeEach(async () => {
    await db('users').truncate();
})

describe('GET /api/users', () => {
  
  it('should return status code 200', async () => {
    const res = await request(server)
                      .get('/api/users');

    expect(res.status).toBe(200);    

  });
});

