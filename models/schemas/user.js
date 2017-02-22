/*jshint camelcase: false */
'use strict';
const mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Schema = mongoose.Schema;


const schema = mongoose.Schema({
    name: {
        type: String
    },
    familyName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        index: {
            unique: true
        },
        sparse: true
    },
    confirmedEmail: {
        type: Boolean,
        default: false
    },
    password: {
        type: String
    },
    sex: {
        type: String,
        enum: [
            'Male',
            'Female',
            'N/D'
        ],
        required: true,
        default: 'N/D'
    },
    birthdate: {
        type: Date
    },
    cellphone: {
        type: String
    },
    address: {
        street: {
            type: String
        },
        number: {
            type: Number
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        zipCode: {
            type: String
        },
        country: {
            code: {
                type: String
            },
            name: {
                type: String
            }
        }
    },
    type: {
        type: String,
        enum: [
            'admin',
            'customer'
        ],
        required: true,
        default: 'customer'
    }
});


// Indexes
schema.index({
    deleted_at: -1
});

// Plugins
schema.plugin(require('./base'));


module.exports = schema;
