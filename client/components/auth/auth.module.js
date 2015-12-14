'use strict';

angular.module('clientApp.auth', [
  'clientApp.constants',
  'clientApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
