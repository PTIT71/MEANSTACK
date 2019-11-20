angular.module('productServices',[])
.factory('Product' , function($http){
    productFactory = {};
    productFactory.get = function(){
        return $http.get('/product/getAllProduct');
    }
    return productFactory;
});