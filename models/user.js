/*jshint camelcase: false */
'use strict';
const mongoose = require('mongoose');
const schema = require('models/schemas/user');



const Model = mongoose.model('User', schema);
module.exports = Model;
