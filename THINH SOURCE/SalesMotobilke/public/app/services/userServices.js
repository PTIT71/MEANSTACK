angular.module('userServices',[])
.factory('User' , function($http){
    userFactory = {};
    userFactory.create = function(regData){
        return $http.post('/api/users', regData);
    }
    return userFactory;
})

.factory('Products' , function($http){
    productFactory = {};
    productFactory.get = function(){
        return $http.get('/api/getAllProduct');
    }
    return productFactory;
})

.factory('ProductOnly' , function($http){
    productOnlyFactory = {};
    console.log("Get ID product.............................");
    productOnlyFactory.get = function(id){
        return $http.get('/api/product/'+id);
    }
    return productOnlyFactory;
})

.factory('ProductComment' , function($http){
    productCommentFactory = {};
    console.log("Get ID product.............................");
    productCommentFactory.get = function(id){
        return $http.get('api/comment/'+id);
    }
    return productCommentFactory;
})
.factory('Comment' , function($http){
    commentFactory = {};
    commentFactory.create = function(CommentData){
        return $http.post('/api/comment', CommentData);
    }
    return commentFactory;
});
