(() => {
  'use strict';
  angular.module('pages.article')
      .controller('ArticleController', ArticleController);

  ArticleController.$inject = ['$scope', 'api'];
  function ArticleController($scope, api){
      let vm = this;
      
  }
})();