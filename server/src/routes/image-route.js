'use strict';

var express = require('express');
var router = express.Router();
var imageHandler = require('./handlers/image-handler');

module.exports = function images() {
  router.get('/', imageHandler.getAll);
  router.post('/',imageHandler.addImage);
  router.delete('/:id',imageHandler.removeImage);
  return router;
};
