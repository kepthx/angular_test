(() => {
  'use strict';
  angular.module('pages.article')
      .controller('ArticleController', ArticleController);

  ArticleController.$inject = ['$scope', 'article', 'categories'];
  function ArticleController($scope, article, categories){
      let vm = this;
      vm.article = article;
      vm.categories = categories;

      vm.getCategory = getCategory;
      ///////////////////

      function getCategory(categoryId){
          return vm.categories.find(item => item.id === categoryId).name;
      }
  }
})();
