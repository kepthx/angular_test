(() => {
  'use strict';
  angular.module('pages.category')
      .controller('CategoryController', CategoryController);

  CategoryController.$inject = ['$scope'];
  function CategoryController($scope){
      let vm = this;
  }
})();