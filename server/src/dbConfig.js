'use strict';
var mongoose = require('mongoose');
'use strict';
var my = {};
my.serverHost = 'localhost';
my.serverPort = 3030;
my.dbConnect = 'mongodb://localhost/';
my.dbName = 'fullStackTest';

var db;
var dbData = {
  start: function start(callback) {
    mongoose.connect(my.dbConnect + my.dbName);
    db = mongoose.connection;
    db.on('error', function (error) {
      console.log(error);
      db.close();
    });
    db.once('open', callback);
  },
  mongoose: mongoose,
  db: db,
  my: my
};

module.exports = dbData;
