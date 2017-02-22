/*jshint camelcase: false */
'use strict';
const mongoose = require('mongoose');
const schema = require('models/schemas/reservation');



const Model = mongoose.model('Reservation', schema);
module.exports = Model;
