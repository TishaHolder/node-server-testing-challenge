//imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//import routers
const authRouter = require('../auth/authRouter.js');
const userRouter = require('../users/userRouter.js');

//configure knexConfig object
const knexConfig = require('../data/dbConfig.js');

//create express application
const server = express();

//mount global middleware
server.use(express.json());
server.use(helmet());
server.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        callback(null, true);
    }
    //process.env.NODE_ENV === "producction"
    // ? "http:test-website.netlify.com"
    // : 'http:localhost:3000'
}));

//mount routers
server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});
  

//export server
module.exports = server;