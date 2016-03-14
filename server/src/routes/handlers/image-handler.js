'use strict';
var mongoose = require('mongoose');
var Image_Model = require('../../models/model-image');
var image_handler = {};
mongoose.Promise = Promise;

image_handler.getAll = function(request, response) {
  Image_Model.find({}).sort({ name: 'asc' })
    .then(function (images) {
      response.json(images);
    })
    .catch(function (error) {
      response.send(error);
    });
  };

image_handler.addImage = function(request, response) {
  var newImage = new Image_Model();
  newImage.url = request.body.url;
  newImage.caption = request.body.caption;
  newImage.save()
    .then(function(image){
      response.json(image);
    })
    .catch(function(error){
      response.send(error);
    });
};

image_handler.removeImage = function(request, response) {
  Image_Model.remove({ _id: request.params.id })
    .then(function (image) {
      response.send(request.params.id + ' was removed');
    })
    .catch(function (error) {
      response.send(error);
    });
};



module.exports = image_handler;
