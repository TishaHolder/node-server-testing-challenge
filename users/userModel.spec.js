const server = require('../api/server.js');
const request = require('supertest');
const UserModel = require('./userModel.js');
const db = require('../data/dbConfig.js');

describe('users model', () => {

    //clean out users table before each test runs
    beforeEach(async () => {
        await db('users').truncate();
    })


    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');

    })
   
});

//*****************TEST ONE**************************/
describe('add()', () => {
    it('should insert/register users into the database', async () => {
        //insert a record
        await UserModel.add({ 
                first_name: 'Tisha', 
                last_name: 'Holder', 
                email: 'tisha2@yahoo.com', 
                username: 'tishay2', 
                password: 'test' 
        });

        //select all records from the users table and assign the results to usermodel
        let usermodel = await db('users');

         //assert the record was inserted
         expect(usermodel).toHaveLength(1);
    })


    //*****************TEST TWO**************************/
    // note we're checking one user at a time
    it('should insert the provided user into the db', async () => {
        let user = await UserModel.add({ 
            first_name: 'Eric', 
            last_name: 'Holder', 
            email: 'eric@yahoo.com', 
            username: 'eric', 
            password: 'test' 
        });

    //})

    expect(user.first_name).toBe('Eric');
  
    // note how we're reusing the user variable
    user = await UserModel.add({ 
        first_name: 'Pam', 
        last_name: 'Holder', 
        email: 'pam@yahoo.com', 
        username: 'pam', 
        password: 'test' 
    });

    expect(user.first_name).toBe('Pam');

})

});