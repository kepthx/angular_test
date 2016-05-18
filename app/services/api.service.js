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
            getArticlesByCategory,
            getCategoriesWithArticles
        };
        return service;

        //////////////////

        function getCategories(){
            return getData().then(data => {
              return data.categories;
            });
        }
        function getCategoryById(id){
          return getCategories().then(data => data.find(item => item.id == id));
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
            return getArticles().then(data => data.find(item => item.id == id));
        }

        function getArticlesByCategory(categoryId){
            return getArticles().then(data => data.filter(item => item.category == categoryId));
        }

        function getCategoriesWithArticles(){
            return getData().then(data => {
              let categories = data.categories;
              return categories.map(category => {
                category.articles = data.articles.filter(article => article.category == category.id);
                return category;
              });
            });
        }

        function getData(){
            return $http.get('/response.json').then(data => {
              return data.data.data;
            });
        }
    }
})();