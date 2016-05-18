(() => {
  'use strict';
  angular.module('pages.article')
      .controller('ArticleController', ArticleController);

  ArticleController.$inject = ['$scope', 'article', 'category'];
  function ArticleController($scope, article, category){
      let vm = this;
      vm.article = article;
      vm.category = category;
  }
})();
