angular.module('mainController',[])
.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope, $window, $route) {
    var app = this;

    app.loadme = false;

    $rootScope.$on('$routeChangeStart', function() {
        if (Auth.isLoggedIn()) {
            app.isLoggedIn = true;
            Auth.getUser().then(function(data) {
                console.log("Auth data " + JSON.stringify(data.data))
                app.username = data.data.username;
                app.useremail = data.data.email;
                app.userid = data.data.userid;
                app.loadme = true;
                if (data.data.expired) app.logout();
            });
        } else {
            app.isLoggedIn = false;
            app.username = '';
            app.loadme = true;
            app.userid = '';
        }
        if ($location.hash() == '_=_') $location.hash(null);

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

