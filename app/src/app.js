'use strict';
/* Styling */
import './main.scss';

/* Vendors */
import angular from 'angular' ;
import angularRouter from 'angular-ui-router';

const app = angular.module('finalApp', [
  angularRouter,

]);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise('/finalTest');

}]);


angular.element(document).ready(function() {
  angular.bootstrap(document, ['finalApp']);
});
