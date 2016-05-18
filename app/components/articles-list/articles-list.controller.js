(()=>{
    'use strict';
    angular.module('components.articles-list')
        .controller('ArticleListController', ArticleListController);
    ArticleListController.$inject = ['$scope', 'api'];
    function ArticleListController($scope, api){
        let vm = this;
        api.getArticles().then(data => vm.articles = data);
        vm.reverce = $scope.desc === 'true';
    }
})();
