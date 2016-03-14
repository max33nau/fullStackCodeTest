'use strict';
import angular from 'angular';
import imageProvider from './image-provider';

const providers = angular.module( 'providers', [] );

imageProvider(providers);

export default providers.name;
