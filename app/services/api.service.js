'use strict';
(() => {
    angular.module('app.services')
        .factory('API', apiService);
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
            return getData().categories;
        }
        function getCategoryById(id){
            let categories = getData().categories;
            return categories.filter((item)=>item.id === id);
        }
        function getArticles(){
            let articles = getData().articles;
            return articles.map((item)=> item.date_published = new Date(item.date_published));
        }
        function getArticleById(id){
            let articles = getData().articles;
            return articles.find((item)=>item.id === id);
        }

        function getArticlesByCategory(categoryId){
            let articles = getData().articles;
            articles = articles.filter((item)=>item.category === id);
            return articles.map((item)=> item.date_published = new Date(item.date_published));
        }

        function getData(){
            return $http.get('/response.json').then((data)=> JSON.parse(data.data));
        }
    }
})();