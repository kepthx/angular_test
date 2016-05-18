(()=>{
    'use strict';
    angular.module('components.articles-list')
        .directive('articlesList',articlesList);
    articlesList.$inject = [];

    function articlesList() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/articles-list/articles-list.tmpl.html',
            controller: 'ArticleListController',
            controllerAs: "alc",
            scope: {
                desc: '@'
            }
        };
    }
})();
