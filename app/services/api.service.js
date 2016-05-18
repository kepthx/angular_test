(() => {
    'use strict';
    angular.module('app.services')
        .factory('api', apiService);
    apiService.$inject = ['$http'];

    function apiService($http){
        let service = {
            getCategories,
            getCategoryById,
            getArticles,
            getArticleById,
            getArticlesByCategory
        };
        return service;

        //////////////////

        function getCategories(){
            return getData().then(data => {
              return data.categories;
            });
        }
        function getCategoryById(id){
          return getCategories().then(data => {
            let [category] = data.filter(item => item.id == id);
            return category;
          });
        }
        function getArticles(){
            return getData().then(data => {
              return data.articles.map(item => {
                item.date_published = new Date(item.date_published);
                return item;
              });
            });
        }
        function getArticleById(id){
            return getArticles().then(data => {
              let [article] = data.filter(item => item.id == id);
              return article;
            });
        }

        function getArticlesByCategory(categoryId){
            return getArticles().then(data => data.filter(item => item.category == categoryId));
        }

        function getData(){
            return $http.get('/response.json').then(data => {
              return data.data.data;
            });
        }
    }
})();