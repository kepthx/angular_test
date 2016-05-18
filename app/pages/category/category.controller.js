(() => {
  'use strict';
  angular.module('pages.category')
      .controller('CategoryController', CategoryController);

  CategoryController.$inject = ['$scope', 'articles', 'category'];
  function CategoryController($scope, articles, category){
      let vm = this;
      vm.articles = articles.map(item => {
          item.body = item.body.substr(0, 200);
          return item;
      });
      vm.category = category;
  }
})();