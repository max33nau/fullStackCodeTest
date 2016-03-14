'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dbData = require('./dbConfig');
const imageRoute = require('./routes/image-route');

var app = express();

/**** VIEWS ****/
var viewPath = path.join(__dirname, 'views');
app.set('views', viewPath);
app.use( express.static( viewPath, { redirect : false } ) );

/**** PUBLIC ****/
var publicPath = path.join( __dirname, 'public' );
app.use(express.static( publicPath, { redirect : false } ) );


/**** PARSING MODULES FOR APP ****/
app.use(bodyParser.json());


/**** ALLOW REQUEST FROM OTHER URLS ****/
app.use( ( req, response, next ) => {
 const url = '*';
 response.header( 'Access-Control-Allow-Origin', url );
 response.header( 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE' );
 response.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' );
 next();
});

/**** ROUTES ****/
app.use('/image', imageRoute());


/**** START THE APP ****/
 module.exports = function start() {
  var mainApp = {};
  mainApp.start = function(callback) {
    var server = app.listen(process.env.PORT || dbData.my.serverPort, function () {
      console.log('server is connected');
      dbData.start(function () {
        console.log('connected to database');
        callback();
      });
    });
    return {
      close: function close(callback) {
        server.close(function () {
          dbData.mongoose.connection.close(callback);
        });
      }
    };
  };
  mainApp.app = app;
  return mainApp;
};
