"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
  url: { type: String, required: true, },
  caption: { type: String, required: true},
  name: { type: String }
});

var image = mongoose.model('Image', ImageSchema);

module.exports = image;
