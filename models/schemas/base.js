/*jshint camelcase: false */
'use strict';
var mongoose = require('mongoose');

module.exports = (schema) => {
    // Schema
    schema.add({
        created_at: {
            type: Date,
            default: Date.now
        }
    });
    schema.add({
        updated_at: {
            type: Date
        }
    });
    schema.add({
        deleted_at: {
            type: Date,
            default: null
        }
    });
    schema.add({
        canceled_at: {
            type: Date,
            default: null
        }
    });

    // Hooks
    schema.pre('find', function(next) {
        this.where('deleted_at', null);
        next();
    });
    schema.pre('findOne', function(next) {
        this.where('deleted_at', null);
        next();
    });
    schema.pre('findOneAndUpdate', function(next) {
        this.update({}, {
            $set: {
                updated_at: Date.now()
            }
        });
        next();
    });
    schema.pre('update', function(next) {
        this.update({}, {
            $set: {
                updated_at: Date.now()
            }
        });
        next();
    });
    schema.pre('save', function(next) {
        this.wasNew = this.isNew;
        next();
    });
    schema.pre('save', function(next) {
        this.set('updated_at', Date.now());
        next();
    });


    // Schema functions
    schema.methods.removeLogical = function() {
        this.deleted_at = Date.now();
        return this.save();
    };

    schema.methods.cancel = function() {
        this.canceled_at = Date.now();
        return this.save();
    };

};
