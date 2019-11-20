angular.module('mainController',[])
.controller('mainCtrl', function(Auth,$location,$timeout,$rootScope, $window){
    var app =this;
    app.loadme= false;
    $rootScope.$on('$routeChangeStart', function(){
        if(Auth.isLoggedIn()){
            console.log('Success: user is logged in');
            app.isLoggedIn = true;
            Auth.getUser().then(function(data){
                console.log(data);
                app.username = data.data.username;
                app.email = data.data.email;
                app.loadme= true;
            });
        }
        else{
            console.log('Failure: User is NOT logged in');
            app.isLoggedIn = false;
            app.username='';
            app.loadme= true;
        }

        if($location.hash() == '_=_') $location.hash(null);
    });

    this.facebook = function(){
        
        $window.location = $window.location.protocol + '//' + $window.location.host  + '/auth/facebook';
    }

    this.google = function(){
        
        $window.location = $window.location.protocol + '//' + $window.location.host  + '/auth/google';
    }

    this.register = function(){
        $window.location = $window.location.protocol + '//' + $window.location.host  + '/register';
    }
    



    this.doLogin = function(loginData){

        app.errorMsg = false;
        app.successMsg = false;
        app.loading = true;

        console.log('Submit form register');
        Auth.login(app.loginData).then(function(data){
            console.log(data.data.success);
            console.log(data.data.message);
            if(data.data.success)
            {
                app.loading =false;
                app.successMsg = data.data.message + '.... Redirecting';
                $timeout(function(){
                    $location.path('/');
                    app.successMsg = false;
                    app.loginData = '';
                },2000)
                
            }
            else
            {
                app.loading =false;
                app.errorMsg = data.data.message;
            }
        });
    };

    this.logout = function( )
    {
        Auth.logout();
        $location.path('/logout');
        $timeout(function(){
            $location.path('/');
            app.username='';
        },100);
    }
});

