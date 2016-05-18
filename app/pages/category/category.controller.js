(() => {
  'use strict';
  angular.module('pages.category')
      .controller('CategoryController', CategoryController);

  CategoryController.$inject = ['$scope', 'category', 'articles'];
  function CategoryController($scope, category, articles){
      let vm = this;
  }
})();