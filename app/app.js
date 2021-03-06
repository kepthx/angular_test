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
          name: "modules",
          files: [
            '/app/components/header/header.module.js',
            '/app/components/articles-list/articles-list.module.js',
            '/app/services/services.module.js',
            '/app/pages/category/category.module.js'
          ]
        },
        {
          name: 'header',
          series: true,
          files: [
            '/app/components/header/header.controller.js'
          ]
        },
        {
          name: 'articles-list',
          series: true,
          files: [
            '/app/components/articles-list/articles-list.controller.js',
            '/app/components/articles-list/articles-list.directive.js'
          ]
        },
        {
          name: 'api',
          series: true,
          files: [
            '/app/services/api.service.js'
          ]
        },
        {
          name: 'category',
          series: true,
          files: [
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
        },
        {
          name: 'articles-group',
          series: true,
          files: [
            '/app/components/articles-group/articles-group.module.js',
            '/app/components/articles-group/articles-group.directive.js',
            '/app/components/articles-group/articles-group.controller.js'
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
          header: {
            templateUrl: "/app/components/header/header.tmpl.html",
            controller: "HeaderController",
            controllerAs: "vm",
            resolve: {
              // modules: ["$ocLazyLoad", ($ocLazyLoad) => $ocLazyLoad.load('modules')],
              load: ["$ocLazyLoad", ($ocLazyLoad) => $ocLazyLoad.load(['api', 'header'])],
              categories: ['load', 'api',
                (load, api) => {
                  return api.getCategories();
                }]
            }
          },
          content: {
            template: '<div id="content" ui-view></div>',
            // resolve: {
            //   modules: ["$ocLazyLoad", ($ocLazyLoad) => {
            //     return $ocLazyLoad.load('modules').then(() => {
            //       console.log(arguments);
            //     })
            //   }]
            // }
          }
        }
      })
      .state('app.category', {
        url: '/category/:id',
        templateUrl: '/app/pages/category/category.tmpl.html',
        controller: 'CategoryController',
        controllerAs: 'vm',
        resolve: {
          load: ["$ocLazyLoad", $ocLazyLoad => $ocLazyLoad.load(['category', 'articles-list', 'articles-group'])],
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
          load: ["$ocLazyLoad", $ocLazyLoad => $ocLazyLoad.load(['article', 'articles-list', 'articles-group'])],
          article: ['load', 'api', '$stateParams', (load, api, $stateParams) => api.getArticleById($stateParams.id)],
          category: ['api', 'article', (api, article) => {
            return api.getCategoryById(article.category);
          }]
        }
      })

  }

  function appRun($ocLazyLoad){
    $ocLazyLoad.load('modules');
  }
});
