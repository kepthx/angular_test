require.config({
  baseUrl: "/app",
  paths: {
    'angular': '/bower_components/angular/angular.min',
    'ui.router': '/bower_components/angular-ui-router/release/angular-ui-router.min',
    'oc.lazyLoad': '/bower_components/oclazyload/dist/ocLazyLoad.min'
  },
  shim: {
    'app': ['oc.lazyLoad'],
    'oc.lazyLoad': ['ui.router'],
    'ui.router': ['angular']
  }
});

require(['app'], app => angular.bootstrap(document, ['app']));