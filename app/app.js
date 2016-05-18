define([], () => {
  let app = angular.module('app', ['ui.router', 'oc.lazyLoad'])
    .config(appConfig)
    .run(appRun);

  function appConfig($urlRouterProvider, $stateProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider){
    $ocLazyLoadProvider.config({
      loadedModules: ['app'],
      asyncLoader: require,
      modules: [
        {
          name: 'pages',
          files: [
            '/app/pages/pages.module.js'
          ]
        },
        {
          name: 'core',
          files: [
            '/app/pages/core/app.controller.js'
          ]
        },
        {
          name: 'api',
          series: true,
          files: [
            '/app/services/services.module.js',
            '/app/services/api.service.js'
          ]
        },
        {
          name: 'category',
          series: true,
          files: [
            '/app/pages/category/category.module.js',
            '/app/pages/category/category.controller.js'
          ]
        },
        {
          name: 'article',
          series: true,
          files: [
            '/app/pages/article/article.module.js',
            '/app/pages/article/article.controller.js'
          ]
        }
      ]
    });

    app.controller = $controllerProvider.register;
    app.service = $provide.service;
    app.factory = $provide.factory;
    app.filter = $filterProvider.register;
    app.directive = $compileProvider.directive;

    $urlRouterProvider.otherwise('/category/1');

    $stateProvider
      .state('app', {
        abstract: true,
        views: {
          header: {},
          content: {}
        },

        resolve: {
          load: ["$ocLazyLoad", $ocLazyLoad => {
            return $ocLazyLoad.load(['pages', 'api', 'core']);
          }]
        }
      })
      .state('app.category', {
        url: '/category/:id',
        templateUrl: '/app/pages/category/category.tmpl.html',
        controller: 'CategoryController',
        controllerAs: 'vm',
        resolve: {
          load: ["$ocLazyLoad", $ocLazyLoad => $ocLazyLoad.load(['category'])],
          category: ['load', 'api', '$stateParams',
            (load, api, $stateParams) => api.getCategoryById($stateParams.id)],
          articles: ['load', 'api', '$stateParams',
            (load, api, $stateParams) => api.getArticlesByCategory($stateParams.id)]
        }
      })
      .state('app.article', {
        url: '/article/:id',
        templateUrl: '/app/pages/article/article.tmpl.html',
        controller: 'ArticleController',
        controllerAs: 'vm',
        resolve: {
          load: ["$ocLazyLoad", $ocLazyLoad => $ocLazyLoad.load(['article'])],
          article: ['load', 'api', '$stateParams', (load, api, $stateParams) => api.getArticleById($stateParams.id)]
        }
      })

  }

  function appRun($ocLazyLoad){
    $ocLazyLoad.load('app/pages/pages.module.js');
  }
});