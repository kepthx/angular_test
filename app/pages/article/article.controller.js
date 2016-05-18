(() => {
  'use strict';
  angular.module('app.article')
      .controller('ArticleController', ArticleController);

  ArticleController.$inject = ['$scope'];
  function ArticleController($scope){
      let vm = this;
  }
})();