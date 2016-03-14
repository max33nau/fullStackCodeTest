'use strict';

var express = require('express');
var router = express.Router();
var playerHandler = require('./handlers/image-handler');

module.exports = function images() {
  router.get('/', imageHandler.getAll);
  router.post('/',imageHandler.addImage);
  return router;
};
