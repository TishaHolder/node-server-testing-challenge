//import express
const express = require('express');

//import data access file
const userDB = require('./userModel.js');

//import restricted middleware
const restricted = require('../auth/restrictedMiddleware.js');

//create router
const userRouter = express.Router();

//end points beginning with /api/users
//returns all users
userRouter.get('/', (req, res) => {

    userDB.find()
    .then(users => {
        //***Luis used this in lecture, see restrictedMiddleware.js line 31 => res.json({ loggedInUser: req.username, users});
        res.status(200).json({ users });
        
    })
    .catch(error => {
        console.log("retrieve users error", error);
        res.status(500).json({ error: 'There was an error retrieving the users from the database.'});
    })
})

userRouter.delete('/delete/:id', restricted, (req, res) => {

    const { id } = req.params;

    userDB.remove({ id })
    .then( count => { //returns the count of records that were deleted
        res.status(200).json( {message: `Deleted ${count} record(s).`});
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error removing the user from the database.'} );
    })    

});

//export router
module.exports = userRouter;