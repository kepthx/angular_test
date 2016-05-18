(() => {
  angular.module('components.articles-group')
    .directive("articlesGroup", articlesGroup);

  articlesGroup.$inject = [];

  function articlesGroup(){
    return {
      restrict: "E",
      replace: true,
      scope: {
        category: "="
      },
      templateUrl: "app/components/articles-group/articles-group.tmpl.html",
      controller: "ArticlesGroupController",
      controllerAs: "agc",
      bindToController: true
    };
  }
})();