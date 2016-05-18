(() => {
  'use strict';
  angular.module('app.category')
      .controller('CategoryController', CategoryController);

  CategoryController.$inject = ['$scope'];
  function CategoryController($scope){
      let vm = this;
  }
})();