(() => {
  angular.module("components.header")
    .controller("HeaderController", HeaderController);

  HeaderController.$inject = ["$scope", "categories", "$state"];

  function HeaderController($scope, categories, $state){
    var vm = this;
    vm.categories = categories;

    vm.checkActive = checkActive;

    function checkActive(id){
      return $state.params.id == id && /category/.test($state.current.name);
    }
  }
})();
