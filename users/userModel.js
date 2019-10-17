//import express
const express = require('express');

//import database object
const db = require('../data/dbConfig.js');

//export functions
module.exports = {
    find,
    findByUserName,
    findById,    
    add,
    update,
    remove

};

//define CRUD methods
function find(){

    return db('users');
}

function findByUserName({ username }){

    return db('users')
    .where({ 'users.username': username})
    .first();

}

function findById(id){

    return db('users')
    .where({ 'users.id': id })
    .first();    
}


function add({ first_name, last_name, email, username, password }){

    return db('users')
    //'id' tells the db to return the id after insert. not necessary with sqlite3 but needed for postgres
    .insert(({ first_name, last_name, email, username, password }), 'id')
    .then ( ([id]) => {
        return findById(id);
    })
}

function update(id, changes){

}

function remove(id){

    return db('users')
    .where({'users.id': id})
    .delete();

}