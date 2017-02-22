'use strict';

const mongoose = require('mongoose');
const debug = require('debug')('seu-traje:server');


exports.connect = (options) => {
    options = options || {
        server: {
            poolSize: 10
        }
    };

    console.log("chegay")
    mongoose.connect('mongodb://localhost/SeuTraje', options);


    console.log("chegay2")
    const db = mongoose.connection;

    db.once('open', () => {
        console.log('Connection open');
    });

    db.on('connected', () => {
        console.log('Connected @ http://localhost:3000');
      
    });





    db.on('disconnected', () => {
        console.log('Disconnected');
    });

    db.on('error', (error) => {
        console.log('Connection error', error);
    });

    process.on('SIGINT', () => {
        db.close(() => {
            console.log('Connection closed by ctrl+C command');
            process.exit(0);
        });
    });
};
