define([], () => {
  angular.module('app', ['ui.router', 'oc.lazyLoad'])
    .config(appConfig);

  appConfig.$inject = ["$ocLazyLoadProvider", "$stateProvider", "$urlRouterProvider"];

  function appConfig($ocLazyLoadProvider, $stateProvider, $urlRouterProvider){
    $ocLazyLoadProvider.config({
      loadedModules: ['app'],
      asyncLoader: require
    });
  }
});