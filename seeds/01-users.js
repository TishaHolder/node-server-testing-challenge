//import bcrypt
const bcrypt = require ('bcrypt');

exports.seed = function(knex) {
  
      return knex('users').insert([

        {first_name: 'john', last_name: 'doe', email: 'johndoe@yahoo.com', username: 'johndoe', password: `${bcrypt.hashSync('test', 8)}`}, //1
        {first_name: 'mary', last_name: 'jane', email: 'maryjane@yahoo.com', username: 'maryjane', password: `${bcrypt.hashSync('test', 8)}`}, //2               
        
      ]);
    
};