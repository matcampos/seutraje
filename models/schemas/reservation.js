/*jshint camelcase: false */
'use strict';
const mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Schema = mongoose.Schema;


const schema = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: String
    },
    size: {
        type: String
    },
    id: {
        type: String
    },
    image: {
        type: String
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    }
});


// Indexes
schema.index({
    deleted_at: -1
});

// Plugins
schema.plugin(require('./base'));


module.exports = schema;
