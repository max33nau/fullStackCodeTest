'use strict';
/* Styling */
import './main.scss';

/* Vendors */
import angular from 'angular' ;
import angularRouter from 'angular-ui-router';

/* providers */
import providers from './providers';

/* html templates */
import imageTemplate from './stateProvider/imageTemplate.html';

const app = angular.module('finalApp', [
  angularRouter,
  providers
]);

app.constant('baseUrl', 'http://localhost:3030');

app.config(['ImageProvider','baseUrl',function(ImageProvider, baseUrl){
  ImageProvider.setUrl(baseUrl);
}]);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('finalTest', {
      url: '/',
      template: imageTemplate,
      resolve: {
        loadImages: function(Image) {
          return  Image.getAll()
              .then(function(response){
                  return response.data;
                })
                .catch(function(error){
                  console.log(error);
                  return error;
                });
        }
      },
      controller: ['$scope','loadImages', 'Image', function($scope, loadImages, Image){
        $scope.images = {};
        $scope.images.newImage = {};
        $scope.images.all = loadImages;
        $scope.images.createImage = function(newImage) {
          Image.create(newImage)
          .then(function(response){
              $scope.images.all.push(response.data);
            })
            .catch(function(error){
              console.log(error);

            });

        };
      }]
    });
}]);


angular.element(document).ready(function() {
  angular.bootstrap(document, ['finalApp']);
});
