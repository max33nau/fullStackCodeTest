'use strict';
require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const start = require('../.././src/app');
const mainApp = start();
chai.use(chaiHttp);
if (!global.Promise) {
  var q = require('q');
  chai.request.addPromises(q.Promise);
}
const expect = chai.expect;

describe('Test image routes and functionality for requests', function () {
  // Used for running crud need the values of what I created in the database
  var server;
  var chaiRequest;
  var app;
  var imageInfo = {};
  before(function (done) {
    server = mainApp.start(done);
    app = mainApp.app;
    chaiRequest = chai.request(app);
  });

  it('should post a new image with url and caption', function (done) {
    chaiRequest.post('/image')
    .send({'url':'https://blog-blogmediainc.netdna-ssl.com/upload/SportsBlogcom/2846800/0129905001437427977_filepicker.jpg', 'caption': 'Michael Jordans Famous Dunk'})
    .then(function (response) {
      expect(response).to.have.status(200);
      expect(response.body.caption).deep.equal('Michael Jordans Famous Dunk');
      imageInfo = response.body;
      done();
    })
    .catch(done);
  });

  it('should send a json array of all the images currently in the database', function (done) {
    chaiRequest.get('/image')
    .then(function (response) {
      expect(response).to.have.status(200);
      expect(response).to.have.header('content-type','application/json; charset=utf-8');
      done();
    })
    .catch(done);
  });

  it('should delete the created image from the database', function (done) {
    chaiRequest.delete('/image/'+imageInfo.id)
    .then(function (response) {
      expect(response).to.have.status(200);
      done();
    })
    .catch(done);
  });

  after(function (done) {
    server.close(done);
  });
});
