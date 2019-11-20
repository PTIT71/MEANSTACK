angular.module('userServices',[])
.factory('User' , function($http){
    userFactory = {};
    userFactory.create = function(regData){
        return $http.post('/api/users', regData);
    }
    return userFactory;
})

.factory('Product' , function($http){
    productFactory = {};
    productFactory.get = function(){
        return $http.get('/api/getAllProduct');
    }
    return productFactory;
});
