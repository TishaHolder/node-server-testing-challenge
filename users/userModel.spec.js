const server = require('../api/server.js');
const request = require('supertest');
const UserModel = require('./userModel.js');
const db = require('../data/dbConfig.js');

describe('users model', () => {

    //there is a beforeEach(), beforeAll(), afterEach(), and afterAll()

    //clean out users table before each test runs
    beforeEach(async () => {
        await db('users').truncate();
    })

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');

    })
   
});



//***************************************TESTING DELETE****************************************
describe('remove()', () => {   
    
    //clean out users table before delete tests run
    beforeEach(async () => {
        await db('users').truncate();
    })

    //*****************TEST ONE**************************/
    it('should insert the provided user into the database', async () => {
        //first insert a record
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
        //there should be only one user in the database after the beforeEach and insert above
        //therefore remove the user with 1 as their id   
        it('should remove the provided user from the db', async () => {
            let user = await UserModel.remove({ id: 1 });   

        //select all records from the users table and assign the results to usermodel
        let usermodel = await db('users');

        //assert the record was deleted
        //after deleting the user record there should be no records left in the users table
        //therefore the length should be zero(0)
        expect(usermodel).toHaveLength(0); 
    

    })

});

//**************************************TESTING ADD*******************************/
describe('add()', () => {

    //clean out users table before delete tests run
    beforeEach(async () => {
        await db('users').truncate();
    })

    //*****************TEST ONE**************************/
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

         //assert the record was inserted and the returned array has a length = 1
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
    

    expect(user.first_name).toBe('Eric');
  
       //note how we're reusing the user variable
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