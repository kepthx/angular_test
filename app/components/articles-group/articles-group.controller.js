(() => {
  angular.module("components.articles-group")
    .controller("ArticlesGroupController", ArticlesGroupController);

  ArticlesGroupController.$inject = ["$scope", "api"];
  
  function ArticlesGroupController($scope, api){
    var vm = this;
    activate();
    
    function activate(){
      if(vm.category) {
        api.getArticlesByCategory(vm.category.id).then(data => {
          vm.category.articles = data;
          vm.categories = [vm.category];
        });
      } else {
        api.getCategoriesWithArticles().then(data => {
          vm.categories = data;
        });
      }
    }
  }
})();