(() => {
  'use strict';
  angular.module('pages.category')
      .controller('CategoryController', CategoryController);

  CategoryController.$inject = ['$scope', 'allArticles', 'articles', 'categories'];
  function CategoryController($scope, allArticles, articles, categories){
      let vm = this;
      vm.articles = articles.map(item => {
          item.body = item.body.substr(0, 200);
          return item;
      });
      vm.allArticles = allArticles;
      vm.categories = categories;
      vm.getCategory = getCategory;

      /////////////////

      function getCategory(categoryId){
          return vm.categories.find(item=>item.id === categoryId).name;
      }
  }
})();