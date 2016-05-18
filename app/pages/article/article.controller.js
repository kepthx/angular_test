(() => {
  'use strict';
  angular.module('pages.article')
      .controller('ArticleController', ArticleController);

  ArticleController.$inject = ['$scope'];
  function ArticleController($scope){
      let vm = this;
  }
})();